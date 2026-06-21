# 🎬 Movie Finder — Smit

A Movie Discovery App built with Next.js and the TMDB API.
Built as part of the FlowLaunch Full-Stack Developer Intern Assignment.

## 🌐 Live Demo
[View Live on Vercel](#) <!-- Add your Vercel URL here after deployment -->

## ✨ Features

- 🔥 Browse popular movies in a responsive grid
- 🔍 Real-time search by movie title
- 📄 Pagination with exactly 12 movies per page
- 🎬 Click any movie to view full details in a modal
- ❤️ Add/remove favorites (persisted via localStorage)
- ⚡ Loading, error, and empty states handled

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Inline Styles
- **API:** TMDB (The Movie Database)
- **Deployment:** Vercel

## 🚀 Run Locally

### 1. Clone the repo
\```bash
git clone https://github.com/YOUR_USERNAME/movie-finder-smit.git
cd movie-finder-smit
\```

### 2. Install dependencies
\```bash
npm install
\```

### 3. Add environment variables
Create a `.env.local` file in the root:
\```
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p/w500
\```

### 4. Run the development server
\```bash
npm run dev
\```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\```
movie-finder-smit/
├── app/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── MovieCard.js
│   │   ├── MovieModal.js
│   │   ├── Pagination.js
│   │   └── FavoritesDrawer.js
│   ├── lib/
│   │   └── tmdb.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── AI_LOG.md
├── .env.local
└── README.md
\```

## 📋 Assignment Requirements

| Requirement | Status |
|-------------|--------|
| Browse grid with poster, title, year, rating | ✅ |
| Real-time search | ✅ |
| Movie detail modal | ✅ |
| Favorites with localStorage | ✅ |
| Loading / error / empty states | ✅ |
| Pagination — exactly 12 per page | ✅ |
| Repo named `movie-finder-smit` | ✅ |
| AI_LOG.md present | ✅ |
| Footer: "Built for Jeevan — Smit" | ✅ |

## 🔑 API

This project uses the [TMDB API](https://www.themoviedb.org/).
Get your free API key at [themoviedb.org](https://www.themoviedb.org/signup).

---

*Built for Jeevan — Smit*