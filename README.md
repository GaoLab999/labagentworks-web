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

- `/` — scRNA-agent introduction, iterative analysis, scientific screenshot placeholders and future video layout
- `/products/` — scRNA-agent and clearly marked future directions
- `/products/scrna-agent/` — product, capabilities, workflow, example interaction, FAQ
- `/how-it-works/` — local workspace, model access, and protected Core
- `/privacy/` — architectural data-handling explanation
- `/pricing/` — retained legacy URL explaining the free seven-day research beta; no pricing table or checkout
- `/download/` — disabled Windows download, candidate metadata, three-step setup, requirements and trial details
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

## Research-beta review and publication handoff

Website publication on `main` is approved for this research-beta introduction.
Installer publication remains separately restricted pending final Windows acceptance.
The source remote is `git@github.com:GaoLab999/labagentworks-web.git`.
The repository documents Cloudflare Pages (`npm run build`, output `out/`).
The existing GitHub integration is Cloudflare Workers and Pages, project
`labagentworks-web`. Its check on the previous `main` commit `3089dfb` reports
a successful deployment (`13465265-c969-4568-96ab-c99122637d22`). Push approved
website changes to `origin/main`, monitor that commit’s Cloudflare Pages check,
and verify the custom domain. No hosting configuration was changed.

### Release gate

`src/lib/site.ts` records candidate `e55d85e` and the user-supplied installer SHA-256
`c166067f8fe0c1ad532c52e7e0770ec1f5e7a5f0b6e2ff6c1bce870bd9f9a541`.
`release.approved` is **false** and `release.url` is **null**. Both acceptance
approval and a URL are required to render a download link. No installer is stored
in this repository, uploaded, or exposed by this preparation task.

Before **installer** publication (the website may be published with downloads disabled):

1. Complete final interactive Windows acceptance of the exact installer bytes.
   Independently verify the checksum; replace candidate metadata if the installer changes.
2. Confirm supported Windows versions and publish measured RAM/disk guidance.
   Resolve the documentation discrepancy described below.
3. Review evaluation terms and service privacy disclosures. The existing privacy
   page is an architecture explanation, not a complete legal policy; there is no
   existing Terms page. Confirm support mailbox readiness. No commercial or
   institutional licensing approval is implied by this website.
4. Approve installer distribution and website publication explicitly. Confirm the
   existing Pages project and its production branch before pushing to `main`.
5. Host the approved installer at an immutable, versioned HTTPS URL, verify the
   served checksum, set `release.url` and `release.approved`, and update candidate
   status copy to reflect the accepted release. Rerun lint, typecheck, build and
   browser checks. Commit/push/deploy only with approval.
6. After approved publication, check the live homepage, download, checksum,
   mobile navigation and setup instructions. Account registration stays inside
   Workbench; do not add website registration or payment flows.

### Installer hosting recommendation

Keep the existing static website and Cloudflare account. For an installer within
Cloudflare Pages' **25 MiB per-file limit**, a versioned static download asset in
the existing deployment is simplest (add it during release packaging, not as a
large binary in Git). If the installer exceeds that limit, use Cloudflare R2 with
a downloads custom domain in the existing account and an immutable object name
containing the version/commit. No R2 bucket or domain is created by this task.
Check actual installer size before choosing; this task did not retrieve the binary.
Do not use an expiring private GitHub Actions artifact as a public download URL.

Source: [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/).
The current documentation recommends R2/custom domains for larger files.

### Content evidence and limitations

Installer documentation was read from the adjacent application repository at the
exact candidate commit, using read-only `git show e55d85e:<path>`:

- `packaging/windows/INSTALL_ON_WINDOWS.md`: Windows 11 x64, virtualization,
  native Ubuntu account setup, guided continuation, Codex device login.
- `packaging/windows/README.md`: WSL 2 / Ubuntu 24.04 x64; unsigned bootstrap;
  manual Windows qualification pending.
- `docs/WINDOWS_INSTALL.md`: Windows 10 build 19041+ or Windows 11, x64 only,
  ample free disk space, unsigned candidate. This older document also describes
  an outdated 14-day trial; the website follows the expressly supplied **seven-day**
  research-beta policy instead.
- `packaging/windows/WINDOWS_TEST_CHECKLIST.md`: Windows 11 x64 acceptance target.

The current install guide names Windows 11, while the older guide includes Windows
10. The website discloses that distinction instead of claiming Windows 10 has
passed acceptance. None of these sources defines numeric RAM or free-disk minima;
the website explicitly marks that guidance as pending. The checksum is supplied
by the task, not independently verified against an installer downloaded here.

Only the existing approved product logo is available in website assets. The
scientific-results cards are explicitly labeled placeholders, not fabricated
plots. The existing abstract atlas remains labeled as illustrative. To add real
examples, verify public sharing permission, dataset provenance, analysis methods
and software version; include a caption and descriptive alternative text.
`ResultsPreview` and `DemoPreview` in `src/components/research-beta.tsx` provide
layouts for future approved screenshots and videos. No video embeds, autoplay,
tracking, external fonts or heavy dependencies were added.

## Local review verification (2026-10-30)

- ESLint: passed (`eslint .`). TypeScript: passed (`tsc --noEmit`).
- Production export: passed (`next build --webpack`); all routes prerendered.
  The default Turbopack build failed on this machine while binding its local
  worker socket (`Operation not permitted`), including an elevated retry. The
  supported Webpack fallback succeeded; deployment/build configuration is unchanged.
- This shell has no `node`/`npm` on PATH. Checks used the existing Node 22.23.2
  executable at `/tmp/scrna-m1-windows-e8c7c5a/m1-windows-e8c7c5a/tools/node`
  with the repository's installed Next.js, ESLint and TypeScript CLI files.
  No dependencies or lockfiles were changed. On a normal Node 22 setup use
  `npm run build -- --webpack` for the same fallback, if needed.
- No pre-existing website test suite or test script was found.
- HTTP checks: 10 exported HTML routes (including the not-found page), 29 unique
  internal links/assets and all referenced anchors passed. No registration forms,
  payment controls, obsolete paid-plan copy or installer/artifact links were found.
- Chromium rendered production HTML/CSS/images at 1440, 390 and 320 px widths.
  All six views had no horizontal overflow or missing images; the Windows download
  button was disabled in every download-page view. Desktop homepage and mobile
  download screenshots were visually reviewed.
- Browser limitation: ordinary page navigation stalled in Chromium's child
  processes. Visual checks used self-contained copies of the production export
  with CSS/images inlined and scripts removed, rendered through CDP. These are
  **static layout checks**, not proof of client hydration or mobile-menu behavior.
  Recheck live client navigation/menu in a normal browser before publication.
- `git diff --check`: passed during preparation. Final deployment reruns ESLint,
  TypeScript, the Webpack export, link/asset checks and visual review before commit.

Local-only screenshots and QA reports are in ignored `review/`, outside `public/`
and the deployment export. Open `review/home-1440.png`, `review/download-1440.png`,
`review/home-390.png` and `review/download-390.png` (320 px versions also included).
To review the actual built site, run `npm run preview` and open
http://localhost:3000/ and http://localhost:3000/download/.

## Future environment variables

No environment variables are currently required. Future local configuration belongs in a gitignored `.env.local`; add documented nonsecret examples to `.env.example` when needed. On Cloudflare, put build variables in project settings. Anything prefixed `NEXT_PUBLIC_`, or rendered into exported pages, is public. Never embed Core credentials, model keys, or checkout secrets into this static site. Integrations that require secrets need a separately designed server service.

## Accessibility and behavior

Keyboard-visible focus, a skip link, native FAQ disclosures, a button-operated mobile menu, semantic landmarks, reduced-motion support, and descriptive illustration labeling are included. Availability notices use explicit text and working next-step links. No unavailable action is presented as an active button. Small text is at least 14px, supporting copy is 15–16px, and body text is 16px. The homepage principles strip stays at 16px on mobile. The illustrative SVG atlas is level and keeps its original aspect ratio. The footer year updates at build time; rebuild annually to refresh it.
