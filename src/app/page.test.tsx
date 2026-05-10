import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from './page';
import { lopsyService } from '@/lib/lpagent';

vi.mock('@/lib/lpagent', () => ({
  lopsyService: {
    emergencyZapOut: vi.fn().mockResolvedValue(undefined),
  },
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders HeroLanding initially and enters dashboard', async () => {
    render(<Page />);
    
    // Wait for dynamic import of HeroLanding
    const initBtn = await screen.findByText('INITIALIZE MONITOR');
    expect(initBtn).toBeTruthy();

    // Click to enter dashboard
    fireEvent.click(initBtn);

    // Verify dashboard renders
    expect(screen.getByText('LOPSY')).toBeTruthy();
    expect(screen.getByText('EMERGENCY POSITION MONITOR :: V1.0.4')).toBeTruthy();

    // Verify active positions
    expect(screen.getByText('SOL-USDC')).toBeTruthy();
    
    // Test EMERGENCY ZAP-OUT button
    const zapBtns = screen.getAllByText('EMERGENCY ZAP-OUT');
    expect(zapBtns.length).toBeGreaterThan(0);
    
    fireEvent.click(zapBtns[0]);
    
    // Should show zapping status
    expect(screen.getByText('ZAPPING OUT...')).toBeTruthy();
    expect(lopsyService.emergencyZapOut).toHaveBeenCalledWith('pos_1', 'SOL-USDC');
    
    // Should show zapped status after promise resolves
    await waitFor(() => {
      expect(screen.getAllByText('EXTRACTED')).toBeTruthy();
    });
  });
});
