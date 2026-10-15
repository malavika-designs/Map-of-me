// Everything about the map's content lives here.
// To swap a placeholder: drop an image into assets/cards/ and change that card's
// `image`, `title` and `why`. `ratio` is height / width of the image.
//
// Positions are percentages of the screen: pos = [x%, y%] of the card's centre.
// `posMobile` is used on narrow screens (< 700px wide).

window.MAP_DATA = {
  me: {
    image: 'assets/me.png',
    // Where the strings leave the head, as a fraction of the cut-out image.
    head: [0.38, 0.03],
  },

  buckets: [
    { id: 'making',     label: 'making',              pos: [36, 48], posMobile: [34, 37] },
    { id: 'consuming',  label: 'consuming',           pos: [66, 24], posMobile: [64, 36] },
    { id: 'references', label: 'references I live by', pos: [30, 24], posMobile: [28, 18] },
    { id: 'taste',      label: 'taste',               pos: [68, 50], posMobile: [74, 19] },
  ],

  cards: [
    // ── making ──────────────────────────────────────────────
    {
      id: 'making-01', bucket: 'making',
      title: 'A thing I made',
      image: 'assets/cards/making-01.svg', ratio: 0.75,
      why: 'Placeholder. Something I made that I’m quietly proud of: why it mattered, what I learned making it.',
      pos: [10, 64], w: 210, rot: -3, posMobile: [40, 47], wMobile: 104,
    },
    {
      id: 'making-02', bucket: 'making',
      title: 'Work in progress',
      image: 'assets/cards/making-02.svg', ratio: 1.22,
      why: 'Placeholder. The thing on my desk right now. Unfinished on purpose.',
      pos: [24, 82], w: 150, rot: 2, posMobile: [16, 58], wMobile: 84,
    },
    {
      id: 'making-03', bucket: 'making',
      title: 'Sketchbook spread',
      image: 'assets/cards/making-03.svg', ratio: 0.79,
      why: 'Placeholder. Where most ideas start before they’re allowed to be good.',
      pos: [31, 60], w: 170, rot: -1.5, posMobile: [14, 43], wMobile: 92,
    },

    // ── consuming ───────────────────────────────────────────
    {
      id: 'consuming-01', bucket: 'consuming',
      title: 'Now reading',
      image: 'assets/cards/consuming-01.svg', ratio: 1.24,
      why: 'Placeholder. The book on my nightstand and the line that made me fold the corner.',
      pos: [62, 12], w: 150, rot: 2.5, posMobile: [62, 10], wMobile: 80,
    },
    {
      id: 'consuming-02', bucket: 'consuming',
      title: 'On repeat lately',
      image: 'assets/cards/consuming-02.svg', ratio: 0.68,
      why: 'Placeholder. An album / playlist / podcast I can’t stop going back to.',
      pos: [87, 14], w: 220, rot: -2, posMobile: [53, 27], wMobile: 100,
    },

    // ── references I live by ────────────────────────────────
    {
      id: 'references-01', bucket: 'references',
      title: 'A line I live by',
      image: 'assets/cards/references-01.svg', ratio: 0.79,
      why: 'Placeholder. A sentence I return to when I need to recalibrate.',
      pos: [9, 12], w: 200, rot: -2, posMobile: [17, 8], wMobile: 96,
    },
    {
      id: 'references-02', bucket: 'references',
      title: 'Nothing changes if nothing changes',
      image: 'assets/cards/references-02.svg', ratio: 1,
      why: 'Placeholder. A reminder that waiting is also a choice.',
      pos: [37, 9], w: 150, rot: 3, posMobile: [39, 10], wMobile: 76,
    },
    {
      id: 'references-03', bucket: 'references',
      title: 'Advice I keep coming back to',
      image: 'assets/cards/references-03.svg', ratio: 0.67,
      why: 'Placeholder. Something someone told me once that stuck.',
      pos: [12, 36], w: 210, rot: 1.5, posMobile: [16, 26], wMobile: 100,
    },

    // ── taste ───────────────────────────────────────────────
    {
      id: 'taste-01', bucket: 'taste',
      title: 'Colour of the month',
      image: 'assets/cards/taste-01.svg', ratio: 1.19,
      why: 'Placeholder. A colour I keep noticing everywhere and adding to everything.',
      pos: [89, 44], w: 170, rot: -2.5, posMobile: [87, 9], wMobile: 72,
    },
    {
      id: 'taste-02', bucket: 'taste',
      title: 'An object I love',
      image: 'assets/cards/taste-02.svg', ratio: 0.75,
      why: 'Placeholder. A small thing that says a lot about what I like.',
      pos: [78, 76], w: 220, rot: 2, posMobile: [86, 27], wMobile: 84,
    },
  ],
};
