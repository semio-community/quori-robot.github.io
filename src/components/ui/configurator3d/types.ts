import type { ReactNode } from "react";

export type ModuleId = string;
export type ConfigurationId = string;

export type Vec3 = [number, number, number];

export const DEFAULT_OFFSCREEN_POSITION: Vec3 = [0, 1000, 0];

export interface ModuleSpecification {
  id: ModuleId;
  name: string;
  model: ReactNode;
  preview?: ReactNode;
  previewImage?: string;
  /**
   * Optional entry animation position override.
   * When omitted, the module enters from an auto-computed waypoint.
   */
  enterFrom?: Vec3;
  /**
   * Optional exit animation position override.
   * When omitted, falls back to `enterFrom` when provided, otherwise uses an
   * auto-computed waypoint.
   */
  exitTo?: Vec3;
}

export interface ConfigurationSpecification {
  id: ConfigurationId;
  name: string;
  modulePositions: Partial<Record<ModuleId, Vec3>>;
}

export type ConfigurationEntry = {
  id: ConfigurationId;
  cfg: ConfigurationSpecification;
};

export interface Configurator3DProps {
  modules?: Record<ModuleId, ModuleSpecification>;
  configurations: Record<ConfigurationId, ConfigurationSpecification>;
  initialConfigurationId?: ConfigurationId;
  offscreenPosition?: Vec3;
  className?: string;
  worldOffset?: Vec3;
  /**
   * Sync the active configuration to a URL search param and read it on mount.
   * Useful for shareable links like `/features?config=base-torso-speaker`.
   */
  urlSync?: boolean;
  /**
   * Query param name to use when `urlSync` is enabled.
   */
  urlParam?: string;
  /**
   * History mode used when writing the URL on configuration changes.
   */
  urlHistoryMode?: "replace" | "push";
}
