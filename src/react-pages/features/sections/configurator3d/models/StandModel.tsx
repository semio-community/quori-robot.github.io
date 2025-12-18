import React from "react";
import { useGLTF } from "@react-three/drei";
import GLBModel from "./GLBModel";

export interface StandModelProps extends React.ComponentProps<"group"> {
  /**
   * Public URL to the GLB asset.
   */
  url?: string;
}

export default function StandModel({
  url = "/configurations/models/Stand.glb",
  ...props
}: StandModelProps) {
  return <GLBModel url={url} modelOffset={[0, 0, 0.5]} {...props} />;
}

if (typeof window !== "undefined") {
  useGLTF.preload("/configurations/models/Stand.glb");
}
