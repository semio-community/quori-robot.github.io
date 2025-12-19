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
    <div
      className={clsx(
        "w-full rounded-xl border border-border-subtle bg-special-lighter/60",
        className,
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <div className="order-2 lg:order-1 w-full lg:w-auto lg:flex-none">
          <Configurator3DToggleControls
            className="lg:h-[530px]"
            moduleList={moduleList}
            configurationEntries={configurationEntries}
            activeConfigurationId={activeConfigurationId}
            activeConfiguration={activeConfiguration}
            activeModuleSet={activeModuleSet}
            setConfigurationId={setConfigurationId}
          />
        </div>

        <div className="order-1 lg:order-2 w-full lg:flex-1 min-w-0">
          <div className="w-full h-[530px] overflow-hidden">
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
      </div>
    </div>
  );
}
