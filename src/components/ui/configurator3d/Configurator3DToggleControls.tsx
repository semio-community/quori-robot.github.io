import React, { useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import * as ScrollArea from "@radix-ui/react-scroll-area";
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
import { Configurator3DModuleToggleButton } from "./Configurator3DModuleToggleButton";

type PreviewAction = "add" | "remove" | null;

function renderActionGlyph(action: Exclude<PreviewAction, null>) {
  if (action === "add") {
    return (
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
    );
  }

  return (
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
  );
}

function renderCheckGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function renderInfoGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}

function renderChevronGlyph(direction: "left" | "right") {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

function renderModulePreview(module: ModuleSpecification) {
  if (module.previewImage) {
    return (
      <img
        src={module.previewImage}
        alt=""
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    );
  }
  if (module.preview) return module.preview;
  return (
    <span className="text-sm font-semibold text-foreground">
      {module.name.slice(0, 1).toUpperCase()}
    </span>
  );
}

export function Configurator3DToggleControls({
  className,
  moduleList,
  configurationEntries,
  activeConfigurationId,
  activeConfiguration,
  activeModuleSet,
  setConfigurationId,
}: {
  className?: string;
  moduleList: ModuleSpecification[];
  configurationEntries: ConfigurationEntry[];
  activeConfigurationId: ConfigurationId;
  activeConfiguration?: ConfigurationSpecification;
  activeModuleSet: Set<ModuleId>;
  setConfigurationId: (nextId: ConfigurationId) => void;
}) {
  const [hoveredModuleId, setHoveredModuleId] = useState<ModuleId | null>(null);
  const [desktopExpanded, setDesktopExpanded] = useState(true);
  const lastPreviewActionByModuleRef = useRef<
    Partial<Record<ModuleId, Exclude<PreviewAction, null>>>
  >({});

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

  const getToggleState = (module: ModuleSpecification) => {
    const isOn = activeModuleSet.has(module.id);
    const nextId = getNextConfigurationId(module.id);
    const canToggle = Boolean(nextId) && nextId !== activeConfigurationId;
    const locked = isOn && !canToggle;
    const disabled = (!isOn && !canToggle) || locked;

    const previewAction: PreviewAction = hoverPreview
      ? hoverPreview.added.has(module.id)
        ? "add"
        : hoverPreview.removed.has(module.id)
          ? "remove"
          : null
      : null;
    const showOverlay = Boolean(previewAction);
    const displayedPreviewAction =
      previewAction ?? lastPreviewActionByModuleRef.current[module.id] ?? null;

    if (previewAction) {
      lastPreviewActionByModuleRef.current[module.id] = previewAction;
    }

    const actionBadgeClassName =
      displayedPreviewAction === "add"
        ? "bg-accent-three text-white border-accent-three/70"
        : displayedPreviewAction === "remove"
          ? "bg-accent-one text-white border-accent-one/70"
          : "bg-surface text-foreground border-border-subtle";

    return {
      isOn,
      disabled,
      locked,
      showOverlay,
      displayedPreviewAction,
      actionBadgeClassName,
    };
  };

  return (
    <div className={clsx("w-full lg:w-auto", className)}>
      {/* Mobile: horizontal toggles below the canvas */}
      <div className="lg:hidden flex flex-col gap-3">
        {/*<div className="rounded-xl border border-border-subtle bg-special-lighter/60 p-4">
          <p className="text-xs uppercase tracking-wide text-color-600 dark:text-color-400 mb-1">
            Current configuration
          </p>
          <p className="text-lg font-semibold text-foreground">
            {activeConfiguration?.name}
          </p>
        </div>*/}

        <div className="border-t border-border-subtle rounded-b-xl overflow-clip">
          <div className="relative">
            <ScrollArea.Root>
              <ScrollArea.Viewport className="w-full">
                <div className="flex w-max min-w-full justify-center">
                  {moduleList.map((module) => {
                    const state = getToggleState(module);
                    return (
                      <Configurator3DModuleToggleButton
                        key={module.id}
                        module={module}
                        variant="square"
                        sizeClassName="w-24 h-24"
                        isOn={state.isOn}
                        disabled={state.disabled}
                        locked={state.locked}
                        showOverlay={state.showOverlay}
                        actionBadgeClassName={state.actionBadgeClassName}
                        preview={renderModulePreview(module)}
                        actionGlyph={
                          state.displayedPreviewAction
                            ? renderActionGlyph(state.displayedPreviewAction)
                            : null
                        }
                        onToggle={() => toggleModule(module.id)}
                        onHoverStart={() => setHoveredModuleId(module.id)}
                        onHoverEnd={() =>
                          setHoveredModuleId((prev) =>
                            prev === module.id ? null : prev,
                          )
                        }
                      />
                    );
                  })}
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                orientation="horizontal"
                className="flex select-none touch-none h-2 p-0.5"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-full bg-border-subtle" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-special-lighter/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-special-lighter/80 to-transparent" />
          </div>
        </div>
      </div>

      {/* Desktop: collapsible side panel */}
      <div
        className={clsx(
          "hidden lg:flex flex-col h-full border-r border-border-subtle overflow-hidden",
          "transition-all duration-200",
          desktopExpanded ? "w-[340px]" : "w-16",
        )}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border-subtle">
          <div
            className={clsx(
              "min-w-0",
              desktopExpanded
                ? "opacity-100"
                : "hidden opacity-0 pointer-events-none",
            )}
          >
            <p className="text-xs uppercase tracking-wide text-color-600 dark:text-color-400">
              Modules
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDesktopExpanded((prev) => !prev)}
            aria-expanded={desktopExpanded}
            className={clsx(
              "inline-flex items-center justify-center rounded-md border border-border-subtle bg-surface/40 hover:bg-surface/70",
              "h-8 w-10 transition-colors duration-150 focus:outline-none focus-visible:ring focus-visible:ring-accent-three/70",
              "shrink-0",
              "text-color-600 dark:text-color-400 hover:text-foreground",
            )}
            title={desktopExpanded ? "Collapse panel" : "Expand panel"}
          >
            {renderChevronGlyph(desktopExpanded ? "left" : "right")}
          </button>
        </div>

        <ScrollArea.Root className="flex-1 min-h-0 border-b border-border-subtle">
          <ScrollArea.Viewport
            className={clsx(
              "h-full w-full",
              // desktopExpanded ? "px-3 py-3" : "px-2 py-2",
            )}
          >
            <div>
              {moduleList.map((module) => {
                const state = getToggleState(module);
                return (
                  <Configurator3DModuleToggleButton
                    key={module.id}
                    module={module}
                    variant="desktopRow"
                    compact={!desktopExpanded}
                    isOn={state.isOn}
                    disabled={state.disabled}
                    locked={state.locked}
                    showOverlay={state.showOverlay}
                    actionBadgeClassName={state.actionBadgeClassName}
                    preview={renderModulePreview(module)}
                    actionGlyph={
                      state.displayedPreviewAction
                        ? renderActionGlyph(state.displayedPreviewAction)
                        : null
                    }
                    infoGlyph={renderInfoGlyph()}
                    onToggle={() => toggleModule(module.id)}
                    onHoverStart={() => setHoveredModuleId(module.id)}
                    onHoverEnd={() =>
                      setHoveredModuleId((prev) =>
                        prev === module.id ? null : prev,
                      )
                    }
                  />
                );
              })}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="flex select-none touch-none p-1"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-full bg-border-subtle" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </div>
  );
}
