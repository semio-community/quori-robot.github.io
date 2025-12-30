import React from "react";
import GLBModel from "./GLBModel";

export interface SmartSpeakerModelProps extends React.ComponentProps<"group"> {
  /**
   * Public URL to the GLB asset.
   */
  url?: string;
}

export default function SmartSpeakerModel({
  url = "/configurations/models/SmartSpeaker.glb",
  ...props
}: SmartSpeakerModelProps) {
  return <GLBModel url={url} {...props} modelOffset={[0, 0, 0.47]} />;
}
