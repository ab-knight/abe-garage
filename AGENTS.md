# Abe Garage - Full-Stack Garage Management System

## Quick Start

```bash
# Backend
cd back-end
npm install
# Configure MySQL, copy .env.example -> .env, set credentials
node index.js   # -> http://localhost:4000

# Frontend (separate terminal)
cd front-end
npm install
npm run dev    # -> http://localhost:5173
```

## Test Accounts (Development Only)
```
admin@evangadi.com    / 123456  # Admin (role 3)
manager@evangadi.com  / 123456  # Manager (role 2)
employee@evangadi.com / 123456  # Employee (role 1)
```
**Change passwords before any real deployment!**

---

## Project Structure

```
Abe garage project/
+-- back-end/          # Express 5 API, port 4000
|   +-- src/
|   |   +-- config/          # db.config.js (MySQL pool)
|   |   +-- routes/          # employee, login, services, order, customer, vehicle, install
|   |   +-- controllers/     # one per domain (thin HTTP layer)
|   |   +-- services/        # business logic + SQL (one per domain)
|   |   +-- middleware/      # auth.middleware.js (JWT, roles, rate limit)
|   |   +-- utils/           # mailer.js (nodemailer)
|   |   +-- sql/             # 00-reset.sql through 13-order_status.sql
|   +-- .env / .env.production  (gitignored)
+-- front-end/         # React 19 + Vite, port 5173
|   +-- src/
|   |   +-- pages/           # Home, About, Service, Contact, Login, OrderDetail, 404, Unauthorized
|   |   +-- pages/Admin/     # Dashboard, Orders, NewOrder, Customers, AddCustomer, EditCustomer
|   |                        # Employees, AddEmployee, EditEmployee, Services
|   |   +-- components/      # forms, tables, cards, menus, auth guard, header/footer
|   |   +-- services/        # API clients (employee, customer, vehicle, order, service, login)
|   |   +-- context/         # AuthContext (JWT + localStorage sync)
|   |   +-- util/            # auth.js (localStorage), format.js (date formatter)
|   +-- .env / .env.production   (VITE_API_URL)
+-- Resources/         # WireFrames.txt (design reference), FunctionalScope.txt
+-- AGENTS.md          # This file
```

---

## Technology Stack

| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
| Runtime | Node.js | 24+ | ES Modules (`"type": "module"`) |
| Backend | Express | 5.x | REST API under `/api` |
| Database | MySQL | 8.0+ | `mysql2/promise`, pooled connections |
| Auth | bcrypt + JWT | 10 rounds / 24h | HS256, `x-access-token` header |
| Email | nodemailer | 10.x | Ethereal (dev) / Gmail (prod) |
| Frontend | React | 19 | Vite 8, React Router 7 |
| Styling | Plain CSS | ~2000 lines | CSS variables, responsive breakpoints |
| Linting | ESLint | flat config | `npm run lint` |

---

## Architecture

**Backend (layered)**
```
routes/ → controllers/ → services/ → MySQL
```

- `routes/`: URL mapping + auth middleware chain only
- `controllers/`: HTTP layer (validation, status codes, error handling)
- `services/`: All SQL, business logic, transactions (no HTTP knowledge)
- `middleware/auth.middleware.js`: `verifyToken`, `isAdmin`, `isManagerOrAdmin`, `verifyAdminOrBootstrap`, `loginRateLimit`

**Frontend (React + Vite)**
- Thin pages (`pages/`), smart components (`components/`)
- `AuthContext` + `localStorage` for JWT persistence
- `PrivateAuthRoute` guards admin/manager routes
- `services/` = thin fetch wrappers per domain

---

## Database (14 Tables)

| Table | Purpose |
|-------|---------|
| `employee` / `employee_info` / `employee_pass` / `employee_role` | Staff accounts, profiles, hashed passwords, roles |
| `company_roles` | 1=Employee, 2=Manager, 3=Admin |
| `customer_identifier` / `customer_info` | Customer accounts & profiles |
| `customer_vehicle_info` | Vehicles linked to customers |
| `common_services` | Service catalog (name + description) |
| `orders` / `order_info` / `order_services` / `order_status` | Orders, pricing, line items, status codes (0=Received, 1=In Progress, 2=Completed) |
| `install` | Fresh DB setup via `POST /api/install` (guarded by `ALLOW_INSTALL=true`) |

---

## API Reference (Base: `/api`)

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/employee/login` | — | `{email, password}` → `{success, token}` (rate-limited: 5/15min) |

### Employees (admin*, `*` = bootstrap when empty)
| Method | Endpoint | Auth | Body |
|--------|----------|------|------|
| GET | `/employees?limit=` | login | List with roles |
| GET | `/employee/:id` | login | Single employee |
| POST | `/employee` | admin* | `{email, first, last, phone, password, active?, role_id}` |
| PUT | `/employee` | admin | `{id, first?, last?, phone?, active?, role_id?}` |
| DELETE | `/employee/:id` | admin | Self-delete blocked |

### Services (admin write, public read)
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/services` | none |
| POST | `/service` | admin |
| PUT | `/service` | admin |
| DELETE | `/service/:id` | admin (400 if used in orders) |

### Customers & Vehicles (manager+)
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/customers?limit&search=` | manager+ |
| GET | `/customer/:id` | manager+ |
| POST | `/customer` | manager+ |
| PUT | `/customer` | manager+ |
| DELETE | `/customer/:id` | manager+ |
| POST | `/vehicle` | manager+ |
| GET | `/customer/:id/vehicles` | manager+ |

### Orders (all authenticated)
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/orders?limit&customer_id=` | login | Filter by customer |
| GET | `/order/:hash` | none | Public tracking |
| POST | `/order` | manager+ | Transaction: validates customer/employee/services |
| PUT | `/order` | manager+ | `{order_id, status: 0|1|2}` stamps completion |

### Install (guarded)
| Method | Endpoint | Guard |
|--------|----------|-------|
| POST | `/install` | `ALLOW_INSTALL=true` env |

---

## Security

- **Passwords**: bcrypt 10 rounds, only hashes stored
- **JWT**: HS256, 24h expiry, `x-access-token` header
- **Roles**: Admin(3) > Manager(2) > Employee(1) — enforced on routes + API
- **Bootstrap mode**: First admin created without token (`ALLOW_INSTALL` not needed)
- **Rate limit**: Login 5 req / 15 min / IP (`loginRateLimit` middleware)
- **Install endpoint**: Requires `ALLOW_INSTALL=true` env var (disable in prod)
- **CORS**: Enabled for dev; restrict to frontend origin in production

---

## Running Locally

```bash
# Backend
cd back-end
npm install
# Create MySQL DB 'abegaragemain', configure back-end/.env
node index.js  # -> http://localhost:4000

# Frontend (separate terminal)
cd ../front-end
npm install
npm run dev  # -> http://localhost:5173
```

**Fresh DB setup:**
```bash
curl -X POST http://localhost:4000/api/install  # needs ALLOW_INSTALL=true in .env
curl -X POST http://localhost:4000/api/employee \
  -H "Content-Type: application/json" \
  -d '{"employee_email":"admin@evangadi.com","employee_first_name":"Admin","employee_last_name":"User","employee_phone":"555-000-0003","employee_password":"123456","active_employee":1,"company_role_id":3}'
# Then login as admin to create manager/employee
```

---

## Deployment Checklist

- [ ] Set `NODE_ENV=production` and real `.env` values
- [ ] Disable `POST /api/install` (remove `ALLOW_INSTALL=true`)
- [ ] Configure Gmail SMTP in `.env` (app password, not account password)
- [ ] Set `FRONTEND_URL` to production domain
- [ ] Set strong `JWT_SECRET` (64+ chars)
- [ ] Disable `ALLOW_INSTALL` env var
- [ ] Run `npm run build` in front-end, serve `dist/` statically
- [ ] Set up reverse proxy (nginx) + TLS
- [ ] Rate-limit login (already: 5/15min), consider global rate limit
- [ ] Set up MySQL backups + monitoring

---

## Test Accounts (Dev Only — **Change Before Deploy**)

| Email | Password | Role |
|-------|----------|------|
| admin@evangadi.com | 123456 | Admin |
| manager@evangadi.com | 123456 | Manager |
| employee@evangadi.com | 123456 | Employee |

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `back-end/middleware/auth.middleware.js` | All auth logic (JWT, roles, rate limit, bootstrap) |
| `back-end/config/db.config.js` | MySQL pool + `query()` helper |
| `back-end/services/*.service.js` | All SQL lives here |
| `front-end/src/context/AuthContext.jsx` | Global auth state |
| `front-end/src/components/Auth/PrivateAuthRoute.jsx` | Route guard |
| `front-end/src/services/*.js` | API clients |
| `back-end/sql/00-13` | Schema (run via `/api/install`) |

---

## Common Commands

```bash
# Backend
cd back-end && npm install && node index.js

# Frontend
cd front-end && npm install && npm run dev

# Lint
cd front-end && npm run lint

# Build
cd front-end && npm run build

# Lint
npm run lint
```

---

## Known Gaps (Roadmap)

- [ ] Vehicle edit/delete + customer delete endpoints
- [ ] Service completion toggles on orders
- [ ] Input validation library (zod/joi)
- [ ] Automated tests (Vitest + Supertest)
- [ ] CI/CD pipeline
- [ ] Structured logging (pino/winston)
- [ ] Request validation middleware

---

> This file is the onboarding guide for anyone working on Abe Garage. Keep it updated.