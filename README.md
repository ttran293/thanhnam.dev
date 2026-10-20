# thanhnam.dev

Personal portfolio built with Next.js Pages Router, React, Tailwind CSS,
Framer Motion, and Three.js.

## Development

Use the latest Node.js 24 LTS patch (see `.nvmrc` and `package.json`), then:

```sh
npm ci
npm run dev
```

The development server runs at http://localhost:3000 and writes generated files
to `.next-dev`. Production builds use `.next`, so building does not overwrite
the running development server's chunks. Both folders are ignored by Git.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
```

Run `npm start` to serve the production build. If development is already on
port 3000, use `npm start -- -p 3001`.

## Content

- `data/showcaseItems.ts`: the full project index and destination links.
- `components/SelectedWork.tsx`: the six featured project previews.
- `components/recipe-stack/`: the three-card Jelly's Lab preview, adapted from
  the author's original project, with WebGL loaded near the viewport.
- `public/`: photos, research PDFs, preview images, and soundtrack files.

