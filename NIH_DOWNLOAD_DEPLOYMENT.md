# NIH Download Agent private beta deployment

Status: code prepared on `feature/nih-download-agent-download`; not deployed.
The owner will configure Cloudflare resources and secrets. Do not merge to main
until storage, secrets and preview acceptance checks below pass.

## Existing infrastructure and minimal addition

Repository: https://github.com/GaoLab999/labagentworks-web
Production: https://labagentworks.com
Cloudflare Pages project: `labagentworks-web`, GitHub-connected, production branch
`main`, build `npm run build`, output `out`. Preserve these settings. Root-level
`functions/` adds Pages Functions automatically; `public/_routes.json` restricts
function invocation to `/api/nih/*`. All existing pages remain static. scRNA-agent
release assets, URLs, licensing and download behavior are unchanged.

Add one private R2 bucket and one D1 database to the existing account. No new
website, standalone Worker service, account system or public installer copy is
needed. Pages Functions, D1 and R2 have usage quotas/billing; inspect the account's
plan and limits before enabling them. No resources were provisioned in this task.
See [Pages bindings](https://developers.cloudflare.com/pages/functions/bindings/)
and [Functions pricing](https://developers.cloudflare.com/pages/functions/pricing/).

## Configure storage and bindings

1. Create a private R2 bucket (suggested name `labagentworks-private-downloads`).
   Keep its `r2.dev` public access disabled and attach no public custom domain.
   Bind it to the Pages project as `NIH_BUCKET`.
2. Create a D1 database (suggested name `labagentworks-nih-auth`) and execute
   `server/nih-auth.sql` against it. Bind it as `NIH_AUTH_DB`.
3. Configure bindings separately for production and preview in Pages settings.
   Use separate preview resources/secrets or restrict previews to trusted reviewers.
   Do not enable public bucket access or attach unrelated Functions middleware.
4. Retrieve the installer using authenticated GitHub access, outside `public/` and
   `out/`. The local ignored `review/nih-release/` copy was downloaded directly
   from private GitHub release asset ID `765231566` and verified in this task.

```sh
gh release download v0.2.0-beta.1 --repo GaoLab999/nih-download-agent \
  --pattern NIH-Download-Agent-Setup.exe --dir review/nih-release
sha256sum review/nih-release/NIH-Download-Agent-Setup.exe
```

Expected bytes: 11,512,320. Expected SHA256:
`229120f30b6906b0f5e0dbd1c1a01368f689ef334f6bce90e32e9f9d87fa080b`.
Source release: https://github.com/GaoLab999/nih-download-agent/releases/tag/v0.2.0-beta.1

5. Use `scripts/upload-nih-installer.py` with `CLOUDFLARE_ACCOUNT_ID`,
   `CLOUDFLARE_API_TOKEN` and `NIH_R2_BUCKET` provided securely in the environment
   (not shell history, committed files, or frontend variables). Scope the API token
   to the required account/bucket operations. The script verifies the input hash,
   uploads it, reads it back through authenticated access and verifies it again.
   This helper has not been exercised against live R2 in this task.

```sh
python3 scripts/upload-nih-installer.py review/nih-release/NIH-Download-Agent-Setup.exe
```

Object key: `nih-download-agent/v0.2.0-beta.1/NIH-Download-Agent-Setup.exe`.
The server additionally hashes the actual 11.5 MB object on every authorized
request before delivering bytes; incorrect or missing objects return 503.

## Configure owner-supplied password

Use a password-manager-generated shared password of at least 16 characters.
Do not use the initially proposed weak password. Do not send passwords in chat.
With authenticated Wrangler installed locally, run:

```sh
python3 scripts/configure-nih-secrets.py
```

This prompts without echo and sends three values to Cloudflare Pages secrets
through subprocess stdin: `NIH_PASSWORD_SALT` (16 random bytes as hex),
`NIH_PASSWORD_VERIFIER` (PBKDF2-HMAC-SHA256, 100,000 iterations, 32 bytes as hex),
and `NIH_TOKEN_SECRET` (32 random bytes as hex). It never writes the password or
verifier to files or prints them. The script configures the production project;
configure preview secrets separately with the same formats. Redeploy after changes.
No `NEXT_PUBLIC_` variables are used. Keep request-body/cookie capture disabled in
any external logging integrations. Application handlers never log these values.
To rotate access, rerun the complete script and redeploy; rotating the signing
secret invalidates existing cookies. Protect the verifier like a password secret.

## Authorization behavior

- Product page: `/products/nih-download-agent/`.
- Clicking Download opens a native, keyboard-accessible password dialog.
- `POST /api/nih/authorize` requires HTTPS, same-origin JSON and Cloudflare's
  trusted `CF-Connecting-IP`. It verifies the password server-side.
- D1 atomically counts every attempt (including successes), allowing five per IP
  per fixed 15-minute window. Excess attempts return 429 with Retry-After.
  HMAC-derived identifiers avoid storing raw IP addresses; expired rows are
  removed on subsequent attempts. This is basic per-IP protection: shared networks
  share a quota, fixed-window boundaries allow bursts, and distributed attackers
  can use multiple IPs. Consider Cloudflare WAF rules if abuse warrants it.
- Success sets an HMAC-signed, five-minute cookie with HttpOnly, Secure and
  SameSite=Strict, scoped to `/api/nih/`. No token appears in a download URL.
- `GET /api/nih/download` requires a valid cookie and streams no bytes until the
  actual object hash matches. Responses are private/no-store. No permanent public
  file URL exists. Tokens can be reused within five minutes; authorized recipients
  can retain or redistribute the downloaded file (shared-password access is not DRM).
- Missing configuration or failed dependencies return 503; invalid authorization
  returns 401. Disable access by removing a secret and redeploying.
- The pinned object is buffered for SHA verification. This is appropriate for this
  11.5 MB release; reassess memory/CPU limits before supporting larger installers.
  Range requests currently receive the full file; interrupted installer transfers
  restart. The product's resumable dataset downloads are a separate feature.

## Validation and rollout

```sh
node --test tests/nih-download.test.mjs
npm run lint
npm run typecheck
npm run build
```

Use Node 22. The existing environment needs the documented `--webpack` build
fallback and unrestricted subprocess execution; production build settings remain
unchanged. Tests use actual SQLite for atomic counter statements and a mocked R2
binding. The final test uses the ignored release EXE when available, otherwise
explicitly skips. They are not a live Cloudflare integration test.

Before merging the feature branch to `main`, use its Cloudflare preview with the
configured resources to check:

- Existing routes and scRNA Windows/Mac links remain unchanged.
- Product page, mobile menu and dialog work on desktop and mobile, including
  keyboard focus, Escape, error states and the granted-download link.
- Wrong password returns 401; sixth attempt returns 429. Correct password grants
  access from a fresh test IP/window. HTTP does not deliver files.
- Direct unauthenticated download, expired and tampered cookies return 401.
- Correct download yields the expected filename, 11,512,320 bytes and exact hash.
- Bucket has no public URL; preview/production responses have no-store headers.
- Missing binding/secrets and incorrect object bytes fail closed.
- Verify Pages CPU/memory limits under real password checks and concurrent downloads.
- Search built frontend assets for the actual configured secret values locally,
  without printing them; none may be present. Server modules must not be bundled
  into `out/`. Do not publish or commit the installer or any secrets.

After these checks, merge through the existing main-branch Git workflow and monitor
its Cloudflare Pages check. Repeat the download/hash checks at labagentworks.com.
No production merge/deployment was performed: owner configuration is still needed.

## Results from this implementation session

- Authenticated private GitHub asset download: PASS; SHA256 and size match above.
- Six server tests: PASS, including wrong/correct passwords, direct/expired/tampered
  authorization, concurrent rate limiting, missing dependencies, wrong object
  bytes, and authorized delivery of the actual release EXE through a mocked binding.
- ESLint, TypeScript and production Webpack export: PASS.
- Static export: 13 HTML files and 31 unique internal link/asset paths checked;
  no missing targets. scRNA release configuration and both download/product page
  sources are unchanged.
- Frontend scan: no server verifier/signing configuration, PBKDF2 implementation,
  or EXE in the export. No owner password has been supplied or stored.
- Chromium static layout checks: PASS at 1440, 390 and 320 px, including open
  dialog, focused password field, and no horizontal overflow. Mobile screenshot
  reviewed. Normal browser navigation stalled; these checks used exported HTML
  with inline CSS and scripts removed. Hydration, mobile-menu behavior and actual
  frontend submission remain unverified. Screenshots/reports are ignored in review/.
- Live R2, Cloudflare Functions, deployed installer download, and production
  SHA256 checks: NOT RUN; resources and secrets await owner configuration.
