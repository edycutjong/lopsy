import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('Health API', () => {
  it('returns healthy status', async () => {
    const response = await GET();
    const data = await response.json();
    expect(data.status).toBe('ok');
    expect(response.status).toBe(200);
  });
});
