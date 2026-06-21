'use client';

import { IMAGE_BASE } from '../lib/tmdb';

export default function MovieCard({ movie, onClick, isFavorite, onToggleFavorite }) {
  return (
    <div
      onClick={() => onClick(movie)}
      style={{
        background: '#1a1a1a',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        border: '1px solid #222',
        position: 'relative',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(229,9,20,0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Favorite Button */}
      <button
        onClick={e => {
          e.stopPropagation();
          onToggleFavorite(movie);
        }}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'rgba(0,0,0,0.7)',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          cursor: 'pointer',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      {/* Poster */}
      {movie.poster_path ? (
        <img
          src={`${IMAGE_BASE}${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '100%', height: '280px', objectFit: 'cover' }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '280px',
          background: '#2a2a2a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px'
        }}>
          🎬
        </div>
      )}

      {/* Info */}
      <div style={{ padding: '12px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#fff',
          marginBottom: '6px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {movie.title}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#888' }}>
            {movie.release_date?.split('-')[0] || 'N/A'}
          </span>
          <span style={{
            fontSize: '12px',
            color: '#f5c518',
            fontWeight: '600'
          }}>
            ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}