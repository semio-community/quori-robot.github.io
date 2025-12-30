import React from "react";
import GLBModel from "./GLBModel";

export interface ArmsModelProps extends React.ComponentProps<"group"> {
  /**
   * Public URL to the GLB asset.
   */
  url?: string;
}

export default function ArmsModel({
  url = "/configurations/models/Arms.glb",
  ...props
}: ArmsModelProps) {
  return <GLBModel url={url} modelOffset={[0, 0, 0.7]} {...props} />;
}
