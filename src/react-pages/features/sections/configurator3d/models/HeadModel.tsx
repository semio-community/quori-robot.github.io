import React from "react";
import { useGLTF } from "@react-three/drei";
import GLBModel from "./GLBModel";

export interface HeadModelProps extends React.ComponentProps<"group"> {
  /**
   * Public URL to the GLB asset.
   */
  url?: string;
}

export default function HeadModel({
  url = "/configurations/models/Head.glb",
  ...props
}: HeadModelProps) {
  return <GLBModel url={url} modelOffset={[-0.03, 0, 0.7]} {...props} />;
}

if (typeof window !== "undefined") {
  useGLTF.preload("/configurations/models/Head.glb");
}
