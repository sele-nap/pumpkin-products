'use client';
import { useState } from 'react';
import type { Product, ProductInput } from '@/types';

export default function ProductForm({
  initial,
  onSubmit,
  onCancel,
  submitting = false,
}: {
  initial?: Product | null;
  onSubmit: (payload: ProductInput) => Promise<void> | void;
  onCancel: () => void;
  submitting?: boolean;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={submit} className="card space-y-3 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g., Cinderella"
          className="input w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Variety
        </label>
        <input
          type="text"
          name="variety"
          value={form.variety}
          onChange={handleChange}
          placeholder="e.g., Muscat"
          className="input w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <input
          type="text"
          name="color"
          value={form.color}
          onChange={handleChange}
          placeholder="e.g., Orange"
          className="input w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weightKg"
            value={form.weightKg}
            onChange={handleChange}
            placeholder="e.g., 5.5"
            step="0.01"
            min="0"
            className="input w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (€)
          </label>
          <input
            type="number"
            name="priceEUR"
            value={form.priceEUR}
            onChange={handleChange}
            placeholder="e.g., 9.99"
            step="0.01"
            min="0"
            className="input w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="input w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your pumpkin..."
          className="input w-full min-h-24 resize-none"
        />
      </div>

      <div className="flex gap-2">
        <button 
          className="btn btn-primary" 
          type="submit"
          disabled={submitting}
        >
          {submitting 
            ? (initial ? 'Saving...' : 'Creating...') 
            : (initial ? 'Save changes' : 'Create')
          }
        </button>
        <button 
          className="btn" 
          type="button" 
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}