import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AboutPage from './page';

describe('About Page', () => {
  it('renders correctly', () => {
    const { container } = render(<AboutPage />);
    expect(container).toBeTruthy();
  });
});
