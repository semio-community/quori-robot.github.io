import React, { useCallback, useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import { Configurator3DCanvas } from "./configurator3d/Configurator3DCanvas";
import { useConfigurator3DState } from "./configurator3d/useConfigurator3DState";
import {
  DEFAULT_OFFSCREEN_POSITION,
  type ConfigurationId,
  type ConfigurationSpecification,
  type ModuleId,
  type ModuleSpecification,
  type Vec3,
} from "./configurator3d/types";

export interface ModuleCarouselProps {
  modules: Record<ModuleId, ModuleSpecification>;
  configurations: Record<ConfigurationId, ConfigurationSpecification>;
  configurationIds: ConfigurationId[];
  initialConfigurationId?: ConfigurationId;
  className?: string;
  heightClassName?: string;
  worldOffset?: Vec3;
  offscreenPosition?: Vec3;
  autoAdvance?: boolean;
  autoAdvanceMs?: number;
  showActiveName?: boolean;
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
      className="h-3.5 w-3.5"
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

function wrapIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

export function ModuleCarousel({
  modules,
  configurations,
  configurationIds,
  initialConfigurationId,
  className,
  heightClassName = "h-[300px] sm:h-[380px] md:h-[460px]",
  worldOffset = [0, -0.8, 0],
  offscreenPosition = DEFAULT_OFFSCREEN_POSITION,
  autoAdvance = true,
  autoAdvanceMs = 6500,
  showActiveName = false,
}: ModuleCarouselProps) {
  const orderedConfigurationIds = useMemo(() => {
    const seen = new Set<string>();
    const ordered: ConfigurationId[] = [];
    const source =
      configurationIds.length > 0
        ? configurationIds
        : (Object.keys(configurations) as ConfigurationId[]);

    for (const id of source) {
      if (!id) continue;
      if (!configurations[id]) continue;
      if (seen.has(id)) continue;
      seen.add(id);
      ordered.push(id);
    }
    return ordered;
  }, [configurationIds, configurations]);

  const resolvedInitialId = useMemo(() => {
    if (initialConfigurationId && configurations[initialConfigurationId]) {
      return initialConfigurationId;
    }
    return orderedConfigurationIds[0] ?? "";
  }, [configurations, initialConfigurationId, orderedConfigurationIds]);

  const {
    activeConfigurationId,
    activeConfiguration,
    activeModuleSet,
    enterFromByModule,
    exitViaByModule,
    setConfigurationId,
  } = useConfigurator3DState({
    modules,
    configurations,
    initialConfigurationId: resolvedInitialId,
    urlSync: false,
  });

  useEffect(() => {
    if (orderedConfigurationIds.length === 0) return;
    if (orderedConfigurationIds.includes(activeConfigurationId)) return;
    setConfigurationId(orderedConfigurationIds[0]!);
  }, [activeConfigurationId, orderedConfigurationIds, setConfigurationId]);

  const activeIndex = useMemo(() => {
    const found = orderedConfigurationIds.indexOf(activeConfigurationId);
    if (found >= 0) return found;
    return 0;
  }, [activeConfigurationId, orderedConfigurationIds]);

  const goToIndex = useCallback(
    (index: number) => {
      const nextId =
        orderedConfigurationIds[
          wrapIndex(index, orderedConfigurationIds.length)
        ];
      if (!nextId) return;
      setConfigurationId(nextId);
    },
    [orderedConfigurationIds, setConfigurationId],
  );

  const goPrev = useCallback(
    () => goToIndex(activeIndex - 1),
    [activeIndex, goToIndex],
  );
  const goNext = useCallback(
    () => goToIndex(activeIndex + 1),
    [activeIndex, goToIndex],
  );

  const [controlsHovered, setControlsHovered] = useState(false);

  useEffect(() => {
    if (!autoAdvance) return;
    if (controlsHovered) return;
    if (orderedConfigurationIds.length <= 1) return;
    if (typeof window === "undefined") return;

    const interval = window.setInterval(() => {
      goNext();
    }, autoAdvanceMs);

    return () => window.clearInterval(interval);
  }, [
    autoAdvance,
    autoAdvanceMs,
    controlsHovered,
    goNext,
    orderedConfigurationIds.length,
  ]);

  if (orderedConfigurationIds.length === 0) {
    return null;
  }

  const showControls = orderedConfigurationIds.length > 1;

  return (
    <div
      className={clsx(
        "w-full dark:bg-special-lighter/60 bg-neutral-200/60",
        className,
      )}
    >
      <div className={clsx("relative w-full overflow-hidden", heightClassName)}>
        <Configurator3DCanvas
          modules={modules}
          activeConfiguration={activeConfiguration}
          activeModuleSet={activeModuleSet}
          enterFromByModule={enterFromByModule}
          exitViaByModule={exitViaByModule}
          offscreenPosition={offscreenPosition}
          worldOffset={worldOffset}
        />

        {showActiveName && activeConfiguration?.name ? (
          <div className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center px-4 pt-6">
            <div className="rounded-full border border-border-subtle bg-surface/40 px-4 py-2 text-xs font-medium text-foreground backdrop-blur">
              {activeConfiguration.name}
            </div>
          </div>
        ) : null}
      </div>

      {showControls ? (
        <div className="flex justify-center px-4 py-3">
          <div
            className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface/40 px-2 py-1.5 shadow-sm backdrop-blur"
            onMouseEnter={() => setControlsHovered(true)}
            onMouseLeave={() => setControlsHovered(false)}
            onFocusCapture={() => setControlsHovered(true)}
            onBlurCapture={(event) => {
              const nextTarget = event.relatedTarget as Node | null;
              if (nextTarget && event.currentTarget.contains(nextTarget)) {
                return;
              }
              setControlsHovered(false);
            }}
          >
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous configuration"
              className={clsx(
                "group h-8 w-8 inline-flex items-center justify-center rounded-full transition-all duration-150",
                "text-color-600 dark:text-color-400 hover:text-foreground hover:bg-surface/60",
                "hover:shadow-sm hover:ring-1 hover:ring-accent-three/20 active:scale-95",
                "focus:outline-none focus-visible:ring focus-visible:ring-accent-three/70",
              )}
            >
              <span className="inline-flex transition-transform duration-150 group-hover:-translate-x-0.5">
                {renderChevronGlyph("left")}
              </span>
            </button>

            <div className="flex items-center">
              {orderedConfigurationIds.map((id, index) => {
                const name = configurations[id]?.name ?? `Slide ${index + 1}`;
                const isActive = index === activeIndex;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goToIndex(index)}
                    aria-label={`Show ${name}`}
                    aria-current={isActive ? "true" : undefined}
                    className={clsx(
                      "group h-8 w-8 inline-flex items-center justify-center rounded-full transition-all duration-150",
                      "focus:outline-none focus-visible:ring focus-visible:ring-accent-three/70",
                      "hover:bg-surface/60 hover:shadow-sm hover:ring-1 hover:ring-accent-three/20 active:scale-95",
                    )}
                  >
                    <span
                      className={clsx(
                        "h-2 w-2 rounded-full border transition-all duration-150",
                        isActive
                          ? "bg-accent-three border-accent-three scale-110"
                          : "bg-transparent border-border-subtle group-hover:bg-surface/70 group-hover:border-accent-three/60 group-hover:scale-110",
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next configuration"
              className={clsx(
                "group h-8 w-8 inline-flex items-center justify-center rounded-full transition-all duration-150",
                "text-color-600 dark:text-color-400 hover:text-foreground hover:bg-surface/60",
                "hover:shadow-sm hover:ring-1 hover:ring-accent-three/20 active:scale-95",
                "focus:outline-none focus-visible:ring focus-visible:ring-accent-three/70",
              )}
            >
              <span className="inline-flex transition-transform duration-150 group-hover:translate-x-0.5">
                {renderChevronGlyph("right")}
              </span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
