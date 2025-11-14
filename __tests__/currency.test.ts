import { formatNGN } from '@/utils/currency';

describe('currency formatter', () => {
  it('formats amounts in naira', () => {
    expect(formatNGN(15000)).toBe('₦15,000');
  });
});
