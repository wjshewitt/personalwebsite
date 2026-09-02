# whewitt.net

Production source for Will Hewitt's personal website at [whewitt.net](https://whewitt.net).

## Stack

- Vite
- React
- TypeScript
- React Router
- Vanilla CSS

## Commands

```sh
bun install
bun run dev
bun run build
bun run preview
bun run typecheck
bun run lint
bun run check
```

## Structure

- `src/app` - app shell and site-level configuration.
- `src/layouts` - layout components.
- `src/pages` - the ocean landing page and its WebGL canvas, plus the 404 page.
- `src/lib` - the cover-fit projection that keeps the name on the horizon.
- `src/routes` - router definitions.
- `src/styles` - CSS variables, reset, base, and ocean styles.
- `src/types` - shared metadata types.
- `public` - static assets served as-is.

## Deploying

The site is a single route. Deep links other than `/` should 404 at the host, which is the intended behaviour, so no SPA rewrite rule is needed.

`bun run check` runs the horizon projection check, TypeScript, ESLint, and the production build.
