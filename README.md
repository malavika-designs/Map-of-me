# Map of Me: an index of mind

An interactive map: a cut-out of me, with red threads running from my head out to the things I make, consume, live by and love. You can pull any card or knot and it springs back. Click a card and it opens over a sheet of paper, with a note on why it's in my index.

## Run it

No build step. Open `index.html`, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Swap a placeholder card

1. Put the image in `assets/cards/` (jpg, png, webp, gif or svg).
2. In `data.js`, find the card and change `image`, `title` and `why`.
3. Set `ratio` to the image's height ÷ width so the card keeps its shape.
4. Optional: move it with `pos: [x%, y%]` (desktop) / `posMobile`, resize it with `w` / `wMobile`, and tilt it with `rot`.

Buckets (the knots the threads branch from) are set at the top of `data.js`. Add a bucket there, then give cards that `bucket` id.

## Files

| file | what it does |
| --- | --- |
| `data.js` | buckets and cards: the only file to edit for content |
| `app.js` | layout, threads, spring physics, drag, card viewer |
| `styles.css` | look and feel |
| `assets/me.webp` | background-removed cut-out |
| `scripts/make-placeholders.js` | regenerates the placeholder SVGs |
