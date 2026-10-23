// Everything about the map's content lives here.
// To swap a placeholder: drop an image into assets/cards/ and change that card's
// `image`, `title` and `why`. `ratio` is height / width of the image.
//
// Positions are percentages of the screen: pos = [x%, y%] of the card's centre.
// `posMobile` is used on narrow screens (< 700px wide).

window.MAP_DATA = {
  me: {
    image: 'assets/me.webp',
    // Where the strings leave the head, as a fraction of the cut-out image.
    head: [0.388, 0.018],
  },

  buckets: [
    { id: 'making',     label: 'making',              pos: [36, 48], posMobile: [34, 37] },
    { id: 'consuming',  label: 'consuming',           pos: [66, 24], posMobile: [64, 36] },
    { id: 'references', label: 'pop culture quotes I live by', pos: [30, 24], posMobile: [6, 17] },
    { id: 'appreciating', label: 'appreciating',       pos: [68, 50], posMobile: [74, 19] },
  ],

  cards: [
    // ── making ──────────────────────────────────────────────
    {
      id: 'making-pastels', bucket: 'making',
      title: 'Exploring pastels',
      image: 'assets/cards/making-pastels.webp', ratio: 1,
      why: 'I like trying out different mediums. Right now I’m exploring oil pastels on canvas.',
      pos: [9, 59], w: 175, rot: -3, posMobile: [12, 41], wMobile: 78,
    },
    {
      id: 'making-bread', bucket: 'making',
      title: 'Baking bread',
      image: 'assets/cards/making-bread.webp', ratio: 1,
      why: 'I love baking, and lately I’ve been learning to make bread, starting with focaccia. I also make a mean banana bread.',
      pos: [23, 62], w: 175, rot: 2, posMobile: [35, 43], wMobile: 78,
    },
    {
      id: 'making-writing', bucket: 'making',
      title: 'Writing since I was a kid',
      image: 'assets/cards/making-writing.webp', ratio: 1,
      why: 'I’ve been writing since I was a kid. It’s one of the ways I’ve always captured feelings and stories, and built them out.',
      pos: [10, 84], w: 175, rot: 1.5, posMobile: [12, 54], wMobile: 78,
    },
    {
      id: 'making-ceramics', bucket: 'making',
      title: 'Painting my own ceramics',
      image: 'assets/cards/making-ceramics.webp', ratio: 1,
      why: 'I’m adding new pieces to my kitchen that I’ve painted myself. So far there are two bowls and a mug, with more on the way.',
      pos: [25, 85], w: 175, rot: -2, posMobile: [33, 55], wMobile: 74,
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
      pos: [87, 14], w: 220, rot: -2, posMobile: [62, 27], wMobile: 90,
    },

    // ── pop culture quotes I live by ────────────────────────
    {
      id: 'quote-elle', bucket: 'references',
      title: 'What, like it’s hard?',
      image: 'assets/cards/quote-elle.webp', ratio: 1,
      why: 'Elle Woods, Legally Blonde. I channelled her as a kid when I wanted to top my boards, and it really helped.',
      pos: [9, 14], w: 165, rot: -2.5, posMobile: [13, 7], wMobile: 74,
    },
    {
      id: 'quote-soul', bucket: 'references',
      title: 'The joys of life are found in the simplest things',
      image: 'assets/cards/quote-soul.webp', ratio: 1,
      why: 'Soul. There’s no script, and there will always be things to figure out. Enjoying the smaller things in life is what keeps me grounded.',
      pos: [37, 10], w: 165, rot: 2.5, posMobile: [35, 8], wMobile: 70,
    },
    {
      id: 'quote-ron', bucket: 'references',
      title: 'Never half-ass two things. Whole-ass one thing.',
      image: 'assets/cards/quote-ron.webp', ratio: 1,
      why: 'Parks and Rec has stayed with me for many reasons. It’s hilarious, and it has a few one-liners that are just beautiful.',
      pos: [22, 31], w: 165, rot: 1.5, posMobile: [13, 27], wMobile: 74,
    },
    {
      id: 'quote-rick', bucket: 'references',
      title: 'Meet them head-on, like a bull',
      image: 'assets/cards/quote-rick.webp', ratio: 1,
      why: 'Rick and Morty. I absolutely love this show for its depth and all the flavours it brings. It’s deep and meaningful, and it’s also funny and real.',
      pos: [8, 38], w: 160, rot: -1.5, posMobile: [35, 27], wMobile: 70,
    },

    // ── appreciating ─────────────────────────────────────────────
    {
      id: 'appreciating-01', bucket: 'appreciating',
      title: 'Colour of the month',
      image: 'assets/cards/appreciating-01.svg', ratio: 1.19,
      why: 'Placeholder. A colour I keep noticing everywhere and adding to everything.',
      pos: [89, 44], w: 170, rot: -2.5, posMobile: [87, 9], wMobile: 72,
    },
    {
      id: 'appreciating-02', bucket: 'appreciating',
      title: 'An object I love',
      image: 'assets/cards/appreciating-02.svg', ratio: 0.75,
      why: 'Placeholder. A small thing that says a lot about what I like.',
      pos: [78, 76], w: 220, rot: 2, posMobile: [86, 27], wMobile: 84,
    },
  ],
};
