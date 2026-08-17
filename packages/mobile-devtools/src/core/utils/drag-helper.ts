import { BADGE_POSITIONS, BadgePositionPreset } from '../constants';
import { isBrowser, isServer } from './env';

/**
 * 2D Screen coordinates for dragging elements.
 */
export interface DragPosition {
  x: number;
  y: number;
}

/**
 * Viewport boundaries for constraining drag interactions.
 */
export interface DragBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/**
 * Clamps coordinates within the visible screen viewport.
 * @param pos Current drag position.
 * @param elementWidth Width of element.
 * @param elementHeight Height of element.
 * @param margin Minimum edge margin.
 * @returns Clamped DragPosition coordinates.
 */
export function clampPositionToViewport(
  pos: DragPosition,
  elementWidth = 125,
  elementHeight = 38,
  margin = 16
): DragPosition {
  if (isServer) return pos;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const maxX = Math.max(margin, vw - elementWidth - margin);
  const maxY = Math.max(margin, vh - elementHeight - margin);

  return {
    x: Math.max(margin, Math.min(maxX, pos.x)),
    y: Math.max(margin, Math.min(maxY, pos.y)),
  };
}

/**
 * Calculates snapped X/Y position to snap floating badge to the left or right screen edge.
 * @param currentPos Current drag position.
 * @param elementWidth Element width.
 * @param elementHeight Element height.
 * @param viewportWidth Screen viewport width.
 * @param viewportHeight Screen viewport height.
 * @param margin Edge padding margin.
 * @returns Snapped DragPosition coordinates.
 */
export function calculateSnapPosition(
  currentPos: DragPosition,
  elementWidth: number,
  elementHeight: number,
  viewportWidth: number,
  viewportHeight: number,
  margin = 16
): DragPosition {
  const midX = viewportWidth / 2;
  const targetX = currentPos.x < midX ? margin : viewportWidth - elementWidth - margin;

  // Constrain Y within viewport boundaries
  const clampedY = Math.max(
    margin,
    Math.min(viewportHeight - elementHeight - margin, currentPos.y)
  );

  return {
    x: Math.round(targetX),
    y: Math.round(clampedY),
  };
}

/**
 * Computes default screen pixel coordinates based on a position preset (e.g. 'bottom-right').
 * @param positionPreset Position preset string or custom coordinates.
 * @param badgeWidth Badge element width.
 * @param badgeHeight Badge element height.
 * @param margin Edge margin padding.
 * @returns Calculated DragPosition.
 */
export function getDefaultPosition(
  positionPreset: BadgePositionPreset | DragPosition = BADGE_POSITIONS.BOTTOM_RIGHT,
  badgeWidth = 125,
  badgeHeight = 38,
  margin = 16
): DragPosition {
  if (typeof positionPreset === 'object' && positionPreset !== null) {
    return clampPositionToViewport(positionPreset, badgeWidth, badgeHeight, margin);
  }

  const vw = isBrowser ? window.innerWidth : 375;
  const vh = isBrowser ? window.innerHeight : 667;

  switch (positionPreset) {
    case BADGE_POSITIONS.TOP_LEFT:
      return { x: margin, y: margin + 40 };

    case BADGE_POSITIONS.TOP_RIGHT:
      return { x: vw - badgeWidth - margin, y: margin + 40 };

    case BADGE_POSITIONS.BOTTOM_LEFT:
      return { x: margin, y: vh - badgeHeight - margin - 20 };

    case BADGE_POSITIONS.TOP:
      return { x: Math.round((vw - badgeWidth) / 2), y: margin + 40 };

    case BADGE_POSITIONS.BOTTOM:
      return { x: Math.round((vw - badgeWidth) / 2), y: vh - badgeHeight - margin - 20 };

    case BADGE_POSITIONS.LEFT:
      return { x: margin, y: Math.round((vh - badgeHeight) / 2) };

    case BADGE_POSITIONS.RIGHT:
      return { x: vw - badgeWidth - margin, y: Math.round((vh - badgeHeight) / 2) };

    case BADGE_POSITIONS.BOTTOM_RIGHT:
    default:
      return { x: vw - badgeWidth - margin, y: vh - badgeHeight - margin - 20 };
  }
}
