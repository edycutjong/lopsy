import { describe, it, expect, vi, beforeEach, Mock, afterEach } from 'vitest';
import { LopsyMonitor } from './lpagent';
import { createLPAgent } from '@mnm-ag/lp-agent-sdk';

vi.mock('@mnm-ag/lp-agent-sdk', () => ({
  createLPAgent: vi.fn()
}));

describe('LopsyMonitor', () => {
  let monitor: LopsyMonitor;
  let mockAgent: { withdrawLiquidity: Mock };

  beforeEach(() => {
    vi.clearAllMocks();
    monitor = new LopsyMonitor();
    mockAgent = {
      withdrawLiquidity: vi.fn().mockResolvedValue(undefined)
    };
    (createLPAgent as Mock).mockResolvedValue(mockAgent);
    
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('init', () => {
    it('should initialize successfully', async () => {
      await monitor.init('test_key');
      expect(createLPAgent).toHaveBeenCalledWith({ apiKey: 'test_key' });
      expect(console.log).toHaveBeenCalledWith("[LPAgent SDK] Initialized with key");
    });

    it('should skip initialization if already initialized', async () => {
      await monitor.init('test_key');
      await monitor.init('test_key_2');
      expect(createLPAgent).toHaveBeenCalledTimes(1);
    });

    it('should handle initialization failure', async () => {
      (createLPAgent as Mock).mockRejectedValue(new Error('init failed'));
      await monitor.init('test_key');
      expect(console.warn).toHaveBeenCalledWith("[LPAgent SDK] Failed to initialize real SDK, falling back to read-only.");
    });
  });

  describe('emergencyZapOut', () => {
    it('should use default api key if env var is not set', async () => {
      delete process.env.NEXT_PUBLIC_LPAGENT_API_KEY;
      await monitor.emergencyZapOut('pos_1', 'pool_1');
      expect(createLPAgent).toHaveBeenCalledWith({ apiKey: 'demo_key' });
    });

    it('should use env var api key if set', async () => {
      process.env.NEXT_PUBLIC_LPAGENT_API_KEY = 'env_key';
      await monitor.emergencyZapOut('pos_1', 'pool_1');
      expect(createLPAgent).toHaveBeenCalledWith({ apiKey: 'env_key' });
      delete process.env.NEXT_PUBLIC_LPAGENT_API_KEY;
    });

    it('should successfully extract liquidity', async () => {
      const result = await monitor.emergencyZapOut('pos_1', 'pool_1');
      expect(mockAgent.withdrawLiquidity).toHaveBeenCalledWith('pos_1', 'pool_1');
      expect(console.log).toHaveBeenCalledWith("[LPAgent SDK] Successfully extracted liquidity for pos_1");
      expect(result).toBe(true);
    });

    it('should handle extraction failure', async () => {
      const err = new Error('withdraw failed');
      mockAgent.withdrawLiquidity.mockRejectedValue(err);
      const result = await monitor.emergencyZapOut('pos_1', 'pool_1');
      expect(console.error).toHaveBeenCalledWith("[LPAgent SDK] Zap out failed for pos_1:", err);
      expect(result).toBe(false);
    });

    it('should simulate extraction if agent is not available', async () => {
      (createLPAgent as Mock).mockRejectedValue(new Error('init failed'));
      const promise = monitor.emergencyZapOut('pos_1', 'pool_1');
      
      // We need to await the microtasks first before advancing timers
      // to ensure the init promise rejects and the setTimeout is queued
      await Promise.resolve();
      await Promise.resolve();
      
      vi.advanceTimersByTime(2500);
      const result = await promise;
      expect(console.log).toHaveBeenCalledWith("[LPAgent SDK] Simulated successful extraction for pos_1");
      expect(result).toBe(true);
    });
  });
});
