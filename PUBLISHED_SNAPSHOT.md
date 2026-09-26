# Offline public content

The Express/MongoDB API remains authoritative. Public server rendering requests `GET /api/public/snapshot`, which returns only published pages, products, scents, rewards, FAQs, and their public detail relationships. The frontend checks it on each request and saves a successful response atomically to `.published-snapshot/current.json`. That local runtime file survives a frontend restart and is ignored by Git. If a backend process has not yet loaded the snapshot route, the frontend can assemble the same public projection from the existing public endpoints.

When the API is unreachable, the frontend reads that runtime file. If there has not yet been a successful live read, it uses `data/published-snapshot.json`. Both files were refreshed on September 25, 2026, after the full editorial revision was saved to MongoDB. This export invoked the existing Express snapshot handler against live MongoDB without starting an HTTP listener (`source: live-cms-export`). It contains eight published pages (including signup), seven products, three scents, four FAQs, one reward, and public settings. It may predate later admin edits. An explicit notice and date appear on every page using saved content; those responses are marked `noindex`. Contact and subscription forms still require the live backend.

Do not edit the bundled JSON to make CMS changes. When the API is available, its current published content wins and refreshes the runtime snapshot. If neither snapshot is valid, visitors see a single retryable error state. No credentials or private admin data belong in either file.

## Prelaunch copy editing

- Edit public pages, product/scents copy and SEO, rewards, FAQ answers, and the brand tagline in their existing admin records. The full editorial revision is recorded by `Backend/scripts/cleanup-public-editorial.js` and its adjacent field-level manifest; it has already been applied and does not overwrite later edits when rerun. Initial seed copy is consistent with that revision; seeding was not used to rewrite existing content.
- The Page with key `signup` supplies its title, introduction, and body to both `/signup` and the shared footer. Consent and unsubscribe behavior remain in the existing form flow.
- Scent summaries and bodies appear before their related products. All three scent records currently lack approved descriptions and notes. Product descriptions are also empty; the frontend omits those secondary lines.
- No approved privacy content, packaging explanation, or detailed founder-origin story was found. None was fabricated for this revision.
