📖 MediReach Project README
🚀 Overview
MediReach is a full‑stack MERN application designed to provide a mission‑driven blog/dashboard experience aligned with SDG 3 (health and well‑being). It features a polished frontend deployed on Netlify and a backend deployed on Render, with real‑time capabilities via Socket.IO.

- Frontend (React) → Live Netlify Deploy  https://69202da108a2f3099ca3daf6--medireach-frontend.netlify.app/
- Backend (Node/Express/MongoDB) → Live Render Deploy  https://medireach-backend-y48e.onrender.com/

🛠️ Tech Stack
- Frontend: React, Axios, CSS (responsive, vibrant UI/UX)
- Backend: Node.js, Express, MongoDB Atlas
- Real‑time: Socket.IO
- Deployment:
- Frontend → Netlify
- Backend → Render
- Version Control: Git + GitHub

📂 Project Structure

MediReach Final Project/
│
├── backend/
│   ├── middleware/          # Custom middleware (auth, error handling)
│   ├── models/              # Mongoose models (User, Post, Category)
│   ├── routes/              # Express routes (auth, posts, categories)
│   ├── server.js            # Entry point for backend
│   ├── package.json         # Backend dependencies
│   ├── package-lock.json
│   └── .gitignore
│
├── frontend/
│   ├── public/              # Static assets + _redirects for React Router
│   ├── src/
│   │   ├── components/      # React components (Navbar, Dashboard, etc.)
│   │   ├── styles/          # CSS files
│   │   └── App.js           # Root component
│   ├── package.json         # Frontend dependencies
│   ├── package-lock.json
│   ├── .gitignore
│   └── README.md
│
└── README.md                # Comprehensive project documentation


⚙️ Setup Instructions
1. Clone the repo
git clone https://github.com/<your-username>/medireach.git
cd "MediReach Final Project"

2. Install dependencies
Frontend:
cd frontend
npm install

Backend:
cd backend
npm install


3. Environment variables
Create .env files in backend and configure:
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-secret>
PORT=5000


Frontend (set in Netlify dashboard):
REACT_APP_API_URL=https://medireach-backend-y48e.onrender.com
REACT_APP_SOCKET_URL=https://medireach-backend-y48e.onrender.com

▶️ Running Locally
Start the frontend
cd frontend
npm start


This launches the React development server at http://localhost:3000.

Start the backend
cd backend
node server.js


This launches the Express server at http://localhost:5000 (or the port defined in .env).

🧹 Git Hygiene
Frontend .gitignore
# Environment files
.env
.env.local
.env.production
.env.development.local
.env.test.local
.env.production.local

# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Production build
build

# Misc
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*


Backend .gitignore
# Environment files
.env
.env.local
.env.development
.env.production

# Dependencies
node_modules/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Misc
.DS_Store



🐛 Troubleshooting Journey
Case‑sensitivity conflict
- Error:
File name 'Navbar.jsx' differs from already included file name 'NavBar.jsx' only in casing.
- Cause: Git on Windows didn’t register case‑only rename.
- Fix:
git ls-files | findstr Navbar

- → Confirmed only Navbar.jsx exists.
Cleared TypeScript/VS Code cache (npx tsc --build --clean).
Netlify build succeeded.

Git tracking unwanted files- Problem: backend/node_modules and .env showed up in git status.
- Cause: Missing backend .gitignore.
- Fix: Added backend .gitignore and cleaned index with:
git rm -r --cached backend/node_modules
git rm --cached backend/.env
git commit -m "Remove backend junk files"
git push origin main


Netlify deployment- Successful deploy log:
- Build time: 24s
- 9 new files uploaded
- Production URL:
https://69202da108a2f3099ca3daf6--medireach-frontend.netlify.app/
Backend deployment- Render backend live at:
https://medireach-backend-y48e.onrender.com/


- Connected to MongoDB Atlas.
- Serves API endpoints for posts, categories, authentication, and Socket.IO events.
🌐 Deployment Notes- Frontend: Netlify auto‑publishes from main.
- Backend: Render handles API + Socket.IO.
- React Router: Add _redirects file in public/:
/*    /index.html   200


- Environment Variables: Must be set in Netlify dashboard for API calls.
  
📡 API DocumentationAuthentication- POST /api/auth/register → Register new user
- POST /api/auth/login → Login user, returns JWT

Posts- GET /api/posts → Get all posts
- GET /api/posts/:id → Get single post
- POST /api/posts → Create new post
- PUT /api/posts/:id → Update post
- DELETE /api/posts/:id → Delete post

Categories- GET /api/categories → Get all categories
- POST /api/categories → Create new category
  
Real‑time (Socket.IO)- Events: message, notification, update
- Used for dashboard live updates and messaging.

🎯 Lessons Learned
-Always ensure .gitignore is present in both frontend and backend.
- Case‑sensitivity matters on Linux servers (Netlify/Render).
- Clear caches (tsc, VS Code, Netlify) when phantom errors persist.
- Keep environment variables out of GitHub for security.
- Netlify builds only what GitHub tracks — local phantom errors don’t affect deployment.
- Render backend integrates seamlessly with MongoDB Atlas.



🏆 Credits- Developed by Jason Wamwea Kamau
Full MERN Stack 






