import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { type Group } from "three";

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
}

export default function GLBModel({
  url,
  modelOffset,
  modelRotation,
  ...props
}: GLBModelProps) {
  const gltf = useGLTF(url);

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

  return (
    <group {...props}>
      <group rotation={modelRotation}>
        <group position={modelOffset}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}
