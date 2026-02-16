'use client';
import type { Product } from '@/types';

export default function ProductCard({
  p,
  onEdit,
  onDelete,
}: {
  p: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="card relative p-4">
      {p.id && (
        <button
          onClick={() => onDelete(p.id!)}
          className="absolute right-3 top-3 rounded-full bg-red-200 px-2 py-1 text-sm font-semibold text-red-600 hover:bg-red-300 transition"
        >
          ✕
        </button>
      )}

      <div className="flex items-start gap-4">
        <img
          src={p.imageUrl || 'https://blocks.astratic.com/img/general-img-square.png'}
          alt={p.name}
          className="h-24 w-24 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
          <p className="text-sm text-gray-600">
            {p.variety || '—'} · {p.color || '—'} · {p.weightKg ?? 0} kg
          </p>
          {p.description && (
            <p className="mt-1 text-sm text-gray-700 line-clamp-2">
              {p.description}
            </p>
          )}
          <div className="mt-3 flex items-center justify-between">
            <span className="rounded-xl bg-pumpkin-100 px-2 py-1 text-sm text-pumpkin-700">
              {(p.priceEUR ?? 0).toFixed(2)} €
            </span>
            <button
              className="rounded-lg bg-green-200 px-3 py-1 text-sm font-medium text-green-700 hover:bg-green-300 transition"
              onClick={() => onEdit(p)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}