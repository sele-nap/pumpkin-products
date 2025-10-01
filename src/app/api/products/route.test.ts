import { NextRequest } from 'next/server';
import { GET } from './route';

describe('GET /api/products', () => {
  it('returns 401 if not authenticated', async () => {
    const req = new NextRequest('http://localhost/api/products');
    const res = await GET(req);
    expect(res.status).toBe(401);
  });
});
