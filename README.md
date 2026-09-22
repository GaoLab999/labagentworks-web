# Lab Agent Works

Public product website for Lab Agent Works and scRNA-agent. Built with Next.js App Router, TypeScript, and Tailwind CSS v4, with reusable semantic components and a small custom design system. All routes export to static HTML; no application server, database, accounts, payments, or API keys are required.

## Local development

Use Node.js 22 (`.nvmrc`) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To validate and preview the production export:

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

The preview command uses Python 3 to serve `out/` at http://localhost:3000. Any static HTTP server can serve this folder instead. `npm run build` generates Next.js types and a static export. `next start` is not used for this deployment.

## Routes and organization

- `/` — platform introduction and first product
- `/products/` — scRNA-agent and clearly marked future directions
- `/products/scrna-agent/` — product, capabilities, workflow, example interaction, FAQ
- `/how-it-works/` — local workspace, model access, and protected Core
- `/privacy/` — architectural data-handling explanation
- `/pricing/` — trial and membership structure; no active checkout
- `/download/` — release availability and installer metadata
- `/docs/` — eight documentation preview sections with working anchor links
- `/contact/` — contact placeholder

`src/app/` contains route content, metadata, global styles, sitemap, and robots rules. `src/components/` contains navigation, reusable UI, and code-native diagrams. `src/lib/site.ts` contains shared site information, features, and the release configuration. `public/` contains provisional typography-based icons, a social image, and Cloudflare security headers. No external fonts, stock images, analytics, cookies, or fabricated results are included. The abstract atlas and output cards are explicitly illustrative.

## Cloudflare Pages

1. Connect this repository to a Cloudflare Pages project and select the intended production branch.
2. Set the build command to `npm run build` and the output directory to `out` (Next.js Static HTML Export preset).
3. Use Node.js 22; set `NODE_VERSION=22` in build settings if needed.
4. Deploy and inspect the preview URL. The generated assets require no Worker or server runtime.
5. Under the project's **Custom domains**, add `labagentworks.com` and follow Cloudflare's DNS verification instructions. Add `www.labagentworks.com` if desired and configure a redirect to the canonical apex domain.
6. Check HTTPS, canonical URLs, sitemap, direct route navigation, and the custom 404 after deployment.

References: [Cloudflare static Next.js deployment](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/), [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).

Cloudflare credentials are not stored in this repository. Production metadata currently uses `https://labagentworks.com`. Update `src/lib/site.ts`, `src/app/layout.tsx`, and `src/app/robots.ts` if the canonical domain changes. Keep staging previews out of search indexing using Cloudflare's preview controls.

## Release and content handoff

- Populate `release` in `src/lib/site.ts` only after a signed Windows installer is verified: HTTPS URL, version, release date, SHA-256, and release-notes URL. The download button and notes link activate when URLs are populated. Publish supported Windows versions, hardware requirements, and installer verification instructions alongside the release. Large installer binaries should be hosted separately, not in the static site repository.
- Confirm the proposed 14-day trial and membership terms before opening sales. Replace the pricing availability notices with actual Lemon Squeezy checkout links only after products and prices are approved. Until then, the page explains when membership opens and links to release availability.
- Replace guide previews with validated operational documentation when the application is released.
- Confirm `support@labagentworks.com` is provisioned; the current contact page explains that support availability will be confirmed with the application release. No mail sending is implemented.
- Review product capability wording and publish detailed service data disclosures before release. The privacy page is an architecture explanation, not a complete legal policy.
- Replace provisional icons/social artwork as brand assets become available. The product name is text-based and can cleanly accept a real logo beside it.

## Future environment variables

No environment variables are currently required. Future local configuration belongs in a gitignored `.env.local`; add documented nonsecret examples to `.env.example` when needed. On Cloudflare, put build variables in project settings. Anything prefixed `NEXT_PUBLIC_`, or rendered into exported pages, is public. Never embed Core credentials, model keys, or checkout secrets into this static site. Integrations that require secrets need a separately designed server service.

## Accessibility and behavior

Keyboard-visible focus, a skip link, native FAQ disclosures, a button-operated mobile menu, semantic landmarks, reduced-motion support, and descriptive illustration labeling are included. Availability notices use explicit text and working next-step links. No unavailable action is presented as an active button. Small text is at least 14px, supporting copy is 15–16px, and body text is 16px. The homepage principles strip stays at 16px on mobile. The illustrative SVG atlas is level and keeps its original aspect ratio. The footer year updates at build time; rebuild annually to refresh it.
