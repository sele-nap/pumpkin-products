import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Pumpkin Products',
  description: 'Pumpkins CRUD',
  icons: {
    icon: '/pumpkin.png',
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100 text-gray-800">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}