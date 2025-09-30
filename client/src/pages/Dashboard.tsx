import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import ProductForm from '@/components/ProductForm';

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [mode, setMode] = useState<'list'|'create'|'edit'>('list');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await api.get<Product[]>('/products');
    setProducts(data); setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = products.filter(p => (
    (p.name?.toLowerCase() ?? '').includes(search.toLowerCase()) ||
    (p.variety?.toLowerCase() ?? '').includes(search.toLowerCase())
  ));

  const handleCreate = async (payload: Product) => {
    await api.post('/products', payload);
    await load(); setMode('list');
  };

  const handleUpdate = async (payload: Product) => {
    await api.put(`/products/${editing!._id}`, payload);
    await load(); setEditing(null); setMode('list');
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/products/${id}`);
    setProducts(ps => ps.filter(p => p._id !== id));
  };

  return (
    <div>
      <div className="mb-4 flex flex-col items-stretch justify-between gap-3 sm:flex-row">
        <input className="input w-full sm:w-80" placeholder="Search for a pumpkin..." value={search} onChange={e=>setSearch(e.target.value)} />
        <div className="flex gap-2">
          {mode === 'list' ? (
            <button className="btn btn-primary" onClick={()=>{ setMode('create'); }}>Add a pumpkin</button>
          ) : (
            <button className="btn" onClick={()=>{ setMode('list'); setEditing(null); }}>Back to list</button>
          )}
        </div>
      </div>

      {mode === 'list' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_,i) => (
              <div key={i} className="card h-40 animate-pulse" />
            ))
          ) : filtered.length ? (
            filtered.map(p => (
              <ProductCard key={p._id} p={p} onEdit={(pp)=>{ setEditing(pp); setMode('edit'); }} onDelete={handleDelete} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">No products</div>
          )}
        </div>
      )}

      {mode === 'create' && <ProductForm onSubmit={handleCreate} onCancel={()=>setMode('list')} />}
      {mode === 'edit' && editing && <ProductForm initial={editing} onSubmit={handleUpdate} onCancel={()=>{ setEditing(null); setMode('list'); }} />}
    </div>
  );
}