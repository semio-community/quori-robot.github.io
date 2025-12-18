import type { Vec3 } from "./types";

export type Bounds = {
  min: Vec3;
  max: Vec3;
  diagonal: number;
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function boundsFromPositions(positions: Vec3[]): Bounds | null {
  if (positions.length === 0) return null;
  let minX = positions[0]![0];
  let minY = positions[0]![1];
  let minZ = positions[0]![2];
  let maxX = positions[0]![0];
  let maxY = positions[0]![1];
  let maxZ = positions[0]![2];

  for (const [x, y, z] of positions) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  }

  const dx = maxX - minX;
  const dy = maxY - minY;
  const dz = maxZ - minZ;

  return {
    min: [minX, minY, minZ],
    max: [maxX, maxY, maxZ],
    diagonal: Math.hypot(dx, dy, dz),
  };
}

export function clampToBounds(p: Vec3, bounds: Bounds): Vec3 {
  return [
    clamp(p[0], bounds.min[0], bounds.max[0]),
    clamp(p[1], bounds.min[1], bounds.max[1]),
    clamp(p[2], bounds.min[2], bounds.max[2]),
  ];
}

export function isInsideBounds(p: Vec3, bounds: Bounds): boolean {
  return (
    p[0] >= bounds.min[0] &&
    p[0] <= bounds.max[0] &&
    p[1] >= bounds.min[1] &&
    p[1] <= bounds.max[1] &&
    p[2] >= bounds.min[2] &&
    p[2] <= bounds.max[2]
  );
}

export function normalizeVec3(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]);
  if (len < 1e-6) return [0, 1, 0];
  return [v[0] / len, v[1] / len, v[2] / len];
}

export function addVec3(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

export function subVec3(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

export function scaleVec3(v: Vec3, s: number): Vec3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}
