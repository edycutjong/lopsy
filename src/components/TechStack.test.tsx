import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TechStack } from './TechStack';

describe('TechStack', () => {
  it('renders correctly', () => {
    const { container } = render(<TechStack />);
    expect(container).toBeTruthy();
  });
});
