import React, { createContext, useContext } from "react";

export const CanvasVisibilityContext = createContext(true);

export function useCanvasVisibility() {
  return useContext(CanvasVisibilityContext);
}
