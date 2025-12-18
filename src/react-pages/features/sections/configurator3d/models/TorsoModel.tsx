import React from "react";
import { useGLTF } from "@react-three/drei";
import GLBModel from "./GLBModel";

export interface TorsoModelProps extends React.ComponentProps<"group"> {
  /**
   * Public URL to the GLB asset.
   */
  url?: string;
}

export default function TorsoModel({
  url = "/configurations/models/Torso.glb",
  ...props
}: TorsoModelProps) {
  return <GLBModel url={url} modelOffset={[0, 0, 0.5]} {...props} />;
}

if (typeof window !== "undefined") {
  useGLTF.preload("/configurations/models/Torso.glb");
}
