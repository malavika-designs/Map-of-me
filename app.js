(() => {
  const D = window.MAP_DATA;
  const stage = document.getElementById('stage');
  const svg = document.getElementById('threads');
  const nodesLayer = document.getElementById('nodes');
  const me = document.getElementById('me');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SVGNS = 'http://www.w3.org/2000/svg';

  let W = 0, H = 0, mobile = false, cardScale = 1;
  const head = { x: 0, y: 0 };

  // ── build ────────────────────────────────────────────
  me.src = D.me.image;

  const rand = mulberry32(7);
  const knots = {};
  const cards = [];

  for (const b of D.buckets) {
    const el = document.createElement('div');
    el.className = 'node knot';
    el.innerHTML = `<span class="knot-dot"></span><span class="knot-label">${b.label}</span>`;
    nodesLayer.appendChild(el);
    knots[b.id] = makeNode(el, b, 'knot');
    knots[b.id].children = [];
  }

  for (const c of D.cards) {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'node card';
    el.setAttribute('aria-label', `${c.title} (${bucketLabel(c.bucket)})`);
    el.innerHTML = `<img src="${c.image}" alt="" draggable="false">`;
    nodesLayer.appendChild(el);
    const n = makeNode(el, c, 'card');
    n.knot = knots[c.bucket];
    n.knot.children.push(n);
    cards.push(n);
  }

  function makeNode(el, data, kind) {
    return {
      el, data, kind,
      home: { x: 0, y: 0 }, off: { x: 0, y: 0 }, vel: { x: 0, y: 0 },
      pos: { x: 0, y: 0 }, w: 0, h: 0,
      dragging: false,
      phase: rand() * Math.PI * 2,
      // entrance: held at the head until `release`, then springs out
      held: true, release: 0, appear: 0,
    };
  }

  // ── threads ──────────────────────────────────────────
  // Each thread is a quadratic curve whose control point lags behind
  // its ideal spot on a spring — that lag is what makes strings wobble.
  const threads = [];
  for (const b of D.buckets) {
    const k = knots[b.id];
    k.children.forEach((card, i) => {
      // head → knot: a loose bundle, one strand per card
      addThread(() => headPoint(i), () => k.pos, (rand() - 0.5) * 0.28, i === 0 ? 1.3 : 1).owner = k;
      // knot → card
      addThread(() => k.pos, () => card.pos, (rand() - 0.5) * 0.3, 1.1).owner = card;
    });
  }

  function headPoint(i) {
    const spread = mobile ? 4 : 7;
    return { x: head.x + (i - 1) * spread, y: head.y + Math.abs(i - 1) * 2 };
  }

  function addThread(a, b, bow, width) {
    const path = document.createElementNS(SVGNS, 'path');
    path.setAttribute('stroke-width', width);
    svg.appendChild(path);
    const th = { a, b, bow, path, c: null, cv: { x: 0, y: 0 }, owner: null };
    threads.push(th);
    return th;
  }

  function idealControl(t) {
    const a = t.a(), b = t.b();
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    // bow sideways, plus a little gravity sag
    return {
      x: (a.x + b.x) / 2 - (dy / len) * t.bow * len,
      y: (a.y + b.y) / 2 + (dx / len) * t.bow * len + len * 0.06,
    };
  }

  // ── layout ───────────────────────────────────────────
  function layout() {
    W = stage.clientWidth;
    H = stage.clientHeight;
    mobile = W < 700;
    cardScale = mobile ? W / 390 : clamp(Math.min(W / 1440, H / 900), 0.6, 1.5);

    // the figure sits bottom-centre; the web fills the space around it
    const ratio = 1420 / 705;
    const h = mobile ? Math.min(H * 0.42, W * 0.5 * ratio) : Math.min(H * 0.64, W * 0.22 * ratio);
    const w = h / ratio;
    const left = (W - w) / 2;
    const top = H - h;
    Object.assign(me.style, { width: `${w}px`, left: `${left}px`, top: `${top}px` });
    head.x = left + D.me.head[0] * w;
    head.y = top + D.me.head[1] * h;

    for (const id in knots) {
      const k = knots[id];
      const p = (mobile && k.data.posMobile) || k.data.pos;
      k.home.x = (p[0] / 100) * W;
      k.home.y = (p[1] / 100) * H;
      const dot = k.el.firstElementChild;
      k.dot = { x: dot.offsetLeft + dot.offsetWidth / 2, y: dot.offsetTop + dot.offsetHeight / 2 };
    }
    for (const n of cards) {
      const d = n.data;
      const p = (mobile && d.posMobile) || d.pos;
      n.w = ((mobile && d.wMobile) || d.w) * cardScale;
      n.h = n.w * d.ratio;
      n.el.style.width = `${n.w}px`;
      n.el.style.height = `${n.h}px`;
      n.home.x = (p[0] / 100) * W;
      n.home.y = (p[1] / 100) * H;
    }
  }

  // ── drag ─────────────────────────────────────────────
  let drag = null;

  for (const n of [...Object.values(knots), ...cards]) {
    n.el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      n.el.setPointerCapture(e.pointerId);
      drag = {
        node: n, id: e.pointerId,
        sx: e.clientX, sy: e.clientY,
        ox: n.off.x, oy: n.off.y,
        moved: false, lastT: performance.now(), lastX: n.off.x, lastY: n.off.y,
      };
    });
    n.el.addEventListener('pointermove', (e) => {
      if (!drag || drag.node !== n || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
      if (!drag.moved && Math.hypot(dx, dy) < 5) return;
      if (!drag.moved) {
        drag.moved = true;
        n.dragging = true;
        n.el.classList.add('dragging');
      }
      // rubber-band: the further you pull, the harder it resists
      const rx = drag.ox + dx, ry = drag.oy + dy;
      const len = Math.hypot(rx, ry) || 1;
      const R = Math.min(W, H) * 0.7;
      const s = 1 / (1 + len / R);
      const now = performance.now();
      const dt = Math.max(1, now - drag.lastT) / 1000;
      const nx = rx * s, ny = ry * s;
      n.vel.x = n.vel.x * 0.6 + ((nx - drag.lastX) / dt) * 0.4;
      n.vel.y = n.vel.y * 0.6 + ((ny - drag.lastY) / dt) * 0.4;
      n.off.x = nx; n.off.y = ny;
      drag.lastX = nx; drag.lastY = ny; drag.lastT = now;
    });
    const end = (e) => {
      if (!drag || drag.node !== n || e.pointerId !== drag.id) return;
      const wasClick = !drag.moved;
      n.dragging = false;
      n.el.classList.remove('dragging');
      drag = null;
      if (wasClick && e.type === 'pointerup' && n.kind === 'card') openCard(n);
    };
    n.el.addEventListener('pointerup', end);
    n.el.addEventListener('pointercancel', end);
  }

  for (const n of cards) {
    n.el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCard(n); }
    });
  }

  // ── physics loop ─────────────────────────────────────
  let last = performance.now();
  let t = 0;

  function step(now) {
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    t += dt;

    for (const n of [...Object.values(knots), ...cards]) {
      if (n.held) {
        if (t >= n.release) n.held = false; else holdAtHead(n);
      }
      if (!n.held && n.appear < 1) n.appear = Math.min(1, n.appear + dt * 2.2);
    }

    // knots feel their dragged cards a little; cards follow their knot
    for (const id in knots) {
      const k = knots[id];
      let tx = 0, ty = 0;
      for (const c of k.children) if (c.dragging) { tx += c.off.x * 0.22; ty += c.off.y * 0.22; }
      if (!k.held) spring(k, tx, ty, 150, 11, dt);
    }
    for (const n of cards) {
      if (!n.held) spring(n, n.knot.appear < 1 ? 0 : n.knot.off.x * 0.6, n.knot.appear < 1 ? 0 : n.knot.off.y * 0.6, n.appear < 1 ? 60 : 120, n.appear < 1 ? 7 : 8.5, dt);
    }

    const sway = reduceMotion ? 0 : 1;
    for (const id in knots) {
      const k = knots[id];
      k.pos.x = k.home.x + k.off.x + Math.sin(t * 0.3 + k.phase) * 4 * sway;
      k.pos.y = k.home.y + k.off.y + Math.cos(t * 0.24 + k.phase) * 3 * sway;
      k.el.style.transform = `translate(${k.pos.x - k.dot.x}px, ${k.pos.y - k.dot.y}px)`;
      k.el.style.opacity = ease(k.appear);
    }
    for (const n of cards) {
      // slow float: each card drifts on its own rhythm
      const sx = (Math.sin(t * 0.33 + n.phase) * 9 + Math.sin(t * 0.71 + n.phase * 2) * 3) * sway;
      const sy = (Math.cos(t * 0.27 + n.phase * 1.3) * 8 + Math.sin(t * 0.6 + n.phase) * 2) * sway;
      n.pos.x = n.home.x + n.off.x + sx;
      n.pos.y = n.home.y + n.off.y + sy;
      const rot = n.data.rot + clamp(n.vel.x * 0.012, -12, 12) + Math.sin(t * 0.4 + n.phase) * 1.4 * sway;
      const sc = 0.15 + 0.85 * ease(n.appear);
      n.el.style.transform = `translate(${n.pos.x - n.w / 2}px, ${n.pos.y - n.h / 2}px) rotate(${rot}deg) scale(${sc})`;
      n.el.style.opacity = Math.min(1, n.appear * 2.5);
    }

    for (const th of threads) {
      const ideal = idealControl(th);
      if (!th.c) th.c = { ...ideal };
      th.cv.x += (-(th.c.x - ideal.x) * 90 - th.cv.x * 7) * dt;
      th.cv.y += (-(th.c.y - ideal.y) * 90 - th.cv.y * 7) * dt;
      th.c.x += th.cv.x * dt;
      th.c.y += th.cv.y * dt;
      const a = th.a(), b = th.b();
      th.path.style.opacity = th.owner ? Math.min(1, th.owner.appear * 3) : 1;
      th.path.setAttribute('d', `M${a.x.toFixed(1)},${a.y.toFixed(1)} Q${th.c.x.toFixed(1)},${th.c.y.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`);
    }

    requestAnimationFrame(step);
  }

  // Everything starts tucked into the head, then floats out branch by branch.
  function startEntrance() {
    const order = [];
    D.buckets.forEach((b) => order.push(knots[b.id]));
    D.buckets.forEach((b) => knots[b.id].children.forEach((c) => order.push(c)));
    order.forEach((n, i) => {
      if (reduceMotion) { n.held = false; n.appear = 1; return; }
      n.release = 0.25 + i * 0.075 + (n.kind === 'card' ? 0.2 : 0);
    });
  }

  function holdAtHead(n) {
    n.off.x = head.x - n.home.x;
    n.off.y = head.y - n.home.y;
    n.vel.x = n.vel.y = 0;
  }

  // Damped spring pulling a node's offset back toward (tx, ty).
  function spring(n, tx, ty, k, c, dt) {
    if (n.dragging) return;
    n.vel.x += (-(n.off.x - tx) * k - n.vel.x * c) * dt;
    n.vel.y += (-(n.off.y - ty) * k - n.vel.y * c) * dt;
    n.off.x += n.vel.x * dt;
    n.off.y += n.vel.y * dt;
  }

  // ── card viewer ──────────────────────────────────────
  const paper = document.getElementById('paper');
  const sheet = paper.firstElementChild;
  const viewer = document.getElementById('viewer');
  const vCard = viewer.querySelector('.viewer-card');
  const vText = viewer.querySelector('.viewer-text');
  const vImg = document.getElementById('viewer-img');
  const closeBtn = document.getElementById('viewer-close');
  let open = null;

  function openCard(n) {
    if (open) return;
    open = n;
    const d = n.data;
    vImg.src = d.image;
    vImg.alt = d.title;
    document.getElementById('viewer-bucket').textContent = `↳ ${bucketLabel(d.bucket)}`;
    document.getElementById('viewer-title').textContent = d.title;
    document.getElementById('viewer-why').textContent = d.why;

    const from = n.el.getBoundingClientRect();
    paper.hidden = false;
    viewer.hidden = false;
    n.el.classList.add('is-open');

    const go = () => {
      const flip = flipFrom(from, n);
      const ease = 'cubic-bezier(.2, 1.15, .35, 1)';
      vCard.animate([{ transform: flip }, { transform: 'none' }], { duration: reduceMotion ? 1 : 640, easing: ease });
      paper.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' });
      sheet.animate(
        [{ transform: 'translateY(-24px) rotate(-1.8deg) scale(1.03)' }, { transform: 'rotate(-.5deg)' }],
        { duration: reduceMotion ? 1 : 520, easing: 'cubic-bezier(.2, .9, .3, 1)' },
      );
      vText.animate(
        [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }],
        { duration: 420, delay: 200, easing: 'ease-out', fill: 'backwards' },
      );
      closeBtn.focus({ preventScroll: true });
    };
    if (vImg.complete && vImg.naturalWidth) go(); else vImg.onload = go;
  }

  function closeCard() {
    if (!open) return;
    const n = open;
    open = null;
    const flip = flipFrom(n.el.getBoundingClientRect(), n);
    const dur = reduceMotion ? 1 : 380;
    vText.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' });
    paper.animate([{ opacity: 1 }, { opacity: 0 }], { duration: dur, easing: 'ease-in', fill: 'forwards' });
    const anim = vCard.animate([{ transform: 'none' }, { transform: flip }], { duration: dur, easing: 'cubic-bezier(.5, 0, .2, 1)', fill: 'forwards' });
    anim.onfinish = () => {
      paper.hidden = true;
      viewer.hidden = true;
      n.el.classList.remove('is-open');
      paper.getAnimations().forEach((a) => a.cancel());
      vCard.getAnimations().forEach((a) => a.cancel());
      vText.getAnimations().forEach((a) => a.cancel());
      n.el.focus({ preventScroll: true });
    };
  }

  // Transform that makes the viewer card sit exactly on top of the map card.
  function flipFrom(from, n) {
    const to = vCard.getBoundingClientRect();
    const s = n.w / to.width;
    const dx = n.pos.x - (to.left + to.width / 2);
    const dy = n.pos.y - (to.top + to.height / 2);
    return `translate(${dx}px, ${dy}px) scale(${s}) rotate(${n.data.rot}deg)`;
  }

  closeBtn.addEventListener('click', closeCard);
  viewer.addEventListener('click', (e) => { if (e.target === viewer) closeCard(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCard(); });

  // ── helpers ──────────────────────────────────────────
  function bucketLabel(id) { return D.buckets.find((b) => b.id === id).label; }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function mulberry32(a) {
    return () => {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let r = Math.imul(a ^ (a >>> 15), 1 | a);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ── go ───────────────────────────────────────────────
  layout();
  startEntrance();
  window.addEventListener('resize', layout);
  if (document.fonts) document.fonts.ready.then(layout);
  requestAnimationFrame((now) => { last = now; step(now); });
})();
