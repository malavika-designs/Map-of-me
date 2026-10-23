// Everything about the map's content lives here.
// To swap a card: drop an image into assets/cards/ and change that card's
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
      id: 'consuming-scher', bucket: 'consuming',
      title: 'Paula Scher’s posters',
      image: 'assets/cards/consuming-scher.webp', ratio: 1,
      why: 'Her poster for The Diva Is Dismissed at the Public Theater. Paula Scher was one of the first designers who truly inspired me, and her work pushed me to experiment with type.',
      pos: [58, 11], w: 165, rot: 2, posMobile: [60, 8], wMobile: 68,
    },
    {
      id: 'consuming-remnants', bucket: 'consuming',
      title: 'Remnants of a Separation',
      image: 'assets/cards/consuming-remnants.webp', ratio: 1,
      why: 'Aanchal Malhotra’s history of Partition, told through the objects people carried across the border. I love reading about pre-independence India, and this book is especially meaningful to me.',
      pos: [73, 9], w: 165, rot: -2, posMobile: [61, 24], wMobile: 68,
    },
    {
      id: 'consuming-dosa', bucket: 'consuming',
      title: 'Dosa, always',
      image: 'assets/cards/consuming-dosa.webp', ratio: 1,
      why: 'Growing up I ate dosa at least a few times a week, and it’s still one of my favourite things. I keep a record of every kind I try.',
      pos: [88, 12], w: 165, rot: 2.5, posMobile: [86, 44], wMobile: 68,
    },
    {
      id: 'consuming-tissot', bucket: 'consuming',
      title: 'Looking closely at paintings',
      image: 'assets/cards/consuming-tissot.webp', ratio: 1,
      why: 'James Tissot’s portrait of the Marquise de Miramon (1866) at the Getty: the pink silk gown, the crane screen and the bust of Marie Antoinette on the mantel. Spending time with paintings like this feeds straight into my own work.',
      pos: [82, 33], w: 165, rot: -1.5, posMobile: [62, 45], wMobile: 68,
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

    // ── appreciating ────────────────────────────────────────
    {
      id: 'appreciating-sleep', bucket: 'appreciating',
      title: 'Sleep on the Floor',
      image: 'assets/cards/appreciating-sleep.webp', ratio: 1,
      why: 'The Lumineers’ Sleep on the Floor is one of my favourite music videos of all time.',
      pos: [93, 54], w: 160, rot: -2.5, posMobile: [86, 8], wMobile: 64,
    },
    {
      id: 'appreciating-cry', bucket: 'appreciating',
      title: 'Cry Cry Cry',
      image: 'assets/cards/appreciating-cry.webp', ratio: 1,
      why: 'I really love Coldplay’s Everyday Life, and Cry Cry Cry is the song from it I keep coming back to.',
      pos: [80, 67], w: 160, rot: 2, posMobile: [86, 25], wMobile: 64,
    },
    {
      id: 'appreciating-rainier', bucket: 'appreciating',
      title: 'Learning to love nature',
      image: 'assets/cards/appreciating-rainier.webp', ratio: 1,
      why: 'Since moving to Seattle I’ve really grown to appreciate nature, and I’ve been going on more and more hikes.',
      pos: [92, 84], w: 160, rot: 1.5, posMobile: [86, 60], wMobile: 64,
    },
    {
      id: 'appreciating-hike', bucket: 'appreciating',
      title: 'The slow burn of a hike',
      image: 'assets/cards/appreciating-hike.webp', ratio: 1,
      why: 'What I like most about hiking is the slow burn. Physically, you have no option but to stay present.',
      pos: [67, 84], w: 160, rot: -2, posMobile: [70, 62], wMobile: 60,
    },
  ],
};
