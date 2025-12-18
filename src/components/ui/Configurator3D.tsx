import { Canvas } from "@react-three/fiber";
import {
  PresentationControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import React, {
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { clsx } from "clsx";
import { animate, type AnimationPlaybackControlsWithThen } from "motion";
import type { Group, Material, Mesh } from "three";

// Object3D.DEFAULT_UP.set(0, 0, 1);
export type ModuleId = string;
export type ConfigurationId = string;

const DEFAULT_OFFSCREEN_POSITION: [number, number, number] = [0, 1000, 0];

export interface ModuleSpecification {
  id: ModuleId;
  name: string;
  model: ReactNode;
  preview?: ReactNode;
  previewImage?: string;
}

export interface ConfigurationSpecification {
  id: ConfigurationId;
  name: string;
  modulePositions: Partial<Record<ModuleId, [number, number, number]>>;
}

export interface Configurator3DProps {
  modules?: Record<ModuleId, ModuleSpecification>;
  configurations: Record<ConfigurationId, ConfigurationSpecification>;
  initialConfigurationId?: ConfigurationId;
  offscreenPosition?: [number, number, number];
  className?: string;
  worldOffset?: [number, number, number];
  /**
   * Sync the active configuration to a URL search param and read it on mount.
   * Useful for shareable links like `/features?config=base-torso-speaker`.
   */
  urlSync?: boolean;
  /**
   * Query param name to use when `urlSync` is enabled.
   */
  urlParam?: string;
  /**
   * History mode used when writing the URL on configuration changes.
   */
  urlHistoryMode?: "replace" | "push";
}

type Vec3 = [number, number, number];

type Bounds = {
  min: Vec3;
  max: Vec3;
  diagonal: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function boundsFromPositions(positions: Vec3[]): Bounds | null {
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

function clampToBounds(p: Vec3, bounds: Bounds): Vec3 {
  return [
    clamp(p[0], bounds.min[0], bounds.max[0]),
    clamp(p[1], bounds.min[1], bounds.max[1]),
    clamp(p[2], bounds.min[2], bounds.max[2]),
  ];
}

function isInsideBounds(p: Vec3, bounds: Bounds): boolean {
  return (
    p[0] >= bounds.min[0] &&
    p[0] <= bounds.max[0] &&
    p[1] >= bounds.min[1] &&
    p[1] <= bounds.max[1] &&
    p[2] >= bounds.min[2] &&
    p[2] <= bounds.max[2]
  );
}

function normalizeVec3(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]);
  if (len < 1e-6) return [0, 1, 0];
  return [v[0] / len, v[1] / len, v[2] / len];
}

function addVec3(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function subVec3(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scaleVec3(v: Vec3, s: number): Vec3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}

function getOtherPositions(
  config: ConfigurationSpecification,
  excludeId: ModuleId,
): Vec3[] {
  return Object.entries(config.modulePositions ?? {}).flatMap(([id, pos]) => {
    if (id === excludeId || !pos) return [];
    return [pos as Vec3];
  });
}

function computeEntryWaypoint(
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

function computeExitWaypoint(
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

function AnimatedModuleGroup({
  module,
  targetPosition,
  isPresent,
  enterFrom,
  exitVia,
  offscreenPosition,
}: {
  module: ModuleSpecification;
  targetPosition: Vec3;
  isPresent: boolean;
  enterFrom?: Vec3;
  exitVia?: Vec3;
  offscreenPosition: Vec3;
}) {
  const groupRef = useRef<Group | null>(null);
  const initialPositionRef = useRef<Vec3>(targetPosition);
  const hasMountedRef = useRef(false);
  const prevIsPresentRef = useRef(isPresent);
  const isPresentRef = useRef(isPresent);
  const animationTokenRef = useRef(0);
  const materialsRef = useRef<Material[]>([]);
  const opacityValueRef = useRef(isPresent ? 1 : 0);
  const controlsRef = useRef<{
    x?: AnimationPlaybackControlsWithThen;
    y?: AnimationPlaybackControlsWithThen;
    z?: AnimationPlaybackControlsWithThen;
    opacity?: AnimationPlaybackControlsWithThen;
  }>({});

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    if (materialsRef.current.length === 0) {
      const collected = new Set<Material>();
      group.traverse((obj) => {
        const mesh = obj as Mesh;
        if (!(mesh as unknown as { isMesh?: boolean }).isMesh) return;
        const currentMaterial = mesh.material;
        if (!currentMaterial) return;
        if (Array.isArray(currentMaterial)) {
          const clones = currentMaterial.map((material) => material.clone());
          mesh.material = clones;
          clones.forEach((material) => collected.add(material));
        } else {
          const clone = currentMaterial.clone();
          mesh.material = clone;
          collected.add(clone);
        }
      });

      materialsRef.current = Array.from(collected);
      const initialOpacity = isPresent ? 1 : 0;
      opacityValueRef.current = initialOpacity;
      for (const material of materialsRef.current) {
        material.transparent = true;
        material.opacity = initialOpacity;
      }
    }

    const setOpacity = (value: number) => {
      opacityValueRef.current = value;
      for (const material of materialsRef.current) {
        material.transparent = true;
        material.opacity = value;
      }
    };

    const prevIsPresent = prevIsPresentRef.current;
    prevIsPresentRef.current = isPresent;
    isPresentRef.current = isPresent;

    const [nextX, nextY, nextZ] = targetPosition;
    const entering = !prevIsPresent && isPresent;
    const exiting = prevIsPresent && !isPresent;

    if (!hasMountedRef.current) {
      group.position.set(nextX, nextY, nextZ);
      hasMountedRef.current = true;
      return;
    }

    if (entering) {
      const start = enterFrom ?? [nextX, nextY + 1, nextZ];
      setOpacity(0);
      group.position.set(start[0], start[1], start[2]);
    }

    controlsRef.current.x?.stop();
    controlsRef.current.y?.stop();
    controlsRef.current.z?.stop();
    controlsRef.current.opacity?.stop();

    const animationTarget = exiting && exitVia ? exitVia : targetPosition;

    const transition = {
      type: "spring" as const,
      stiffness: 220,
      damping: 26,
      mass: 0.8,
      restDelta: 0.001,
      restSpeed: 0.01,
    };

    const token = (animationTokenRef.current += 1);

    controlsRef.current.x = animate(group.position.x, animationTarget[0], {
      ...transition,
      onUpdate: (latest) => {
        const currentGroup = groupRef.current;
        if (currentGroup) currentGroup.position.x = latest;
      },
    });
    controlsRef.current.y = animate(group.position.y, animationTarget[1], {
      ...transition,
      onUpdate: (latest) => {
        const currentGroup = groupRef.current;
        if (currentGroup) currentGroup.position.y = latest;
      },
    });
    controlsRef.current.z = animate(group.position.z, animationTarget[2], {
      ...transition,
      onUpdate: (latest) => {
        const currentGroup = groupRef.current;
        if (currentGroup) currentGroup.position.z = latest;
      },
    });

    if (entering || exiting) {
      const targetOpacity = exiting ? 0 : 1;
      controlsRef.current.opacity = animate(
        opacityValueRef.current,
        targetOpacity,
        {
          duration: 0.28,
          ease: "easeOut",
          onUpdate: (latest) => setOpacity(latest),
        },
      );
    } else {
      setOpacity(isPresent ? 1 : 0);
    }

    if (exiting && exitVia) {
      const finished = [
        controlsRef.current.x?.finished,
        controlsRef.current.y?.finished,
        controlsRef.current.z?.finished,
        controlsRef.current.opacity?.finished,
      ].filter(Boolean) as Promise<unknown>[];

      Promise.all(finished)
        .then(() => {
          if (animationTokenRef.current !== token) return;
          if (isPresentRef.current) return;
          const currentGroup = groupRef.current;
          if (!currentGroup) return;
          setOpacity(0);
          currentGroup.position.set(
            offscreenPosition[0],
            offscreenPosition[1],
            offscreenPosition[2],
          );
        })
        .catch(() => {
          // Swallow cancellation errors.
        });
    }

    return () => {
      controlsRef.current.x?.stop();
      controlsRef.current.y?.stop();
      controlsRef.current.z?.stop();
      controlsRef.current.opacity?.stop();
    };
  }, [
    enterFrom?.[0],
    enterFrom?.[1],
    enterFrom?.[2],
    exitVia?.[0],
    exitVia?.[1],
    exitVia?.[2],
    isPresent,
    offscreenPosition[0],
    offscreenPosition[1],
    offscreenPosition[2],
    targetPosition[0],
    targetPosition[1],
    targetPosition[2],
  ]);

  return (
    <group ref={groupRef} position={initialPositionRef.current}>
      {module.model}
    </group>
  );
}

function isSubset<T>(subset: Set<T>, superset: Set<T>): boolean {
  for (const value of subset) {
    if (!superset.has(value)) return false;
  }
  return true;
}

function setDifferenceSize<T>(a: Set<T>, b: Set<T>): number {
  let count = 0;
  for (const value of a) {
    if (!b.has(value)) count += 1;
  }
  return count;
}

function areSetsEqual<T>(a: Set<T>, b: Set<T>): boolean {
  return a.size === b.size && isSubset(a, b);
}

function setFromArray<T>(items: T[]): Set<T> {
  return new Set(items);
}

export function Configurator3D({
  modules = {},
  configurations,
  initialConfigurationId,
  offscreenPosition = DEFAULT_OFFSCREEN_POSITION,
  className,
  worldOffset = [0, 0, 0],
  urlSync = false,
  urlParam = "config",
  urlHistoryMode = "replace",
}: Configurator3DProps) {
  const moduleList = useMemo(() => Object.values(modules), [modules]);
  const [hoveredModuleId, setHoveredModuleId] = useState<ModuleId | null>(null);

  const configurationEntries = useMemo(() => {
    return Object.entries(configurations).map(([id, cfg]) => {
      if (import.meta.env.DEV && cfg.id && cfg.id !== id) {
        console.warn(
          `[Configurator3D] Configuration key "${id}" has mismatched cfg.id "${cfg.id}". Using the key as the configuration id.`,
        );
      }
      return { id: id as ConfigurationId, cfg };
    });
  }, [configurations]);

  const defaultConfigurationId = useMemo(() => {
    if (initialConfigurationId && configurations[initialConfigurationId]) {
      return initialConfigurationId;
    }
    if (configurationEntries.length === 0) return "";
    const best = configurationEntries.reduce((acc, entry) => {
      if (!acc) return entry;
      const accSize = Object.keys(acc.cfg.modulePositions ?? {}).length;
      const cfgSize = Object.keys(entry.cfg.modulePositions ?? {}).length;
      return cfgSize > accSize ? entry : acc;
    }, configurationEntries[0]);
    return best?.id ?? configurationEntries[0]!.id;
  }, [configurationEntries, configurations, initialConfigurationId]);

  const [activeConfigurationId, setActiveConfigurationId] =
    useState<ConfigurationId>(defaultConfigurationId);

  const [enterFromByModule, setEnterFromByModule] = useState<
    Record<ModuleId, Vec3>
  >({});
  const [exitViaByModule, setExitViaByModule] = useState<
    Record<ModuleId, Vec3>
  >({});

  const lastDefaultConfigurationIdRef = useRef(defaultConfigurationId);
  const hasSyncedUrlOnMountRef = useRef(false);
  const hasReadUrlParamRef = useRef(false);

  const setConfigurationId = (nextId: ConfigurationId) => {
    if (!nextId || nextId === activeConfigurationId) return;

    const prevConfig = configurations[activeConfigurationId];
    const nextConfig = configurations[nextId];

    if (!prevConfig || !nextConfig) {
      setEnterFromByModule({});
      setExitViaByModule({});
      setActiveConfigurationId(nextId);
      return;
    }

    const entering: Record<ModuleId, Vec3> = {};
    const exiting: Record<ModuleId, Vec3> = {};

    for (const module of moduleList) {
      const prevTarget = prevConfig.modulePositions?.[module.id] as
        | Vec3
        | undefined;
      const nextTarget = nextConfig.modulePositions?.[module.id] as
        | Vec3
        | undefined;

      const wasOn = Boolean(prevTarget);
      const nowOn = Boolean(nextTarget);

      if (!wasOn && nowOn && nextTarget) {
        entering[module.id] = computeEntryWaypoint(
          nextConfig,
          module.id,
          nextTarget,
        );
      } else if (wasOn && !nowOn && prevTarget) {
        exiting[module.id] = computeExitWaypoint(
          prevConfig,
          module.id,
          prevTarget,
        );
      }
    }

    setEnterFromByModule(entering);
    setExitViaByModule(exiting);
    setActiveConfigurationId(nextId);
  };

  useEffect(() => {
    if (!urlSync) return;
    if (typeof window === "undefined") return;

    if (hasReadUrlParamRef.current) return;
    hasReadUrlParamRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const requested = params.get(urlParam);
    if (!requested) return;
    if (!configurations[requested as ConfigurationId]) return;

    setConfigurationId(requested as ConfigurationId);
  }, [configurations, urlParam, urlSync]);

  useEffect(() => {
    if (!defaultConfigurationId) return;
    const hasActive = Boolean(configurations[activeConfigurationId]);
    const defaultChanged =
      lastDefaultConfigurationIdRef.current !== defaultConfigurationId;
    if (!hasActive || defaultChanged) {
      lastDefaultConfigurationIdRef.current = defaultConfigurationId;
      setConfigurationId(defaultConfigurationId);
    }
  }, [activeConfigurationId, configurations, defaultConfigurationId]);

  useEffect(() => {
    if (!urlSync) return;
    if (typeof window === "undefined") return;

    if (!hasSyncedUrlOnMountRef.current) {
      hasSyncedUrlOnMountRef.current = true;
      return;
    }

    if (!activeConfigurationId) return;

    const url = new URL(window.location.href);
    if (url.searchParams.get(urlParam) === activeConfigurationId) return;
    url.searchParams.set(urlParam, activeConfigurationId);

    const next = url.toString();
    if (urlHistoryMode === "push") {
      window.history.pushState({}, "", next);
    } else {
      window.history.replaceState({}, "", next);
    }
  }, [activeConfigurationId, urlHistoryMode, urlParam, urlSync]);

  const configurationIndex = useMemo(() => {
    return configurationEntries.map(({ id, cfg }) => ({
      id,
      name: cfg.name,
      moduleSet: setFromArray(Object.keys(cfg.modulePositions ?? {})),
      size: Object.keys(cfg.modulePositions ?? {}).length,
    }));
  }, [configurationEntries]);

  const activeConfiguration = useMemo(() => {
    const direct = configurations[activeConfigurationId];
    if (direct) return direct;
    return configurationEntries[0]?.cfg;
  }, [activeConfigurationId, configurations, configurationEntries]);

  const activeModuleSet = useMemo(() => {
    return setFromArray(
      Object.keys(activeConfiguration?.modulePositions ?? {}),
    );
  }, [activeConfiguration]);

  const findMinimalSuperset = (desired: Set<ModuleId>) => {
    let best:
      | {
          id: ConfigurationId;
          name: string;
          size: number;
          moduleSet: Set<ModuleId>;
        }
      | undefined;
    for (const cfg of configurationIndex) {
      if (!isSubset(desired, cfg.moduleSet)) continue;
      if (!best || cfg.size < best.size) best = cfg;
    }
    return best;
  };

  const findMaximalSubset = (desired: Set<ModuleId>) => {
    let best:
      | {
          id: ConfigurationId;
          name: string;
          size: number;
          moduleSet: Set<ModuleId>;
        }
      | undefined;
    for (const cfg of configurationIndex) {
      if (!isSubset(cfg.moduleSet, desired)) continue;
      if (!best || cfg.size > best.size) best = cfg;
    }
    return best;
  };

  const findExactMatch = (desired: Set<ModuleId>) => {
    for (const cfg of configurationIndex) {
      if (areSetsEqual(cfg.moduleSet, desired)) return cfg;
    }
    return undefined;
  };

  const findBestToggleMatch = (
    moduleId: ModuleId,
    desired: Set<ModuleId>,
    turningOn: boolean,
  ) => {
    const exact = findExactMatch(desired);
    if (exact) return exact;

    if (turningOn) {
      const superset = findMinimalSuperset(desired);
      if (superset) return superset;

      // Fallback: choose the closest configuration that includes the module,
      // preferring to avoid removing currently-enabled modules.
      let best:
        | {
            id: ConfigurationId;
            name: string;
            size: number;
            moduleSet: Set<ModuleId>;
          }
        | undefined;
      let bestScore = Number.POSITIVE_INFINITY;

      for (const cfg of configurationIndex) {
        if (!cfg.moduleSet.has(moduleId)) continue;
        const removals = setDifferenceSize(activeModuleSet, cfg.moduleSet);
        const additions = setDifferenceSize(cfg.moduleSet, activeModuleSet);
        const score = removals * 1000 + additions;
        if (score < bestScore) {
          bestScore = score;
          best = cfg;
        }
      }

      return best;
    }

    const subset = findMaximalSubset(desired);
    if (subset) return subset;

    // Fallback: choose the closest configuration that excludes the module,
    // preferring to avoid adding new modules.
    let best:
      | {
          id: ConfigurationId;
          name: string;
          size: number;
          moduleSet: Set<ModuleId>;
        }
      | undefined;
    let bestScore = Number.POSITIVE_INFINITY;

    for (const cfg of configurationIndex) {
      if (cfg.moduleSet.has(moduleId)) continue;
      const removals = setDifferenceSize(activeModuleSet, cfg.moduleSet);
      const additions = setDifferenceSize(cfg.moduleSet, activeModuleSet);
      const score = additions * 1000 + removals;
      if (score < bestScore) {
        bestScore = score;
        best = cfg;
      }
    }

    return best;
  };

  const getNextConfigurationId = (moduleId: ModuleId) => {
    if (!activeConfiguration) return undefined;
    const isOn = activeModuleSet.has(moduleId);
    const desired = new Set(activeModuleSet);
    if (isOn) desired.delete(moduleId);
    else desired.add(moduleId);

    const next = findBestToggleMatch(moduleId, desired, !isOn);
    return next?.id;
  };

  const hoverPreview = useMemo(() => {
    if (!hoveredModuleId) return null;
    const nextId = getNextConfigurationId(hoveredModuleId);
    if (!nextId || nextId === activeConfigurationId) return null;

    const nextCfg = configurationIndex.find((cfg) => cfg.id === nextId);
    if (!nextCfg) return null;

    const added = new Set<ModuleId>();
    const removed = new Set<ModuleId>();
    for (const id of nextCfg.moduleSet) {
      if (!activeModuleSet.has(id)) added.add(id);
    }
    for (const id of activeModuleSet) {
      if (!nextCfg.moduleSet.has(id)) removed.add(id);
    }

    return { nextId, added, removed };
  }, [
    activeConfigurationId,
    activeModuleSet,
    configurationIndex,
    hoveredModuleId,
  ]);

  const toggleModule = (moduleId: ModuleId) => {
    const nextId = getNextConfigurationId(moduleId);
    if (!nextId || nextId === activeConfigurationId) return;
    setConfigurationId(nextId);
  };

  if (configurationEntries.length === 0) {
    return null;
  }

  return (
    <div className={clsx("w-full", className)}>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-color-600 dark:text-color-400 mb-1">
              Current configuration
            </p>
            <p className="text-lg font-semibold text-foreground">
              {activeConfiguration?.name}
            </p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1">
          {moduleList.map((module) => {
            const isOn = activeModuleSet.has(module.id);
            const nextId = getNextConfigurationId(module.id);
            const canToggle =
              Boolean(nextId) && nextId !== activeConfigurationId;
            const unavailable = !isOn && !canToggle;
            const locked = isOn && !canToggle;
            const disabled = unavailable || locked;
            const isHovered = hoveredModuleId === module.id;

            const previewAction = hoverPreview
              ? hoverPreview.added.has(module.id)
                ? "add"
                : hoverPreview.removed.has(module.id)
                  ? "remove"
                  : null
              : null;
            const showOverlay = Boolean(previewAction);
            const overlayIsPrimary = showOverlay && isHovered;
            const overlayBlurClass = showOverlay
              ? overlayIsPrimary
                ? "blur-[1.75px]"
                : "blur-[1.25px]"
              : "blur-0";

            return (
              <button
                key={module.id}
                type="button"
                onClick={() => toggleModule(module.id)}
                onMouseEnter={() => setHoveredModuleId(module.id)}
                onMouseLeave={() =>
                  setHoveredModuleId((prev) =>
                    prev === module.id ? null : prev,
                  )
                }
                onFocus={() => setHoveredModuleId(module.id)}
                onBlur={() =>
                  setHoveredModuleId((prev) =>
                    prev === module.id ? null : prev,
                  )
                }
                disabled={disabled}
                aria-pressed={isOn}
                title={module.name}
                className={clsx(
                  "group relative overflow-hidden flex-none w-24 h-24 rounded-xl border-2 transition-colors duration-150 focus:outline-none focus-visible:ring focus-visible:ring-accent-two/70",
                  unavailable
                    ? "border-border-subtle bg-surface/30 text-foreground/40 cursor-not-allowed"
                    : isOn
                      ? clsx(
                          "border-accent-two/60 bg-accent-two/10",
                          locked
                            ? "cursor-not-allowed"
                            : "hover:bg-accent-two/15",
                        )
                      : "border-border-subtle bg-surface/50 hover:bg-surface/80",
                  showOverlay && previewAction === "add"
                    ? "border-accent-two/70"
                    : null,
                  showOverlay && previewAction === "remove"
                    ? "border-accent-one/70"
                    : null,
                )}
              >
                <div
                  className={clsx(
                    "h-full w-full flex flex-col items-center justify-center gap-2 px-2 transition-[filter] duration-150",
                    overlayBlurClass,
                  )}
                >
                  <div
                    className={clsx(
                      "h-10 w-10 flex items-center justify-center overflow-hidden text-foreground",
                    )}
                  >
                    {module.previewImage ? (
                      <img
                        src={module.previewImage}
                        alt=""
                        className="h-full w-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : module.preview ? (
                      module.preview
                    ) : (
                      <span className="text-sm font-semibold text-foreground">
                        {module.name.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-medium leading-tight text-foreground text-center line-clamp-2">
                    {module.name}
                  </span>
                </div>

                <div
                  className={clsx(
                    "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-out",
                    showOverlay ? "opacity-100" : "opacity-0",
                  )}
                >
                  <div
                    className={clsx(
                      "absolute inset-0 backdrop-blur-sm transition-colors duration-150 ease-out",
                      overlayIsPrimary
                        ? "bg-surface/40 dark:bg-surface/30"
                        : "bg-surface/30 dark:bg-surface/20",
                    )}
                  />
                  <div
                    className={clsx(
                      "relative h-12 w-12 rounded-full border shadow-sm flex items-center justify-center transition-transform duration-150 ease-out will-change-transform",
                      previewAction === "add"
                        ? "bg-accent-two text-white border-accent-two/70"
                        : previewAction === "remove"
                          ? "bg-accent-one text-white border-accent-one/70"
                          : "bg-surface text-foreground border-border-subtle",
                      overlayIsPrimary ? "scale-100" : "scale-[0.9]",
                    )}
                  >
                    {previewAction === "add" ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-7 w-7"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    ) : previewAction === "remove" ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-7 w-7"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    ) : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full h-[500px] rounded-xl border border-border-subtle bg-special-lighter/60 overflow-hidden">
        <Canvas shadows>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            shadow-mapSize={2048}
            castShadow
          />
          <PresentationControls
            global
            damping={0.2}
            snap={true}
            rotation={[0.1, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <group position={worldOffset}>
              {Object.entries(modules).map(([key, module]) => {
                const position =
                  activeConfiguration?.modulePositions?.[module.id] ??
                  undefined;
                const resolvedPosition = (position ??
                  offscreenPosition) as Vec3;
                const isPresent = activeModuleSet.has(module.id);
                return (
                  <React.Suspense key={key} fallback={null}>
                    <AnimatedModuleGroup
                      module={module}
                      targetPosition={resolvedPosition}
                      isPresent={isPresent}
                      enterFrom={enterFromByModule[module.id]}
                      exitVia={exitViaByModule[module.id]}
                      offscreenPosition={offscreenPosition as Vec3}
                    />
                  </React.Suspense>
                );
              })}
            </group>
          </PresentationControls>
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.75}
            scale={10}
            blur={3}
            far={4}
          />
          <Environment preset="city" />
        </Canvas>
      </div>
    </div>
  );
}
