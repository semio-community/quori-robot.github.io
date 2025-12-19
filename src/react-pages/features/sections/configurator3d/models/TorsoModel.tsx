import React from "react";
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
