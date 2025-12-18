import React, { useEffect, useRef } from "react";
import { animate, type AnimationPlaybackControlsWithThen } from "motion";
import type { Group, Material, Mesh } from "three";
import type { ModuleSpecification, Vec3 } from "./types";

export function AnimatedModuleGroup({
  module,
  targetPosition,
  isPresent,
  enterFrom,
  exitVia,
  offscreenPosition,
}: {
  module: ModuleSpecification;
  targetPosition: Vec3;
  isPresent: boolean;
  enterFrom?: Vec3;
  exitVia?: Vec3;
  offscreenPosition: Vec3;
}) {
  const groupRef = useRef<Group | null>(null);
  const initialPositionRef = useRef<Vec3>(targetPosition);
  const hasMountedRef = useRef(false);
  const prevIsPresentRef = useRef(isPresent);
  const isPresentRef = useRef(isPresent);
  const animationTokenRef = useRef(0);
  const materialsRef = useRef<Material[]>([]);
  const opacityValueRef = useRef(isPresent ? 1 : 0);
  const controlsRef = useRef<{
    x?: AnimationPlaybackControlsWithThen;
    y?: AnimationPlaybackControlsWithThen;
    z?: AnimationPlaybackControlsWithThen;
    opacity?: AnimationPlaybackControlsWithThen;
  }>({});

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    if (materialsRef.current.length === 0) {
      const collected = new Set<Material>();
      group.traverse((obj) => {
        const mesh = obj as Mesh;
        if (!(mesh as unknown as { isMesh?: boolean }).isMesh) return;
        const currentMaterial = mesh.material;
        if (!currentMaterial) return;
        if (Array.isArray(currentMaterial)) {
          const clones = currentMaterial.map((material) => material.clone());
          mesh.material = clones;
          clones.forEach((material) => collected.add(material));
        } else {
          const clone = currentMaterial.clone();
          mesh.material = clone;
          collected.add(clone);
        }
      });

      materialsRef.current = Array.from(collected);
      const initialOpacity = isPresent ? 1 : 0;
      opacityValueRef.current = initialOpacity;
      for (const material of materialsRef.current) {
        material.transparent = true;
        material.opacity = initialOpacity;
      }
    }

    const setOpacity = (value: number) => {
      opacityValueRef.current = value;
      for (const material of materialsRef.current) {
        material.transparent = true;
        material.opacity = value;
      }
    };

    const prevIsPresent = prevIsPresentRef.current;
    prevIsPresentRef.current = isPresent;
    isPresentRef.current = isPresent;

    const [nextX, nextY, nextZ] = targetPosition;
    const entering = !prevIsPresent && isPresent;
    const exiting = prevIsPresent && !isPresent;

    if (!hasMountedRef.current) {
      group.position.set(nextX, nextY, nextZ);
      hasMountedRef.current = true;
      return;
    }

    if (entering) {
      const start = enterFrom ?? [nextX, nextY + 1, nextZ];
      setOpacity(0);
      group.position.set(start[0], start[1], start[2]);
    }

    controlsRef.current.x?.stop();
    controlsRef.current.y?.stop();
    controlsRef.current.z?.stop();
    controlsRef.current.opacity?.stop();

    const animationTarget = exiting && exitVia ? exitVia : targetPosition;

    const transition = {
      type: "spring" as const,
      stiffness: 220,
      damping: 26,
      mass: 0.8,
      restDelta: 0.001,
      restSpeed: 0.01,
    };

    const token = (animationTokenRef.current += 1);

    controlsRef.current.x = animate(group.position.x, animationTarget[0], {
      ...transition,
      onUpdate: (latest) => {
        const currentGroup = groupRef.current;
        if (currentGroup) currentGroup.position.x = latest;
      },
    });
    controlsRef.current.y = animate(group.position.y, animationTarget[1], {
      ...transition,
      onUpdate: (latest) => {
        const currentGroup = groupRef.current;
        if (currentGroup) currentGroup.position.y = latest;
      },
    });
    controlsRef.current.z = animate(group.position.z, animationTarget[2], {
      ...transition,
      onUpdate: (latest) => {
        const currentGroup = groupRef.current;
        if (currentGroup) currentGroup.position.z = latest;
      },
    });

    if (entering || exiting) {
      const targetOpacity = exiting ? 0 : 1;
      controlsRef.current.opacity = animate(
        opacityValueRef.current,
        targetOpacity,
        {
          duration: 0.28,
          ease: "easeOut",
          onUpdate: (latest) => setOpacity(latest),
        },
      );
    } else {
      setOpacity(isPresent ? 1 : 0);
    }

    if (exiting && exitVia) {
      const finished = [
        controlsRef.current.x?.finished,
        controlsRef.current.y?.finished,
        controlsRef.current.z?.finished,
        controlsRef.current.opacity?.finished,
      ].filter(Boolean) as Promise<unknown>[];

      Promise.all(finished)
        .then(() => {
          if (animationTokenRef.current !== token) return;
          if (isPresentRef.current) return;
          const currentGroup = groupRef.current;
          if (!currentGroup) return;
          setOpacity(0);
          currentGroup.position.set(
            offscreenPosition[0],
            offscreenPosition[1],
            offscreenPosition[2],
          );
        })
        .catch(() => {
          // Swallow cancellation errors.
        });
    }

    return () => {
      controlsRef.current.x?.stop();
      controlsRef.current.y?.stop();
      controlsRef.current.z?.stop();
      controlsRef.current.opacity?.stop();
    };
  }, [
    enterFrom?.[0],
    enterFrom?.[1],
    enterFrom?.[2],
    exitVia?.[0],
    exitVia?.[1],
    exitVia?.[2],
    isPresent,
    offscreenPosition[0],
    offscreenPosition[1],
    offscreenPosition[2],
    targetPosition[0],
    targetPosition[1],
    targetPosition[2],
  ]);

  return (
    <group ref={groupRef} position={initialPositionRef.current}>
      {module.model}
    </group>
  );
}
