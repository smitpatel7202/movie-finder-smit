# AI_LOG.md — Movie Finder (FlowLaunch Assignment)

## Tools Used

| Tool | Purpose |
|------|---------|
| Claude (Anthropic) | Architecture planning, component generation, debugging |
| Next.js 15 (App Router) | Frontend framework |
| TMDB API | Movie data source |
| Vercel | Deployment |
| VS Code | Code editor |

---

## Best Prompts

### Prompt 1 — Component with edge cases upfront
> *"Create a Pagination component with Previous/Next buttons. Disable Previous on page 1,
> disable Next on the last page. Show current page and total pages in between.
> Style it with a dark theme using inline styles only."*

**Why it worked:** I gave the AI the complete interaction spec — not just "make pagination"
but also the disabled states and styling constraints. This eliminated an entire
back-and-forth cycle. The output was production-ready on the first attempt.

---

### Prompt 2 — Separation of concerns enforced via prompt
> *"Create a tmdb.js utility file inside app/lib/ that exports three separate async
> functions: getPopularMovies(page), searchMovies(query, page), and getMovieDetails(id).
> Each should throw a meaningful error if the fetch fails."*

**Why it worked:** By specifying the file location, function signatures, and error
handling behavior in the prompt itself, I enforced clean architecture from the start.
The AI didn't mix API logic into components — separation of concerns was built in,
not refactored in later.

---

### Prompt 3 — Debugging by describing symptoms, not guessing
> *"My Next.js app throws: Module not found: Can't resolve './components/FavoritesDrawer'.
> The file exists in the components folder. What are the most likely causes?"*

**Why it worked:** Instead of randomly trying fixes, I described the exact error and
context to the AI. It immediately surfaced the most common cause — filename mismatch.
I checked the file explorer and confirmed: the file was saved as `vouritesDrawer.js`
(missing the 'F'). One rename fixed it. Structured debugging beats random guessing.

---

## What I Fixed Manually

### Issue 1 — Filename typo causing build failure
**Problem:** After creating `FavoritesDrawer.js`, the app threw a build error:
`Module not found: Can't resolve './components/FavoritesDrawer'`

**Root cause:** The file had been saved as `vouritesDrawer.js` — the leading 'F' was
missing, likely a copy-paste or keyboard slip during file creation.

**Fix:** Renamed the file manually in VS Code's file explorer from `vouritesDrawer.js`
to `FavoritesDrawer.js`. Error resolved immediately on save.

**Lesson learned:** AI tools generate correct import paths assuming correct filenames.
The human still needs to verify the file system matches the code. A 30-second
file explorer check would have caught this before running the dev server.

---

### Issue 2 — Pagination showing more than 12 results on some pages
**Problem:** TMDB API returns 20 results per page by default. The spec required
exactly 12 per page — no more, no less.

**Fix:** Added `.slice(0, 12)` on the API response before setting state:
```js
setMovies(data.results.slice(0, MOVIES_PER_PAGE)); // MOVIES_PER_PAGE = 12
```

**Why this matters:** The AI generated working pagination but didn't account for
the spec's hard requirement of exactly 12. Reading the brief carefully revealed
this gap — the fix was one line but required human attention to the spec.

---

## Reflection

Using AI on this project felt like pair programming with a very fast junior developer
— it could scaffold components quickly and get the structure right, but it needed
a senior eye to catch spec mismatches, file system issues, and architectural decisions.

The most valuable skill wasn't prompting — it was knowing what to verify after the
AI output landed. Every component I reviewed against the assignment spec before
moving to the next one. That discipline is what kept the build clean.
