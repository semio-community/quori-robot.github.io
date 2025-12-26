import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopRepeat, type Group } from "three";
import { useCanvasVisibility } from "@/components/ui/configurator3d/CanvasVisibilityContext";

type Vec3 = [number, number, number];

export interface GLBModelProps extends React.ComponentProps<"group"> {
  /**
   * Public URL to the GLB asset.
   */
  url: string;
  /**
   * Local-space offset applied to the loaded scene without affecting the
   * parent group transforms (useful for per-module alignment while keeping
   * animation handled by the outer wrapper).
   */
  modelOffset?: Vec3;
  /**
   * Local-space rotation offset (Euler, radians). This is applied *after*
   * `modelOffset` by placing the offset on a child group and the rotation on
   * its parent group.
   */
  modelRotation?: Vec3;
  /**
   * Auto-play any embedded animations (if present).
   */
  playAnimations?: boolean;
  /**
   * Optionally restrict which animation names should be played.
   */
  animationNames?: string[];
}

export default function GLBModel({
  url,
  modelOffset,
  modelRotation,
  playAnimations = true,
  animationNames,
  ...props
}: GLBModelProps) {
  const gltf = useGLTF(url);
  const groupRef = useRef<Group>(null);
  const { actions } = useAnimations(gltf.animations ?? [], groupRef);
  const invalidate = useThree((state) => state.invalidate);
  const isAnimatingRef = useRef(false);
  const isVisible = useCanvasVisibility();

  const scene = useMemo(() => {
    const scene = gltf.scene.clone(true) as Group;
    scene.traverse((obj) => {
      const mesh = obj as unknown as {
        isMesh?: boolean;
        castShadow?: boolean;
        receiveShadow?: boolean;
      };
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    return scene;
  }, [gltf.scene]);

  useEffect(() => {
    if (!playAnimations) return;
    if (!actions) return;

    const names = animationNames ?? Object.keys(actions);
    if (names.length === 0) return;
    isAnimatingRef.current = true;
    if (isVisible) {
      invalidate();
    }
    names.forEach((name) => {
      const action = actions[name];
      if (!action) return;
      action.reset();
      action.setLoop(LoopRepeat, Infinity);
      action.play();
    });

    return () => {
      isAnimatingRef.current = false;
      names.forEach((name) => {
        actions[name]?.stop();
      });
    };
  }, [actions, animationNames, invalidate, isVisible, playAnimations]);

  useFrame(() => {
    if (isAnimatingRef.current && isVisible) {
      invalidate();
    }
  });

  useEffect(() => {
    if (isVisible && isAnimatingRef.current) {
      invalidate();
    }
  }, [invalidate, isVisible]);

  return (
    <group ref={groupRef} {...props}>
      <group rotation={modelRotation}>
        <group position={modelOffset}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}
