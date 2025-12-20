import { Canvas } from "@react-three/fiber";
import { PresentationControls, Environment } from "@react-three/drei";
import React, { memo, useEffect, useRef } from "react";
import type {
  ConfigurationSpecification,
  ModuleId,
  ModuleSpecification,
  Vec3,
} from "./types";
import { AnimatedModuleGroup } from "./AnimatedModuleGroup";
import { StaticGroundShadow } from "./StaticGroundShadow";

function Configurator3DCanvasImpl({
  modules,
  activeConfiguration,
  activeModuleSet,
  enterFromByModule,
  exitViaByModule,
  offscreenPosition,
  worldOffset,
}: {
  modules: Record<ModuleId, ModuleSpecification>;
  activeConfiguration?: ConfigurationSpecification;
  activeModuleSet: Set<ModuleId>;
  enterFromByModule: Record<ModuleId, Vec3>;
  exitViaByModule: Record<ModuleId, Vec3>;
  offscreenPosition: Vec3;
  worldOffset: Vec3;
}) {
  const seenModuleIdsRef = useRef<Set<ModuleId>>(new Set());

  useEffect(() => {
    for (const id of activeModuleSet) {
      seenModuleIdsRef.current.add(id);
    }
  }, [activeModuleSet]);

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        className="touch-none"
        camera={{ fov: 50, position: [0, 1.5, 8] }}
        // frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance" }}
      >
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
          rotation={[0.1, -0.4, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <group position={worldOffset}>
            {Object.entries(modules).map(([key, module]) => {
              const position =
                activeConfiguration?.modulePositions?.[module.id] ?? undefined;
              const resolvedPosition = (position ?? offscreenPosition) as Vec3;
              const isPresent = activeModuleSet.has(module.id);
              const shouldRenderModel =
                isPresent ||
                Boolean(exitViaByModule[module.id]) ||
                seenModuleIdsRef.current.has(module.id);
              return (
                <AnimatedModuleGroup
                  key={key}
                  module={module}
                  targetPosition={resolvedPosition}
                  isPresent={isPresent}
                  renderModel={shouldRenderModel}
                  enterFrom={enterFromByModule[module.id]}
                  exitVia={exitViaByModule[module.id]}
                  offscreenPosition={offscreenPosition}
                />
              );
            })}
          </group>
        </PresentationControls>
        {/*<StaticGroundShadow
          position={[0, worldOffset[1] - 1.5, 0]}
          size={10 / 3}
        />*/}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

function areCanvasPropsEqual(
  prev: React.ComponentProps<typeof Configurator3DCanvasImpl>,
  next: React.ComponentProps<typeof Configurator3DCanvasImpl>,
) {
  if (prev.modules !== next.modules) return false;
  if (prev.activeConfiguration !== next.activeConfiguration) return false;
  if (prev.activeModuleSet !== next.activeModuleSet) return false;
  if (prev.enterFromByModule !== next.enterFromByModule) return false;
  if (prev.exitViaByModule !== next.exitViaByModule) return false;
  if (
    prev.offscreenPosition[0] !== next.offscreenPosition[0] ||
    prev.offscreenPosition[1] !== next.offscreenPosition[1] ||
    prev.offscreenPosition[2] !== next.offscreenPosition[2]
  ) {
    return false;
  }
  if (
    prev.worldOffset[0] !== next.worldOffset[0] ||
    prev.worldOffset[1] !== next.worldOffset[1] ||
    prev.worldOffset[2] !== next.worldOffset[2]
  ) {
    return false;
  }
  return true;
}

export const Configurator3DCanvas = memo(
  Configurator3DCanvasImpl,
  areCanvasPropsEqual,
);
