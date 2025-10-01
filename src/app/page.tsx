'use client';
import { useEffect, useState } from 'react';
import type { Product, ProductInput } from '@/types';
import ProductCard from '@/components/ProductCard';
import ProductForm from '@/components/ProductForm';

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    if (res.status === 401) { window.location.href = '/login'; return; }
    const data: Product[] = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = products.filter(
    (p) =>
      (p.name?.toLowerCase() ?? '').includes(search.toLowerCase()) ||
      (p.variety ?? '').toLowerCase().includes(search.toLowerCase())
  );

  // CREATE
  const handleCreate = async (payload: ProductInput) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) { await load(); setMode('list'); }
  };

  // UPDATE
  const handleUpdate = async (payload: ProductInput) => {
    if (!editing?.id) return;
    const res = await fetch(`/api/products/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) { await load(); setEditing(null); setMode('list'); }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) setProducts((ps) => ps.filter((p) => p.id !== id));
  };

  return (
    <div>
      {mode === 'list' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <div key={i} className="card h-40 animate-pulse" />)
          ) : filtered.length ? (
            filtered.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                onEdit={(pp) => { setEditing(pp); setMode('edit'); }}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">No products</div>
          )}
        </div>
      )}

      {mode === 'create' && (
        <ProductForm onSubmit={handleCreate} onCancel={() => setMode('list')} />
      )}

      {mode === 'edit' && editing && (
        <ProductForm
          initial={editing}
          onSubmit={handleUpdate}
          onCancel={() => { setEditing(null); setMode('list'); }}
        />
      )}
    </div>
  );
}