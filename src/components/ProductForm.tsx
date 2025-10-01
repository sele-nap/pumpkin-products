'use client';
import { useEffect, useState } from 'react';
import type { Product } from '@/types';

type FormState = {
  name: string;
  variety: string;
  color: string;
  weightKg: string;
  priceEUR: string;
  description: string;
  imageUrl: string;
};

function toFormState(p?: Product): FormState {
  return {
    name: p?.name ?? '',
    variety: p?.variety ?? '',
    color: p?.color ?? '',
    weightKg: p?.weightKg !== undefined && p?.weightKg !== null ? String(p.weightKg) : '',
    priceEUR: p?.priceEUR !== undefined && p?.priceEUR !== null ? String(p.priceEUR) : '',
    description: p?.description ?? '',
    imageUrl: p?.imageUrl ?? '',
  };
}

export default function ProductForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Product;
  onSubmit: (p: Product) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<FormState>(toFormState(initial));

  useEffect(() => {
    setForm(toFormState(initial));
  }, [initial]);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    const weight =
      form.weightKg.trim() === '' ? undefined : Number(form.weightKg);
    const price =
      form.priceEUR.trim() === '' ? undefined : Number(form.priceEUR);

    const payload: Product = {
      name: form.name.trim(),
      variety: form.variety.trim() || undefined,
      color: form.color.trim() || undefined,
      weightKg: Number.isFinite(weight!) ? (weight as number) : undefined,
      priceEUR: Number.isFinite(price!) ? (price as number) : undefined,
      description: form.description.trim() || undefined,
      imageUrl: form.imageUrl.trim() || undefined,
    };

    onSubmit(payload);
  };

  return (
    <div className="card p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Name</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="e.g. Rouge Vif d’Étampes"
          />
        </div>
        <div>
          <label className="label">Variety</label>
          <input
            className="input"
            value={form.variety}
            onChange={(e) => update('variety', e.target.value)}
            placeholder="Hokkaido, Butternut…"
          />
        </div>
        <div>
          <label className="label">Color</label>
          <input
            className="input"
            value={form.color}
            onChange={(e) => update('color', e.target.value)}
            placeholder="Orange, green, white…"
          />
        </div>
        <div>
          <label className="label">Weight (kg)</label>
          <input
            type="number"
            step="0.01"
            className="input"
            value={form.weightKg}
            onChange={(e) => update('weightKg', e.target.value)}
            placeholder="e.g. 2.5"
            inputMode="decimal"
          />
        </div>
        <div>
          <label className="label">Price (€)</label>
          <input
            type="number"
            step="0.01"
            className="input"
            value={form.priceEUR}
            onChange={(e) => update('priceEUR', e.target.value)}
            placeholder="e.g. 8.90"
            inputMode="decimal"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Image (URL)</label>
          <input
            className="input"
            value={form.imageUrl}
            onChange={(e) => update('imageUrl', e.target.value)}
            placeholder="https://…"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Description</label>
          <textarea
            className="input min-h-[90px]"
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button className="btn" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          {initial ? 'Save' : 'Add'}
        </button>
      </div>
    </div>
  );
}