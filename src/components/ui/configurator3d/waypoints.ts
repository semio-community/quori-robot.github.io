import type { ConfigurationSpecification, ModuleId, Vec3 } from "./types";
import {
  addVec3,
  boundsFromPositions,
  clampToBounds,
  isInsideBounds,
  normalizeVec3,
  scaleVec3,
  subVec3,
} from "./vec3";

function getOtherPositions(
  config: ConfigurationSpecification,
  excludeId: ModuleId,
): Vec3[] {
  return Object.entries(config.modulePositions ?? {}).flatMap(([id, pos]) => {
    if (id === excludeId || !pos) return [];
    return [pos as Vec3];
  });
}

export function computeEntryWaypoint(
  config: ConfigurationSpecification,
  moduleId: ModuleId,
  target: Vec3,
): Vec3 {
  const bounds = boundsFromPositions(getOtherPositions(config, moduleId));
  const distance = Math.max(0.9, (bounds?.diagonal ?? 0) * 0.35);

  if (!bounds || isInsideBounds(target, bounds)) {
    const fromY = (bounds?.max[1] ?? target[1]) + distance;
    return [target[0], fromY, target[2]];
  }

  const clamped = clampToBounds(target, bounds);
  const dir = normalizeVec3(subVec3(target, clamped));
  return addVec3(target, scaleVec3(dir, distance));
}

export function computeExitWaypoint(
  config: ConfigurationSpecification,
  moduleId: ModuleId,
  target: Vec3,
): Vec3 {
  const bounds = boundsFromPositions(getOtherPositions(config, moduleId));
  const distance = Math.max(1.15, (bounds?.diagonal ?? 0) * 0.55);

  if (!bounds || isInsideBounds(target, bounds)) {
    const toY = (bounds?.max[1] ?? target[1]) + distance;
    return [target[0], toY, target[2]];
  }

  const clamped = clampToBounds(target, bounds);
  const dir = normalizeVec3(subVec3(target, clamped));
  return addVec3(target, scaleVec3(dir, distance));
}
