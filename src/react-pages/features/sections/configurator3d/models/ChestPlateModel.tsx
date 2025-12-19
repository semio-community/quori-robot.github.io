import React from "react";
import GLBModel from "./GLBModel";

export interface ChestPlateModelProps extends React.ComponentProps<"group"> {
  /**
   * Public URL to the GLB asset.
   */
  url?: string;
}

export default function ChestPlateModel({
  url = "/configurations/models/ChestPlate.glb",
  ...props
}: ChestPlateModelProps) {
  return <GLBModel url={url} {...props} />;
}
