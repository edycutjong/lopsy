import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import RootLayout from './layout';

describe('RootLayout', () => {
  it('renders correctly', () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="child">child</div>
      </RootLayout>
    );
    expect(container).toBeTruthy();
  });
});
