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
- `/download/` — public Windows download, verified release metadata, three-step setup, requirements and trial details
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

## Windows installer publication and website deployment

Production uses the existing GitHub-connected Cloudflare Pages project
`labagentworks-web`, building `main` with `npm run build` and output `out/`.
There is no repository GitHub Actions deployment workflow: a push to `main`
triggers the Cloudflare Pages GitHub check. Preserve that integration.

Public Windows research beta: **0.3.0-beta.1**. The EXE is not Authenticode-signed.
Automated packaging/native Windows checks passed; full interactive Windows/WSL
qualification remains pending. Public distribution was explicitly requested.

- Application source: `472f45692765cb735a28650c29789cd6d66472ae`.
- Successful installer run: `GaoLab999/scrna-agent/actions/runs/43156278457`.
- Artifact: `scrna-agent-windows-private-beta` (ID `13915544108`).
- Matching signed application payload run: `43154596926`.
- EXE size: 2,548,224 bytes.
- SHA-256: `bcfaa1cd0817b0a5c6cbebb9460595be004181bad000a21785a9a2b0f662c9ca`.

The application repository is private. Distribute only the installer, checksum
files, and its build manifest as GitHub Release assets in this existing public
website repository; no application source or hosting infrastructure is added.
Release tag: `scrna-agent-windows-0.3.0-beta.1`.

Stable public URL:
https://github.com/GaoLab999/labagentworks-web/releases/latest/download/scRNA-agent-Setup.exe

Each published installer release includes a constant `scRNA-agent-Setup.exe`
asset as well as the original versioned filename. GitHub's latest-release alias
requires a published, non-prerelease release; this distribution setting does not
mean production qualification. The release title, notes, and website explicitly
identify the software as a research beta. Only designate a release latest after
verifying its installer. Retain versioned assets for reproducibility.

For future releases, retrieve the successful Actions installer artifact, verify
its EXE against the manifest and checksum file, upload the unchanged versioned
EXE and constant-name copy, and update `src/lib/site.ts` with its version, source,
checksum, and versioned URLs. Publish the release as latest. Verify both download
URLs without credentials and compare their hashes. Run lint, typecheck and build,
commit/push `main`, monitor its Cloudflare Pages check, and verify `/download/`.
Registration remains in Workbench; the website does not gate the public download.

The following sections preserve the original October candidate review history;
the release metadata and provenance above supersede that candidate.

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
