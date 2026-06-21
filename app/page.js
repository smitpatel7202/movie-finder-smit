'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import Pagination from './components/Pagination';
import FavoritesDrawer from './components/FavoritesDrawer';
import { getPopularMovies, searchMovies } from './lib/tmdb';

const MOVIES_PER_PAGE = 12;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('moviefinder-favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('moviefinder-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch movies
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (query.trim()) {
        data = await searchMovies(query, page);
      } else {
        data = await getPopularMovies(page);
      }
      // Exactly 12 per page
      setMovies(data.results.slice(0, MOVIES_PER_PAGE));
      setTotalPages(Math.min(data.total_pages, 500));
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies();
    }, query ? 500 : 0);
    return () => clearTimeout(timer);
  }, [fetchMovies, query]);

  // Reset to page 1 on new search
  useEffect(() => {
    setPage(1);
  }, [query]);

  const handleToggleFavorite = (movie) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === movie.id);
      if (exists) return prev.filter(f => f.id !== movie.id);
      return [...prev, movie];
    });
  };

  const isFavorite = (movie) => favorites.some(f => f.id === movie.id);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f' }}>
      <Navbar onSearch={setQuery} />

      {/* Favorites Button */}
      <button
        onClick={() => setShowFavorites(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#e50914',
          border: 'none',
          borderRadius: '50px',
          padding: '12px 20px',
          color: '#fff',
          fontSize: '14px',
          fontWeight: '700',
          cursor: 'pointer',
          zIndex: 80,
          boxShadow: '0 4px 20px rgba(229,9,20,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        ❤️ {favorites.length}
      </button>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Page Title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#fff' }}>
            {query ? `Results for "${query}"` : '🔥 Popular Movies'}
          </h1>
          <p style={{ color: '#555', fontSize: '14px', marginTop: '4px' }}>
            Page {page} · 12 movies per page
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
            gap: '16px',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '4px solid #222',
              borderTop: '4px solid #e50914',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            <p style={{ color: '#555', fontSize: '14px' }}>Loading movies...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#e50914',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <p style={{ fontSize: '18px', fontWeight: '600' }}>{error}</p>
            <button
              onClick={fetchMovies}
              style={{
                marginTop: '16px',
                background: '#e50914',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 24px',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && movies.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#555',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p style={{ fontSize: '18px', fontWeight: '600', color: '#888' }}>
              No movies found for "{query}"
            </p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>
              Try a different search term
            </p>
          </div>
        )}

        {/* Movies Grid — Exactly 12 per page */}
        {!loading && !error && movies.length > 0 && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '20px',
            }}>
              {movies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={setSelectedMovie}
                  isFavorite={isFavorite(movie)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPrev={() => setPage(p => Math.max(1, p - 1))}
              onNext={() => setPage(p => Math.min(totalPages, p + 1))}
            />
          </>
        )}
      </main>

      {/* Footer - R4 Requirement */}
      <footer style={{
        borderTop: '1px solid #1a1a1a',
        padding: '24px',
        textAlign: 'center',
        color: '#444',
        fontSize: '13px',
      }}>
        Built for Jeevan — Smit
      </footer>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFavorite={isFavorite(selectedMovie)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Favorites Drawer */}
      {showFavorites && (
        <FavoritesDrawer
          favorites={favorites}
          onClose={() => setShowFavorites(false)}
          onRemove={handleToggleFavorite}
          onMovieClick={(movie) => {
            setSelectedMovie(movie);
            setShowFavorites(false);
          }}
        />
      )}
    </div>
  );
}