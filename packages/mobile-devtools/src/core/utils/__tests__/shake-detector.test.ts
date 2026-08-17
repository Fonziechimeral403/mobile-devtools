import { describe, expect, it, vi } from 'vitest';
import { ShakeDetector } from '../shake-detector';

describe('ShakeDetector', () => {
  it('should trigger onShake when linear motion magnitude exceeds threshold', () => {
    const onShake = vi.fn();
    const detector = new ShakeDetector({ threshold: 10, cooldown: 500, onShake });

    // Initial motion event (establishes baseline gravity: 0, 0, 9.8)
    detector.handleMotion({
      accelerationIncludingGravity: { x: 0, y: 0, z: 9.8 },
    } as any);

    expect(onShake).not.toHaveBeenCalled();

    // High dynamic acceleration event (linear motion spike)
    detector.handleMotion({
      accelerationIncludingGravity: { x: 15, y: 15, z: 25 },
    } as any);

    expect(onShake).toHaveBeenCalledTimes(1);
  });

  it('should respect cooldown period between shakes', () => {
    const onShake = vi.fn();
    const detector = new ShakeDetector({ threshold: 5, cooldown: 1000, onShake });

    detector.handleMotion({
      accelerationIncludingGravity: { x: 0, y: 0, z: 0 },
    } as any);

    detector.handleMotion({
      accelerationIncludingGravity: { x: 10, y: 10, z: 10 },
    } as any);

    expect(onShake).toHaveBeenCalledTimes(1);

    // Immediate second shake within cooldown window
    detector.handleMotion({
      accelerationIncludingGravity: { x: 20, y: 20, z: 20 },
    } as any);

    expect(onShake).toHaveBeenCalledTimes(1);
  });
});
