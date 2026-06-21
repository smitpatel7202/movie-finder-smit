'use client';

export default function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      padding: '40px 0',
    }}>
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        style={{
          background: currentPage === 1 ? '#2a2a2a' : '#e50914',
          color: currentPage === 1 ? '#555' : '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 24px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
        }}
      >
        ← Previous
      </button>

      <span style={{
        color: '#888',
        fontSize: '14px',
        fontWeight: '500',
      }}>
        Page <span style={{ color: '#fff', fontWeight: '700' }}>{currentPage}</span> of{' '}
        <span style={{ color: '#fff', fontWeight: '700' }}>{totalPages}</span>
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        style={{
          background: currentPage === totalPages ? '#2a2a2a' : '#e50914',
          color: currentPage === totalPages ? '#555' : '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 24px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
        }}
      >
        Next →
      </button>
    </div>
  );
}