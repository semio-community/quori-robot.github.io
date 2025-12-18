import React, { useMemo, useState } from "react";
import Checkbox from "./Checkbox";
import * as ScrollArea from "@radix-ui/react-scroll-area";

export type ModuleKey = string;

export interface ModuleDefinition {
  key: ModuleKey;
  label: string;
  helper?: string;
}

export interface ConfigCombination {
  id: string;
  label: string;
  description?: string;
  modules: Record<ModuleKey, boolean>;
  image?: string;
}

export interface ConfiguratorProps {
  title?: string;
  subtitle?: string;
  modules: ModuleDefinition[];
  combinations: ConfigCombination[];
  initialState?: Record<ModuleKey, boolean>;
  applyRules?: (
    prev: Record<ModuleKey, boolean>,
    key: ModuleKey,
    nextValue: boolean,
  ) => Record<ModuleKey, boolean>;
}

const defaultApplyRules = (
  prev: Record<ModuleKey, boolean>,
  key: ModuleKey,
  nextValue: boolean,
): Record<ModuleKey, boolean> => ({ ...prev, [key]: nextValue });

function getActiveCombination(
  state: Record<ModuleKey, boolean>,
  combos: ConfigCombination[],
  moduleKeys: ModuleKey[],
): ConfigCombination {
  const fallbackCombo: ConfigCombination = combos.find(Boolean) || {
    id: "default",
    label: "Current configuration",
    modules: { ...state },
  };

  const match = combos.find((combo) =>
    moduleKeys.every((k) => combo.modules[k] === state[k]),
  );
  return match || fallbackCombo;
}

function placeholderGradient(label: string): string {
  const encoded = encodeURIComponent(label || "Configuration");
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop stop-color='%23EF6129' offset='0%'/><stop stop-color='%23FF9E00' offset='50%'/><stop stop-color='%2350C4B6' offset='100%'/></linearGradient></defs><rect width='800' height='450' fill='url(%23g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='36' font-family='Inter, sans-serif'>${encoded}</text></svg>`)}`;
}

export default function Configurator({
  title = "Configuration Builder",
  subtitle = "Toggle modules to preview supported combinations.",
  modules,
  combinations,
  initialState,
  applyRules = defaultApplyRules,
}: ConfiguratorProps) {
  const moduleKeys = useMemo(() => modules.map((m) => m.key), [modules]);
  const hasMatchingCombo = (candidate: Record<ModuleKey, boolean>) =>
    combinations.some((combo) =>
      moduleKeys.every(
        (k) => Boolean(combo.modules[k]) === Boolean(candidate[k]),
      ),
    );

  const [state, setState] = useState<Record<ModuleKey, boolean>>(() => {
    const baseState = modules.reduce<Record<ModuleKey, boolean>>((acc, m) => {
      acc[m.key] = false;
      return acc;
    }, {});
    if (initialState) return { ...baseState, ...initialState };
    const first = combinations.find(Boolean);
    if (first) return { ...baseState, ...first.modules };
    return baseState;
  });

  const activeCombo = useMemo(
    () => getActiveCombination(state, combinations, moduleKeys),
    [state, combinations, moduleKeys],
  );

  const deriveStatus = (key: ModuleKey) => {
    const isOn = Boolean(state[key]);
    const nextOn = applyRules(state, key, true);
    const nextOff = applyRules(state, key, false);
    const canTurnOn = hasMatchingCombo(nextOn);
    const canTurnOff = hasMatchingCombo(nextOff);
    const unavailable = !isOn && !canTurnOn;
    return { isOn, unavailable, canTurnOn, canTurnOff };
  };

  const handleToggle = (key: ModuleKey) => {
    const { isOn, unavailable, canTurnOff } = deriveStatus(key);
    if (unavailable) return;
    if (isOn && !canTurnOff) return;

    const nextValue = !isOn;
    const nextState = applyRules(state, key, nextValue);
    const matched = getActiveCombination(nextState, combinations, moduleKeys);
    const normalized = moduleKeys.reduce<Record<ModuleKey, boolean>>(
      (acc, k) => {
        acc[k] = Boolean(matched.modules[k]);
        return acc;
      },
      {},
    );
    setState(normalized);
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center space-y-2">
        <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
        <p className="text-color-600 dark:text-color-400 text-sm sm:text-base">
          {subtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.3fr]">
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-border-subtle bg-special-lighter/60 p-4">
            <p className="text-xs uppercase tracking-wide text-color-600 dark:text-color-400 mb-1">
              Current configuration
            </p>
            <p className="text-lg font-semibold text-foreground">
              {activeCombo.label}
            </p>
            {activeCombo.description ? (
              <p className="text-sm text-color-600 dark:text-color-400 mt-1">
                {activeCombo.description}
              </p>
            ) : null}
          </div>
          <ScrollArea.Root className="max-h-[520px] lg:max-h-none lg:h-full">
            <ScrollArea.Viewport className="h-full w-full">
              <div className="space-y-3 pb-2">
                {modules.map(({ key, label, helper }) => {
                  const status = deriveStatus(key);
                  const isActive = status.isOn;
                  const unavailable = status.unavailable;
                  const canTurnOn = status.canTurnOn;
                  return (
                    <Checkbox
                      key={key}
                      label={label}
                      helper={helper}
                      checked={isActive}
                      disabled={unavailable}
                      canTurnOn={canTurnOn}
                      onToggle={() => handleToggle(key)}
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

        <div className="rounded-xl border border-border-subtle bg-special-lighter/60 backdrop-blur-lg shadow-sm overflow-hidden">
          <div className="relative aspect-4/5 bg-linear-to-br from-accent-one/20 via-accent-two/10 to-accent-three/20">
            <img
              src={
                activeCombo.image ||
                placeholderGradient(activeCombo.label ?? "Configuration")
              }
              alt={`${activeCombo.label} preview`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
