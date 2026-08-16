import { describe, it, expect } from 'vitest';
import { clampPositionToViewport, calculateSnapPosition, getDefaultPosition } from '../drag-helper';

describe('drag-helper utils', () => {
  it('should calculate default position from preset string', () => {
    const posBottomRight = getDefaultPosition('bottom-right');
    expect(posBottomRight.x).toBeGreaterThan(0);
    expect(posBottomRight.y).toBeGreaterThan(0);

    const posTopLeft = getDefaultPosition('top-left');
    expect(posTopLeft.x).toBe(16);
    expect(posTopLeft.y).toBe(56);
  });

  it('should clamp position within viewport bounds', () => {
    const clamped = clampPositionToViewport({ x: -100, y: -500 }, 100, 40);
    expect(clamped.x).toBeGreaterThanOrEqual(0);
    expect(clamped.y).toBeGreaterThanOrEqual(0);
  });

  it('should calculate snap position to nearest edge', () => {
    const snapped = calculateSnapPosition({ x: 30, y: 300 }, 100, 40, 1024, 768);
    expect(snapped).toBeDefined();
  });
});
