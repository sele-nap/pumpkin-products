import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100">
      <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
    </div>
  );
}