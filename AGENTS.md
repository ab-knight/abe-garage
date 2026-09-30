# Abe Garage Project

Monorepo-style layout, but `back-end/` and `front-end/` are **independent npm packages** (no root manifest, no npm workspaces, separate `package-lock.json`s). Run npm commands inside each folder. `Resources/` holds the design docs — `WireFrames.txt` is the source of truth for planned routes, and it contains the real DB name/password.

## Git / environment gotchas
- The git repo root is `C:\Users\abely` (the whole home directory), **not** this project. Nothing in this project is committed yet, and `git status` from home is extremely noisy. Scope every git command/path explicitly to this folder.
- Never commit `.env*`: `back-end/.gitignore` lists `.env_production` (underscore) but the actual files are `.env.production` (dot), so they are **not** ignored and are currently untracked. The same goes for the plaintext credentials in `Resources/WireFrames.txt`.

## Backend (`back-end/`) — scaffold only, not runnable
- Intended stack: Express-style MVC over MySQL (`mysql2`), CommonJS (`"type": "commonjs"`), config via `.env` (port 4000, DB `abegaragemain`). `.env` exists locally but is gitignored.
- `app.js` and every file under `routes/`, `controllers/`, `services/`, `middleware/` are empty (0 bytes). `config/db.config` contains a stray `import` line — invalid ESM inside a CommonJS package; fix/replace when implementing.
- No `express` dependency and no start script yet; `npm test` is a placeholder that exits 1.
- Repo-wide convention: the domain is consistently misspelled `vechile`/`vechiles` in filenames — keep that spelling to match.

## Frontend (`front-end/`) — starter template, not the real app
- Vite + React 19, plain JS (JSX, no TypeScript), ESLint flat config (react-refresh rules). Commands (from this folder): `npm run dev`, `npm run build`, `npm run lint`. No tests or typecheck.
- `src/App.jsx` is still the default Vite counter demo. Real pages exist only as empty stubs in `src/markup/pages/` (Home, About, Service, Contact, Login, 404) and `src/markup/components/`. No router installed yet, though `Resources/WireFrames.txt` defines the route plan.
- API client stubs live in `src/services/` (empty; names mirror the backend services).