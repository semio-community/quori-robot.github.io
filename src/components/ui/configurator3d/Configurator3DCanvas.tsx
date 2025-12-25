import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import React, { memo, useEffect, useMemo, useRef } from "react";
import { useGesture } from "@use-gesture/react";
import { easing } from "maath";
import { MathUtils, type Group } from "three";
import type {
  ConfigurationSpecification,
  ModuleId,
  ModuleSpecification,
  Vec3,
} from "./types";
import { AnimatedModuleGroup } from "./AnimatedModuleGroup";
import { StaticGroundShadow } from "./StaticGroundShadow";

type PresentationControlsProps = {
  enabled?: boolean;
  snap?: boolean | number;
  global?: boolean;
  domElement?: HTMLElement | null;
  cursor?: boolean;
  children: React.ReactNode;
  speed?: number;
  rotation?: [number, number, number];
  zoom?: number;
  polar?: [number, number];
  azimuth?: [number, number];
  damping?: number;
};

function DemandPresentationControls({
  enabled = true,
  snap,
  global = false,
  domElement,
  cursor = true,
  children,
  speed = 1,
  rotation = [0, 0, 0],
  zoom = 1,
  polar = [0, Math.PI / 2],
  azimuth = [-Infinity, Infinity],
  damping = 0.25,
}: PresentationControlsProps) {
  const events = useThree((state) => state.events);
  const gl = useThree((state) => state.gl);
  const { size } = useThree();
  const invalidate = useThree((state) => state.invalidate);
  const explDomElement = domElement || events.connected || gl.domElement;
  const isInteractingRef = useRef(false);

  const rPolar = useMemo<[number, number]>(
    () => [rotation[0] + polar[0], rotation[0] + polar[1]],
    [polar[0], polar[1], rotation[0]],
  );
  const rAzimuth = useMemo<[number, number]>(
    () => [rotation[1] + azimuth[0], rotation[1] + azimuth[1]],
    [azimuth[0], azimuth[1], rotation[1]],
  );
  const rInitial = useMemo(
    () => [
      MathUtils.clamp(rotation[0], rPolar[0], rPolar[1]),
      MathUtils.clamp(rotation[1], rAzimuth[0], rAzimuth[1]),
      rotation[2],
    ],
    [rAzimuth, rPolar, rotation],
  );

  useEffect(() => {
    if (global && cursor && enabled) {
      explDomElement.style.cursor = "grab";
      gl.domElement.style.cursor = "";
      return () => {
        explDomElement.style.cursor = "default";
        gl.domElement.style.cursor = "default";
      };
    }
    return undefined;
  }, [cursor, enabled, explDomElement, gl.domElement, global]);

  const [animation] = React.useState({
    scale: 1,
    rotation: rInitial,
    damping,
  });
  const ref = useRef<Group | null>(null);

  useEffect(() => {
    invalidate();
  }, [invalidate]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    easing.damp3(ref.current.scale, animation.scale, animation.damping, delta);
    easing.dampE(
      ref.current.rotation,
      animation.rotation as [number, number, number],
      animation.damping,
      delta,
    );

    const needsUpdate =
      Math.abs(ref.current.scale.x - animation.scale) > 0.0005 ||
      Math.abs(ref.current.rotation.x - (animation.rotation?.[0] ?? 0)) >
        0.0005 ||
      Math.abs(ref.current.rotation.y - (animation.rotation?.[1] ?? 0)) >
        0.0005 ||
      Math.abs(ref.current.rotation.z - (animation.rotation?.[2] ?? 0)) >
        0.0005;

    if (needsUpdate || isInteractingRef.current) {
      invalidate();
    } else {
      isInteractingRef.current = false;
    }
  });

  const bind = useGesture(
    {
      onHover: ({ last }) => {
        if (cursor && !global && enabled) {
          explDomElement.style.cursor = last ? "auto" : "grab";
        }
      },
      onDrag: ({
        down,
        delta: [x, y],
        memo: [oldY, oldX] = animation.rotation,
      }) => {
        if (!enabled) return [y, x];
        if (cursor) explDomElement.style.cursor = down ? "grabbing" : "grab";
        const nextX = MathUtils.clamp(
          oldX + (x / size.width) * Math.PI * speed,
          rAzimuth[0],
          rAzimuth[1],
        );
        const nextY = MathUtils.clamp(
          oldY + (y / size.height) * Math.PI * speed,
          rPolar[0],
          rPolar[1],
        );
        animation.scale = down && nextY > rPolar[1] / 2 ? zoom : 1;
        animation.rotation = snap && !down ? rInitial : [nextY, nextX, 0];
        animation.damping =
          snap && !down && typeof snap !== "boolean" ? snap : damping;
        isInteractingRef.current = down;
        invalidate();
        return [nextY, nextX];
      },
    },
    { target: global ? explDomElement : undefined },
  );

  return (
    <group ref={ref} {...(typeof bind === "function" ? bind() : {})}>
      {children}
    </group>
  );
}

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
        frameloop="demand"
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
        <DemandPresentationControls
          global
          damping={0.2}
          snap={true}
          // rotation={[0.1, -0.4, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <group position={worldOffset} rotation={[0.1, -0.4, 0]}>
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
        </DemandPresentationControls>
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
