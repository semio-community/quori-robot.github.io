import React, { useEffect, useMemo } from "react";
import {
  CanvasTexture,
  ClampToEdgeWrapping,
  SRGBColorSpace,
  type Texture,
} from "three";
import type { Vec3 } from "./types";

export interface StaticGroundShadowProps {
  position: Vec3;
  size?: number;
  opacity?: number;
}

function createShadowTexture(): Texture | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const center = canvas.width / 2;
  const radius = canvas.width / 2;

  const gradient = ctx.createRadialGradient(
    center,
    center,
    0,
    center,
    center,
    radius,
  );
  gradient.addColorStop(0, "rgba(0, 0, 0, 0.50)");
  gradient.addColorStop(0.35, "rgba(0, 0, 0, 0.40)");
  gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.20)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new CanvasTexture(canvas);
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function StaticGroundShadow({
  position,
  size = 10,
  opacity = 0.85,
}: StaticGroundShadowProps) {
  const texture = useMemo(() => createShadowTexture(), []);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  if (!texture) return null;

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} renderOrder={-1}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
