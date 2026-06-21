'use client';

import { useEffect, useState } from 'react';
import { getMovieDetails, IMAGE_BASE } from '../lib/tmdb';

export default function MovieModal({ movie, onClose, isFavorite, onToggleFavorite }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getMovieDetails(movie.id);
        setDetails(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();

    // Close on Escape key
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [movie.id]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#1a1a1a',
          borderRadius: '16px',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid #333',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.7)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: '#fff',
            fontSize: '18px',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {loading ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '300px',
            fontSize: '48px'
          }}>
            ⏳
          </div>
        ) : details ? (
          <>
            {/* Backdrop */}
            {details.backdrop_path && (
              <div style={{ position: 'relative', height: '250px', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`}
                  alt={details.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, #1a1a1a 0%, transparent 60%)'
                }} />
              </div>
            )}

            {/* Content */}
            <div style={{ padding: '24px', display: 'flex', gap: '20px' }}>
              {/* Poster */}
              {details.poster_path && (
                <img
                  src={`${IMAGE_BASE}${details.poster_path}`}
                  alt={details.title}
                  style={{
                    width: '120px',
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    flexShrink: 0,
                    marginTop: details.backdrop_path ? '-60px' : '0',
                    border: '3px solid #333',
                  }}
                />
              )}

              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>
                  {details.title}
                </h2>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span style={{ color: '#f5c518', fontSize: '14px' }}>
                    ⭐ {details.vote_average?.toFixed(1)}
                  </span>
                  <span style={{ color: '#888', fontSize: '14px' }}>
                    📅 {details.release_date?.split('-')[0]}
                  </span>
                  <span style={{ color: '#888', fontSize: '14px' }}>
                    ⏱ {details.runtime} min
                  </span>
                </div>

                {/* Genres */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {details.genres?.map(g => (
                    <span key={g.id} style={{
                      background: '#e50914',
                      color: '#fff',
                      padding: '2px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}>
                      {g.name}
                    </span>
                  ))}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => onToggleFavorite(details)}
                  style={{
                    background: isFavorite ? '#e50914' : 'transparent',
                    border: '2px solid #e50914',
                    color: '#fff',
                    padding: '6px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    marginBottom: '16px',
                  }}
                >
                  {isFavorite ? '❤️ Remove Favorite' : '🤍 Add to Favorites'}
                </button>
              </div>
            </div>

            {/* Overview */}
            <div style={{ padding: '0 24px 24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#ccc' }}>
                Overview
              </h3>
              <p style={{ fontSize: '14px', color: '#aaa', lineHeight: '1.6' }}>
                {details.overview || 'No overview available.'}
              </p>

              {/* Cast */}
              {details.credits?.cast?.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#ccc' }}>
                    Top Cast
                  </h3>
                  <p style={{ fontSize: '13px', color: '#888' }}>
                    {details.credits.cast.slice(0, 5).map(c => c.name).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
            Failed to load details.
          </div>
        )}
      </div>
    </div>
  );
}