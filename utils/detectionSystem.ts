export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function isInVisionCone(
  playerX: number,
  playerY: number,
  npcX: number,
  npcY: number,
  npcDirection: number,
  visionRange: number,
  visionAngle: number
): boolean {
  const dx = playerX - npcX;
  const dy = playerY - npcY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > visionRange) {
    return false;
  }

  const angleToPlayer = Math.atan2(dy, dx) * (180 / Math.PI);
  const npcAngle = npcDirection > 0 ? 0 : 180;

  let angleDiff = Math.abs(angleToPlayer - npcAngle);
  if (angleDiff > 180) {
    angleDiff = 360 - angleDiff;
  }

  return angleDiff <= visionAngle / 2;
}

export function lineIntersectsRect(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  rectX: number,
  rectY: number,
  rectWidth: number,
  rectHeight: number
): boolean {
  const left = rectX - rectWidth / 2;
  const right = rectX + rectWidth / 2;
  const top = rectY - rectHeight / 2;
  const bottom = rectY + rectHeight / 2;

  const lineIntersectsSegment = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ): boolean => {
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom === 0) return false;

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
  };

  return (
    lineIntersectsSegment(x1, y1, x2, y2, left, top, right, top) ||
    lineIntersectsSegment(x1, y1, x2, y2, right, top, right, bottom) ||
    lineIntersectsSegment(x1, y1, x2, y2, right, bottom, left, bottom) ||
    lineIntersectsSegment(x1, y1, x2, y2, left, bottom, left, top)
  );
}

export function hasLineOfSight(
  playerX: number,
  playerY: number,
  npcX: number,
  npcY: number,
  obstacles: Obstacle[]
): boolean {
  for (const obstacle of obstacles) {
    if (
      lineIntersectsRect(
        playerX,
        playerY,
        npcX,
        npcY,
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
      )
    ) {
      return false;
    }
  }
  return true;
}

export function calculateDetectionLevel(
  isInVision: boolean,
  hasLOS: boolean,
  currentLevel: number,
  detectionSpeed: number,
  deltaTime: number = 16
): number {
  if (isInVision && hasLOS) {
    return Math.min(100, currentLevel + (detectionSpeed * deltaTime));
  } else {
    return Math.max(0, currentLevel - (detectionSpeed * deltaTime * 2));
  }
}
