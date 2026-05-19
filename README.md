# Korea Trip Planner — GitHub/Vercel Package

This is a static export of the Korea 2026 trip planner, prepared for GitHub + Vercel deployment.

## Deploy on Vercel

1. Create a new GitHub repo and push this folder.
2. In Vercel, import the GitHub repo.
3. Framework preset: **Other**
4. Root directory: repo root
5. Build command: leave empty
6. Output directory: leave empty

## Local preview

```bash
python3 -m http.server 8768
```

Then open `http://127.0.0.1:8768`.

## Notes

- This package is static HTML/CSS/JS/images.
- Countdown behavior is client-side via `static/js/app.js`.
- Clean routes are handled by `vercel.json` rewrites.
