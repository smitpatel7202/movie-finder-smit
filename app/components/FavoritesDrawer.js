'use client';

import { IMAGE_BASE } from '../lib/tmdb';

export default function FavoritesDrawer({ favorites, onClose, onRemove, onMovieClick }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 90,
        display: 'flex',
        justifyContent: 'flex-end',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#111',
          width: '360px',
          height: '100%',
          overflowY: 'auto',
          borderLeft: '1px solid #222',
          padding: '24px',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
            ❤️ Favorites ({favorites.length})
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#888',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#555',
            marginTop: '60px',
            fontSize: '14px',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎬</div>
            <p>No favorites yet!</p>
            <p style={{ marginTop: '8px' }}>Click ❤️ on any movie to save it.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {favorites.map(movie => (
              <div
                key={movie.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  background: '#1a1a1a',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid #222',
                  cursor: 'pointer',
                }}
                onClick={() => onMovieClick(movie)}
              >
                {/* Poster */}
                {movie.poster_path ? (
                  <img
                    src={`${IMAGE_BASE}${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: '60px', height: '90px', objectFit: 'cover', flexShrink: 0 }}
                  />
                ) : (
                  <div style={{
                    width: '60px',
                    height: '90px',
                    background: '#2a2a2a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    flexShrink: 0,
                  }}>
                    🎬
                  </div>
                )}

                {/* Info */}
                <div style={{ flex: 1, padding: '10px 10px 10px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>
                    {movie.title}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>
                      {movie.release_date?.split('-')[0] || 'N/A'}
                    </span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onRemove(movie);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#e50914',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: '600',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}