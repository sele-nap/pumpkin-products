'use client';
import { useState } from 'react';
import type { Product, ProductInput } from '@/types';

export default function ProductForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Product | null;
  onSubmit: (payload: ProductInput) => Promise<void> | void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    variety: initial?.variety ?? '',
    color: initial?.color ?? '',
    weightKg: initial?.weightKg?.toString() ?? '',
    priceEUR: initial?.priceEUR?.toString() ?? '',
    imageUrl: initial?.imageUrl ?? '',
    description: initial?.description ?? '',
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toNum = (v: string) => (v.trim() === '' ? null : Number(v));
    const toStr = (v: string) => (v.trim() === '' ? null : v.trim());

    const payload: ProductInput = {
      name: form.name.trim(),
      variety: toStr(form.variety),
      color: toStr(form.color),
      weightKg: toNum(form.weightKg),
      priceEUR: toNum(form.priceEUR),
      imageUrl: toStr(form.imageUrl),
      description: toStr(form.description),
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="card space-y-3 p-4">
      {/* ... tes inputs (inchangés) ... */}
      <div className="flex gap-2">
        <button className="btn btn-primary" type="submit">
          {initial ? 'Save changes' : 'Create'}
        </button>
        <button className="btn" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}