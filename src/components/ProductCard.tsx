'use client';
import type { Product } from '@/types';


export default function ProductCard({ p, onEdit, onDelete }: { p: Product; onEdit: (p: Product) => void; onDelete: (id: string) => void; }) {
  return (
    <div className="card p-4">
      <div className="flex items-start gap-4">
        <img src={p.imageUrl || 'https://picsum.photos/seed/pumpkin/120/120'} alt={p.name} className="h-24 w-24 rounded-xl2 object-cover" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
          <p className="text-sm text-gray-600">{p.variety || '—'} · {p.color || '—'} · {p.weightKg ?? 0} kg</p>
          {p.description && <p className="mt-1 text-sm text-gray-700 line-clamp-2">{p.description}</p>}
          <div className="mt-3 flex items-center justify-between">
            <span className="rounded-xl2 bg-pumpkin-100 px-2 py-1 text-sm text-pumpkin-700">{(p.priceEUR ?? 0).toFixed(2)} €</span>
            <div className="flex gap-2">
              <button className="btn btn-secondary" onClick={() => onEdit(p)}>Edit</button>
              {p._id && <button className="btn bg-red-500 text-white hover:bg-red-600" onClick={() => onDelete(p._id!)}>Delete</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}