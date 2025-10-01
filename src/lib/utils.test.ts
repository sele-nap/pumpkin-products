import { formatPriceEUR } from './utils';

describe('formatPriceEUR', () => {
  it('formats numbers to EUR string', () => {
    expect(formatPriceEUR(5)).toBe('5.00 €');
    expect(formatPriceEUR(12.345)).toBe('12.35 €');
    expect(formatPriceEUR(0)).toBe('0.00 €');
  });
});
