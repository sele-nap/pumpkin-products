import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault(); setError(null);
    try { await signup(email, password); nav('/'); }
    catch (e:any) { setError(e?.response?.data?.message ?? "Cannot create account"); }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-6">
        <h1 className="mb-4 text-2xl font-semibold">Create an account</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <p className="mt-1 text-xs text-gray-500">Minimum 6 characters.</p>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn btn-primary w-full" type="submit">Create</button>
        </form>
        <p className="mt-4 text-sm text-gray-600">Already have an account? <Link className="text-pumpkin-700 underline" to="/login">Log in</Link></p>
      </div>
    </div>
  );
}