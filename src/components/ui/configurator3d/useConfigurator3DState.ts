import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  ConfigurationEntry,
  ConfigurationId,
  ConfigurationSpecification,
  ModuleId,
  ModuleSpecification,
  Vec3,
} from "./types";
import { setFromArray } from "./sets";
import { computeEntryWaypoint, computeExitWaypoint } from "./waypoints";

export function useConfigurator3DState({
  modules,
  configurations,
  initialConfigurationId,
  urlSync = false,
  urlParam = "config",
  urlHistoryMode = "replace",
}: {
  modules: Record<ModuleId, ModuleSpecification>;
  configurations: Record<ConfigurationId, ConfigurationSpecification>;
  initialConfigurationId?: ConfigurationId;
  urlSync?: boolean;
  urlParam?: string;
  urlHistoryMode?: "replace" | "push";
}) {
  const moduleList = useMemo(() => Object.values(modules), [modules]);

  const configurationEntries = useMemo<ConfigurationEntry[]>(() => {
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

  const activeConfigurationIdRef = useRef(activeConfigurationId);
  useEffect(() => {
    activeConfigurationIdRef.current = activeConfigurationId;
  }, [activeConfigurationId]);

  const [enterFromByModule, setEnterFromByModule] = useState<
    Record<ModuleId, Vec3>
  >({});
  const [exitViaByModule, setExitViaByModule] = useState<
    Record<ModuleId, Vec3>
  >({});

  const lastDefaultConfigurationIdRef = useRef(defaultConfigurationId);
  const hasSyncedUrlOnMountRef = useRef(false);
  const hasReadUrlParamRef = useRef(false);

  const setConfigurationId = useCallback(
    (nextId: ConfigurationId) => {
      const currentId = activeConfigurationIdRef.current;
      if (!nextId || nextId === currentId) return;

      const prevConfig = configurations[currentId];
      const nextConfig = configurations[nextId];

      if (!prevConfig || !nextConfig) {
        setEnterFromByModule({});
        setExitViaByModule({});
        setActiveConfigurationId(nextId);
        activeConfigurationIdRef.current = nextId;
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
          entering[module.id] = module.enterFrom
            ? (module.enterFrom as Vec3)
            : computeEntryWaypoint(nextConfig, module.id, nextTarget);
        } else if (wasOn && !nowOn && prevTarget) {
          exiting[module.id] = module.exitTo
            ? (module.exitTo as Vec3)
            : module.enterFrom
              ? (module.enterFrom as Vec3)
              : computeExitWaypoint(prevConfig, module.id, prevTarget);
        }
      }

      setEnterFromByModule(entering);
      setExitViaByModule(exiting);
      setActiveConfigurationId(nextId);
      activeConfigurationIdRef.current = nextId;
    },
    [configurations, moduleList],
  );

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
  }, [configurations, setConfigurationId, urlParam, urlSync]);

  useEffect(() => {
    if (!defaultConfigurationId) return;
    const hasActive = Boolean(configurations[activeConfigurationId]);
    const defaultChanged =
      lastDefaultConfigurationIdRef.current !== defaultConfigurationId;
    if (!hasActive || defaultChanged) {
      lastDefaultConfigurationIdRef.current = defaultConfigurationId;
      setConfigurationId(defaultConfigurationId);
    }
  }, [
    activeConfigurationId,
    configurations,
    defaultConfigurationId,
    setConfigurationId,
  ]);

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

  return {
    moduleList,
    configurationEntries,
    activeConfigurationId,
    activeConfiguration,
    activeModuleSet,
    enterFromByModule,
    exitViaByModule,
    setConfigurationId,
  };
}
