import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between rounded-xl2 bg-white/80 p-4 shadow-cozy backdrop-blur">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl2 bg-pumpkin-100">🎃</span>
          <span className="text-lg font-semibold text-gray-800">Pumpkin Products</span>
        </Link>
        <div className="flex items-center gap-3">
          {user && <span className="hidden text-sm text-gray-600 sm:block">{user.email}</span>}
          {user ? (
            <button className="btn btn-secondary" onClick={logout}>Log out</button>
          ) : (
            <Link to="/login" className="btn btn-primary">Log in</Link>
          )}
        </div>
      </div>
    </header>
  );
}