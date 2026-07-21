# Suhas SK — Immersive Portfolio

An immersive, dark-themed personal portfolio site built with React, Tailwind CSS, Framer Motion, and React Three Fiber, with a FastAPI + MongoDB backend powering the projects feed and contact form.

**Live demo:** _add your deployed URL here_

---

## ✨ Features

- **Immersive hero** — cursor-tracking 3D icosahedron built with React Three Fiber, animated particle field
- **Glassmorphism About section** with stat cards
- **Horizontal-scroll Projects showcase**, data-driven from the backend API
- **Contact form** with client-side validation (react-hook-form + zod), toast notifications (sonner), MongoDB persistence, and optional email delivery via Resend
- **Smooth scrolling** via Lenis
- **Fully responsive**, accessible UI built on Radix primitives / shadcn-style components

---

## 🛠 Tech Stack

**Frontend**
- React 19, Create React App (via [craco](https://craco.js.org/))
- Tailwind CSS, Radix UI, shadcn-style components
- Framer Motion, React Three Fiber, Lenis (smooth scroll)
- react-hook-form + zod, axios, sonner

**Backend**
- FastAPI + Uvicorn
- MongoDB via Motor (async driver)
- Pydantic for validation
- Resend for transactional email

---

## 📁 Project Structure

> Note: this repo currently nests the project one folder deeper, under `Sk_Portfolio-main/`. Keep that in mind for the paths below and for the Vercel Root Directory setting.

```
Personal_Portfoio/
└── Sk_Portfolio-main/
    ├── backend/
    │   ├── server.py          # FastAPI app (routes prefixed with /api)
    │   ├── requirements.txt
    │   └── tests/
    ├── frontend/
    │   ├── src/
    │   │   ├── components/    # Hero, About, Projects, Contact, Nav, Footer, etc.
    │   │   └── App.js
    │   ├── public/
    │   └── package.json
    └── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and Yarn
- Python 3.10+
- A MongoDB instance (local, or a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repo
```bash
git clone https://github.com/SuhasReturn/Personal_Portfoio.git
cd Personal_Portfoio/Sk_Portfolio-main
```

### 2. Backend setup
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `backend/.env` file:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio
CORS_ORIGINS=http://localhost:3000
RESEND_API_KEY=            # optional, enables email sending
SENDER_EMAIL=onboarding@resend.dev
OWNER_EMAIL=you@example.com
```

Run the API:
```bash
uvicorn server:app --reload --port 8000
```

### 3. Frontend setup
```bash
cd frontend
yarn install
```

Create a `frontend/.env` file:
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

Run the dev server:
```bash
yarn start
```

The app will be available at `http://localhost:3000`.

### Available scripts (frontend)
| Command       | Description                          |
|---------------|---------------------------------------|
| `yarn start`  | Runs the app in development mode       |
| `yarn build`  | Builds the app for production          |
| `yarn test`   | Runs the test suite                    |

### API Endpoints (backend)
| Method | Endpoint               | Description                       |
|--------|-------------------------|------------------------------------|
| GET    | `/api/`                 | Health check                       |
| GET    | `/api/projects`         | Returns curated project list       |
| POST   | `/api/contact`          | Submits a contact form message     |
| GET    | `/api/contact/messages` | Lists stored contact submissions   |

---

## ☁️ Deployment (single Vercel project)

Both the frontend and backend can be deployed together as **one Vercel project**, using Vercel's Python serverless runtime for the FastAPI API. This repo includes the config for that:

- `api/index.py` — thin entrypoint that imports the existing FastAPI `app` from `backend/server.py` so Vercel's Python runtime can detect and run it as a serverless function
- `vercel.json` — builds the React app as a static site and the API as a Python function, and routes `/api/*` to the function and everything else to the frontend
- `requirements.txt` (root) — a trimmed dependency list for the serverless function (kept separate from `backend/requirements.txt`, which still has the full dev/test toolchain)

Set Vercel's **Root Directory** to `Sk_Portfolio-main` (this repo nests the project one level in), then follow the full step-by-step in the project notes.

## 📄 License

This project is personal portfolio code. Feel free to reference it, but please don't republish it as your own.
