import React from "react";
import { useGLTF } from "@react-three/drei";
import GLBModel from "./GLBModel";

export interface BaseModelProps extends React.ComponentProps<"group"> {
  /**
   * Public URL to the GLB asset.
   */
  url?: string;
}

export default function BaseModel({
  url = "/configurations/models/Base.glb",
  ...props
}: BaseModelProps) {
  return <GLBModel url={url} {...props} />;
}

if (typeof window !== "undefined") {
  useGLTF.preload("/configurations/models/Base.glb");
}
