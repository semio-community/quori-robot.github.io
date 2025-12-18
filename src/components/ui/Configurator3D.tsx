import React from "react";
import { clsx } from "clsx";
import {
  DEFAULT_OFFSCREEN_POSITION,
  type Configurator3DProps,
} from "./configurator3d/types";
import { Configurator3DCanvas } from "./configurator3d/Configurator3DCanvas";
import { Configurator3DToggleControls } from "./configurator3d/Configurator3DToggleControls";
import { useConfigurator3DState } from "./configurator3d/useConfigurator3DState";

export type {
  ConfigurationEntry,
  ConfigurationId,
  ConfigurationSpecification,
  Configurator3DProps,
  ModuleId,
  ModuleSpecification,
  Vec3,
} from "./configurator3d/types";

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
  const {
    moduleList,
    configurationEntries,
    activeConfigurationId,
    activeConfiguration,
    activeModuleSet,
    enterFromByModule,
    exitViaByModule,
    setConfigurationId,
  } = useConfigurator3DState({
    modules,
    configurations,
    initialConfigurationId,
    urlSync,
    urlParam,
    urlHistoryMode,
  });

  if (configurationEntries.length === 0) {
    return null;
  }

  return (
    <div className={clsx("w-full", className)}>
      <Configurator3DToggleControls
        moduleList={moduleList}
        configurationEntries={configurationEntries}
        activeConfigurationId={activeConfigurationId}
        activeConfiguration={activeConfiguration}
        activeModuleSet={activeModuleSet}
        setConfigurationId={setConfigurationId}
      />

      <div className="w-full h-[500px] rounded-xl border border-border-subtle bg-special-lighter/60 overflow-hidden">
        <Configurator3DCanvas
          modules={modules}
          activeConfiguration={activeConfiguration}
          activeModuleSet={activeModuleSet}
          enterFromByModule={enterFromByModule}
          exitViaByModule={exitViaByModule}
          offscreenPosition={offscreenPosition}
          worldOffset={worldOffset}
        />
      </div>
    </div>
  );
}
