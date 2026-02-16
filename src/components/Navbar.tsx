'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  
  const logout = async () => {
    setLoading(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    setLoading(false);
    window.location.href = '/login';
  };

  // Check if user is on login/signup pages
  const isAuthPage = typeof window !== 'undefined' && 
    (window.location.pathname === '/login' || window.location.pathname === '/signup');

  return (
    <header className="mb-6">
      <div className="flex items-center justify-between rounded-xl bg-white/80 p-4 shadow-cozy backdrop-blur">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-pumpkin-100">🎃</span>
          <span className="text-lg font-semibold text-gray-800">Pumpkin Products</span>
        </Link>
        <div className="flex items-center gap-3">
          {!isAuthPage && (
            <button 
              className="btn btn-secondary" 
              onClick={logout} 
              disabled={loading}
            >
              {loading ? 'Logging out...' : 'Log out'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}