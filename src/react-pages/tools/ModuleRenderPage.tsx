import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Box3, Vector3, type PerspectiveCamera, type Group } from "three";
import { configurator3DModules } from "@/react-pages/features/sections/configurator3d/spec";
import { Environment, useProgress } from "@react-three/drei";

const VIEW_SIZE = 1024;
const VIEW_ROTATION: [number, number, number] = [0.1, 0.3, 0];

function ModuleScene({ moduleId }: { moduleId: string }) {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  const { active } = useProgress();
  const hasFramedRef = useRef(false);

  const module = useMemo(() => {
    return (
      configurator3DModules[moduleId] ?? configurator3DModules.head ?? null
    );
  }, [moduleId]);

  useEffect(() => {
    hasFramedRef.current = false;
  }, [moduleId]);

  useEffect(() => {
    let rafId = 0;

    const frameOnceReady = () => {
      if (hasFramedRef.current) return;
      if (active) {
        rafId = window.requestAnimationFrame(frameOnceReady);
        return;
      }
      if (!groupRef.current) {
        rafId = window.requestAnimationFrame(frameOnceReady);
        return;
      }

      const box = new Box3().setFromObject(groupRef.current);
      if (box.isEmpty()) {
        rafId = window.requestAnimationFrame(frameOnceReady);
        return;
      }

      const size = box.getSize(new Vector3());
      const center = box.getCenter(new Vector3());
      groupRef.current.position.sub(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const perspective = camera as PerspectiveCamera;
      const fov = (perspective.fov * Math.PI) / 180;
      let distance = maxDim / (2 * Math.tan(fov / 2));
      distance *= 1.35;

      perspective.position.set(0, 0, distance);
      perspective.near = Math.max(0.01, distance / 10);
      perspective.far = distance * 10;
      perspective.updateProjectionMatrix();
      perspective.lookAt(0, 0, 0);

      hasFramedRef.current = true;
      document.body.dataset.ready = "true";
    };

    frameOnceReady();
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [active, camera]);

  if (!module) return null;

  return (
    <group ref={groupRef} rotation={VIEW_ROTATION} children={module.model} />
  );
}

export default function ModuleRenderPage({
  moduleId: initialModuleId = "head",
}: {
  moduleId?: string;
}) {
  const [moduleId, setModuleId] = useState(() => {
    if (typeof window === "undefined") return initialModuleId;
    const params = new URLSearchParams(window.location.search);
    return params.get("id") || initialModuleId;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryModuleId = params.get("id");
    if (queryModuleId && queryModuleId !== moduleId) {
      setModuleId(queryModuleId);
    }
  }, [initialModuleId, moduleId]);

  useEffect(() => {
    document.body.dataset.ready = "false";
    return () => {
      document.body.dataset.ready = "false";
    };
  }, [moduleId]);

  return (
    <div
      style={{
        width: `${VIEW_SIZE}px`,
        height: `${VIEW_SIZE}px`,
        margin: "0 auto",
      }}
    >
      <Canvas
        shadows
        gl={{ alpha: true, preserveDrawingBuffer: true }}
        dpr={[1, 2]}
        camera={{ fov: 35, position: [0, 0, 4], near: 0.01, far: 100 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          castShadow
        />
        <Suspense fallback={null}>
          <ModuleScene moduleId={moduleId} />
        </Suspense>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
