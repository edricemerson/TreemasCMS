# Treemas CMS (Frontend)

Admin CMS for Treemas CSR — manage website content, master data, CSR assessment groups, companies, and reports. Built with React 19, TypeScript, and Vite.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** — dev server / bundler
- **React Router v7** — client-side routing
- **Tailwind CSS 4**
- **i18next / react-i18next** — English & Indonesian localization
- **Recharts** — dashboard/report charts
- **xlsx**, **jspdf**, **html2canvas** — data export and report generation

## Requirements

- Node.js 18+
- A running instance of the [backend API](../TMS-CSR-backend) (defaults to `http://localhost:3000`)

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts on the default Vite port (`http://localhost:5173`).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
src/
├── locales/            # i18next translation files (en, id)
├── page/
│   ├── login.tsx / menu.tsx / home.tsx   # entry & shell pages
│   ├── AuthContext.tsx                   # auth state/context
│   ├── DashboardApp/                     # dashboard overview
│   ├── WebsiteContentApp/                # public website content editor (hero, about, solutions, team, contact, ...)
│   ├── MasterDataApp/                    # master data management (business type/size, provinces, etc.)
│   ├── AssesmentGroupApp/                # CSR assessment groups, categories, questions
│   ├── CompaniesApp/                     # company/business profile management
│   ├── ReportsApp/                       # assessment reports, charts, Excel/PDF export
│   ├── SettingsApp/                      # user management & app settings
│   └── form/                             # public-facing company info form + API client
├── App.tsx              # route definitions
└── main.tsx              # app entry point
```

## Routing

| Path | Page |
| --- | --- |
| `/` | Login |
| `/menu` | Menu shell (nested routes below) |
| `/menu/dashboard` | Dashboard |
| `/menu/website-content` | Website content editor |
| `/menu/master-data` | Master data |
| `/menu/assessment-groups` | Assessment groups |
| `/menu/companies` | Companies |
| `/menu/reports` | Reports |
| `/menu/settings` | Settings |
| `/home` | Home |
| `/form` | Company info form |

## Configuration

The app talks to the backend API directly via URLs in the `page/**/api` modules (e.g. `http://localhost:3000/api/...`). Update these if the backend runs on a different host/port.

## Related

- [Backend API (TMS-CSR-backend)](../TMS-CSR-backend)


# TMS-CSR Backend

REST API for the Treemas CSR platform — serves the [CMS frontend](../TreemasCMS) and the public CSR self-assessment. Built with Express 5 and PostgreSQL.

## Tech Stack

- **Node.js** + **Express 5**
- **PostgreSQL** (`pg`)
- **JWT** (`jsonwebtoken`) — admin authentication
- **bcryptjs** — password hashing
- **multer** — image uploads
- **dotenv**, **cors**

## Requirements

- Node.js 18+
- PostgreSQL

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=tms_csr
   DB_PASSWORD=your_password
   DB_PORT=5432
   PORT=3000
   JWT_SECRET=your_jwt_secret
   AES_SECRET_KEY=your_aes_secret_key
   AES_IV=your_aes_iv
   ```

3. Create the `tms_csr` PostgreSQL database and run any setup SQL (see `tms_csr.session.sql`).

4. (Optional) Seed dummy data:

   ```bash
   node seeder/seeder-dummy.js
   ```

5. Start the server:

   ```bash
   npm run dev   # nodemon, auto-restart
   npm start     # plain node
   ```

The API listens on `http://localhost:3000` by default.

## Project Structure

```
src/
├── config/
│   └── db.js                 # PostgreSQL connection pool
├── controllers/               # request handlers per resource
├── middlewares/
│   ├── authMiddleware.js      # JWT verification
│   └── upload.js              # multer image upload config
└── routes/                    # Express routers, mounted in index.js
seeder/
└── seeder-dummy.js            # dummy data seeder
index.js                       # app entry point
```

## API Routes

All routes are mounted under `/api`. Routes marked 🔒 require a valid JWT (`Authorization` header, verified by `authMiddleware`).

### Auth — `/api/admin`
| Method | Path | Description |
| --- | --- | --- |
| POST | `/login` | Admin login |
| POST | `/register` | Register admin |
| POST | `/logout` | Logout |
| POST | `/refresh-token` | Refresh JWT |

### CMS — `/api/cms`
| Method | Path | Description |
| --- | --- | --- |
| GET | `/solutions` | List solutions (public) |
| GET | `/team` | List team members (public) |
| GET | `/settings` | General site settings (public) |
| GET | `/public/landing` | Landing page content (public) |
| POST | `/solutions` 🔒 | Add solution |
| PUT | `/solutions/:id` 🔒 | Update solution |
| DELETE | `/solutions/:id` 🔒 | Delete solution |
| POST | `/solutions/sync` 🔒 | Sync solutions |
| PUT | `/settings` 🔒 | Update general settings |
| POST | `/team` 🔒 | Add team member |
| PUT | `/team/:id` 🔒 | Update team member |
| DELETE | `/team/:id` 🔒 | Delete team member |
| POST | `/team/sync` 🔒 | Sync team members |

### Business / Companies — `/api/business` (also aliased at `/api/profile`)
| Method | Path | Description |
| --- | --- | --- |
| POST | `/submit` | Submit a business profile |

### Assessment — `/api/assessment`
| Method | Path | Description |
| --- | --- | --- |
| GET | `/questions` | Get assessment questions (public) |
| POST | `/submit` | Submit an assessment (public) |
| GET | `/result/:resultId` | Get an assessment result (public) |
| GET | `/all` 🔒 | List all results |
| GET | `/profile-detail/:profileId` 🔒 | Business profile detail |
| PUT | `/insights/:resultId` 🔒 | Save insight notes on a result |
| POST/PUT/DELETE | `/groups[/:id]` 🔒 | Manage assessment groups |
| POST/PUT/DELETE | `/subgroups[/:id]` 🔒 | Manage subgroups |
| POST/PUT/DELETE | `/categories[/:id]` 🔒 | Manage categories |
| POST/PUT/DELETE | `/questions[/:id]` 🔒 | Manage questions |
| POST/PUT/DELETE | `/options[/:id]` 🔒 | Manage question options |

### Master Data — `/api/master-data`
| Method | Path | Description |
| --- | --- | --- |
| GET | `/` , `/:table` | List rows from a master data table |
| POST | `/:table` | Add a row |
| PUT | `/:table/:id` | Update a row |
| DELETE | `/:table/:id` | Delete a row |

### Analytics — `/api/analytics`
| Method | Path | Description |
| --- | --- | --- |
| GET | `/dashboard-summary` | Dashboard summary stats |

### Settings — `/api/settings`
| Method | Path | Description |
| --- | --- | --- |
| GET | `/users` | List admin users |
| POST | `/users` | Add admin user |
| PUT | `/users/:id` | Update admin user |
| DELETE | `/users/:id` | Delete admin user |
| PUT | `/change-password` 🔒 | Change password |

### Upload — `/api/upload`
| Method | Path | Description |
| --- | --- | --- |
| POST | `/image` | Upload an image (`multipart/form-data`, field `image`) |

Uploaded files are served statically from `/uploads`.

## Related

- [Frontend CMS (TreemasCMS)](../TreemasCMS)

## Security Note

`.env` is currently tracked by git in this repo (`.gitignore` has the `.env` line commented out), which means real DB credentials and secrets are committed. Uncomment `.env` in `.gitignore`, remove it from git history/tracking, and rotate the exposed credentials.
