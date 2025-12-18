import React, { useMemo, useState } from "react";
import { clsx } from "clsx";
import type {
  ConfigurationEntry,
  ConfigurationId,
  ConfigurationSpecification,
  ModuleId,
  ModuleSpecification,
} from "./types";
import {
  areSetsEqual,
  isSubset,
  setDifferenceSize,
  setFromArray,
} from "./sets";

export function Configurator3DToggleControls({
  moduleList,
  configurationEntries,
  activeConfigurationId,
  activeConfiguration,
  activeModuleSet,
  setConfigurationId,
}: {
  moduleList: ModuleSpecification[];
  configurationEntries: ConfigurationEntry[];
  activeConfigurationId: ConfigurationId;
  activeConfiguration?: ConfigurationSpecification;
  activeModuleSet: Set<ModuleId>;
  setConfigurationId: (nextId: ConfigurationId) => void;
}) {
  const [hoveredModuleId, setHoveredModuleId] = useState<ModuleId | null>(null);

  const configurationIndex = useMemo(() => {
    return configurationEntries.map(({ id, cfg }) => ({
      id,
      name: cfg.name,
      moduleSet: setFromArray(Object.keys(cfg.modulePositions ?? {})),
      size: Object.keys(cfg.modulePositions ?? {}).length,
    }));
  }, [configurationEntries]);

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
  }, [activeConfigurationId, activeModuleSet, configurationIndex, hoveredModuleId]);

  const toggleModule = (moduleId: ModuleId) => {
    const nextId = getNextConfigurationId(moduleId);
    if (!nextId || nextId === activeConfigurationId) return;
    setConfigurationId(nextId);
  };

  return (
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
          const canToggle = Boolean(nextId) && nextId !== activeConfigurationId;
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
                setHoveredModuleId((prev) => (prev === module.id ? null : prev))
              }
              onFocus={() => setHoveredModuleId(module.id)}
              onBlur={() =>
                setHoveredModuleId((prev) => (prev === module.id ? null : prev))
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
                        locked ? "cursor-not-allowed" : "hover:bg-accent-two/15",
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
  );
}
