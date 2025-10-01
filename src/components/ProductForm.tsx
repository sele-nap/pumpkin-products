'use client';
import { useEffect, useState } from 'react';
import type { Product } from '@/types';


export default function ProductForm({ initial, onSubmit, onCancel }: { initial?: Product; onSubmit: (p: Product) => void; onCancel: () => void; }) {
  const [form, setForm] = useState<Product>(initial ?? { name: '', priceEUR: 0 });
  useEffect(() => { setForm(initial ?? { name: '', priceEUR: 0 }); }, [initial]);
  const update = (k: keyof Product, v: any) => setForm(f => ({ ...f, [k]: v }));


  return (
    <div className="card p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Name</label>
          <input className="input" value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Rouge Vif d’Étampes" />
        </div>
        <div>
          <label className="label">Variety</label>
          <input className="input" value={form.variety || ''} onChange={e => update('variety', e.target.value)} placeholder="Hokkaido, Butternut…" />
        </div>
        <div>
          <label className="label">Color</label>
          <input className="input" value={form.color || ''} onChange={e => update('color', e.target.value)} placeholder="Orange, green, white…" />
        </div>
        <div>
          <label className="label">Weight (kg)</label>
          <input type="number" step="0.01" className="input" value={form.weightKg ?? 0} onChange={e => update('weightKg', parseFloat(e.target.value))} />
        </div>
        <div>
          <label className="label">Price (€)</label>
          <input type="number" step="0.01" className="input" value={form.priceEUR ?? 0} onChange={e => update('priceEUR', parseFloat(e.target.value))} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Image (URL)</label>
          <input className="input" value={form.imageUrl || ''} onChange={e => update('imageUrl', e.target.value)} placeholder="https://…" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Description</label>
          <textarea className="input min-h-[90px]" value={form.description || ''} onChange={e => update('description', e.target.value)} />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button className="btn" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSubmit(form)}>{initial ? 'Save' : 'Add'}</button>
      </div>
    </div>
  );
}