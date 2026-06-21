'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav style={{
      background: 'linear-gradient(180deg, #000000 0%, transparent 100%)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #222'
    }}>
      <Link href="/" style={{
        fontSize: '24px',
        fontWeight: '800',
        color: '#e50914',
        textDecoration: 'none',
        letterSpacing: '-0.5px'
      }}>
        🎬 MovieFinder
      </Link>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search movies..."
        style={{
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '8px 16px',
          color: '#fff',
          fontSize: '14px',
          width: '300px',
          outline: 'none',
        }}
      />
    </nav>
  );
}