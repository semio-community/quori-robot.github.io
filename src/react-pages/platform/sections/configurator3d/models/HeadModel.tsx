import React from "react";
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
  return <GLBModel url={url} modelOffset={[-0.01, 0, 0.46]} {...props} />;
}
