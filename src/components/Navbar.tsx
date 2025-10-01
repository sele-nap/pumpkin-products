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
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between rounded-xl2 bg-white/80 p-4 shadow-cozy backdrop-blur">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl2 bg-pumpkin-100">🎃</span>
          <span className="text-lg font-semibold text-gray-800">Pumpkin Products</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn">Login</Link>
          <button className="btn btn-secondary" onClick={logout} disabled={loading}>Log out</button>
        </div>
      </div>
    </header>
  );
}