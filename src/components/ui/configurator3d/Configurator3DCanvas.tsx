import { Canvas } from "@react-three/fiber";
import { PresentationControls, Environment } from "@react-three/drei";
import React from "react";
import type {
  ConfigurationSpecification,
  ModuleId,
  ModuleSpecification,
  Vec3,
} from "./types";
import { AnimatedModuleGroup } from "./AnimatedModuleGroup";

export function Configurator3DCanvas({
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
  return (
    <div className="w-full h-full">
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
                activeConfiguration?.modulePositions?.[module.id] ?? undefined;
              const resolvedPosition = (position ?? offscreenPosition) as Vec3;
              const isPresent = activeModuleSet.has(module.id);
              return (
                <React.Suspense key={key} fallback={null}>
                  <AnimatedModuleGroup
                    module={module}
                    targetPosition={resolvedPosition}
                    isPresent={isPresent}
                    enterFrom={enterFromByModule[module.id]}
                    exitVia={exitViaByModule[module.id]}
                    offscreenPosition={offscreenPosition}
                  />
                </React.Suspense>
              );
            })}
          </group>
        </PresentationControls>
        {/* For now, we are disabling contact shadows */}
        {/*<ContactShadows
          position={[0, worldOffset[1] - 1.5, 0]}
          opacity={0.75}
          scale={10}
          blur={3}
          far={4}
        />*/}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
