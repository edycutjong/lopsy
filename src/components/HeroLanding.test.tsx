import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { HeroLanding } from './HeroLanding';

describe('HeroLanding', () => {
  it('renders and clicks', () => {
    const onEnter = vi.fn();
    render(<HeroLanding onEnter={onEnter} />);
    const button = screen.getByRole('button', { name: /INITIALIZE/i });
    fireEvent.click(button);
    expect(onEnter).toHaveBeenCalled();
  });
});
