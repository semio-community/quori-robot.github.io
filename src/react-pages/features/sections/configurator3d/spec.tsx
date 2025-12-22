import React from "react";
import type {
  ConfigurationSpecification,
  ModuleSpecification,
} from "@/components/ui/Configurator3D";
import {
  ArmsIcon,
  BaseIcon,
  ChestIcon,
  HeadIcon,
  SpeakerIcon,
  StandIcon,
  TorsoIcon,
} from "./icons";
import HeadModel from "./models/HeadModel";
import ArmsModel from "./models/ArmsModel";
import TorsoModel from "./models/TorsoModel";
import BaseModel from "./models/BaseModel";
import ChestPlateModel from "./models/ChestPlateModel";
import SmartSpeakerModel from "./models/SmartSpeakerModel";
import StandModel from "./models/StandModel";

const BASE_HEIGHT = 0.5;
const STAND_HEIGHT = 0.3;
const STAND_Y_OFFSET = (BASE_HEIGHT - STAND_HEIGHT) / 2; // keep top surface aligned with base configs

export const configurator3DInitialConfigurationId =
  "base-torso-chest-arms-head-speaker";

export const configurator3DModules: Record<string, ModuleSpecification> = {
  speaker: {
    id: "speaker",
    name: "Smart Speaker",
    preview: <SpeakerIcon />,
    model: <SmartSpeakerModel />,
  },
  head: {
    id: "head",
    name: "Head",
    preview: <HeadIcon />,
    model: <HeadModel />,
  },
  torso: {
    id: "torso",
    name: "Torso",
    preview: <TorsoIcon />,
    model: <TorsoModel />,
  },
  chest: {
    id: "chest",
    name: "Chest",
    preview: <ChestIcon />,
    model: <ChestPlateModel />,
  },
  arms: {
    id: "arms",
    name: "Arms",
    preview: <ArmsIcon />,
    model: <ArmsModel />,
    enterFrom: [0, 3.5, -3],
  },
  base: {
    id: "base",
    name: "Mobile Base",
    preview: <BaseIcon />,
    model: <BaseModel />,
    enterFrom: [-3, -0.75, 0],
  },
  stand: {
    id: "stand",
    name: "Stand",
    preview: <StandIcon />,
    model: <StandModel />,
    enterFrom: [3, 0, 0],
  },
};

const baseConfigurations: Record<string, ConfigurationSpecification> = {
  base: {
    id: "base",
    name: "Base Only",
    modulePositions: {
      base: [0, -0.75, 0],
    },
  },
  "base-speaker": {
    id: "base-speaker",
    name: "Base + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      speaker: [0, 0.95, 0],
    },
  },
  "base-head": {
    id: "base-head",
    name: "Base + Head",
    modulePositions: {
      base: [0, -0.75, 0],
      head: [0, 1.05, 0],
    },
  },
  "base-torso": {
    id: "base-torso",
    name: "Base + Torso",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
    },
  },
  "base-head-speaker": {
    id: "base-head-speaker",
    name: "Base + Head + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      head: [0, 1.05, 0],
      speaker: [0, 1.89, 0],
    },
  },
  "base-torso-head": {
    id: "base-torso-head",
    name: "Base + Torso + Head",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
    },
  },
  "base-torso-arms-head": {
    id: "base-torso-arms-head",
    name: "Base + Torso + Arms + Head",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      arms: [0, 1.15, -0.25],
    },
  },
  "base-torso-arms": {
    id: "base-torso-arms",
    name: "Base + Torso + Arms",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      arms: [0, 1.15, -0.25],
    },
  },
  "base-torso-speaker": {
    id: "base-torso-speaker",
    name: "Base + Torso + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      speaker: [0, 2.05, 0],
    },
  },
  "base-torso-chest-speaker": {
    id: "base-torso-chest-speaker",
    name: "Base + Torso + Chest + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      speaker: [0, 2.05, 0],
      chest: [0, 1.2, 0.57],
    },
  },
  "base-torso-chest": {
    id: "base-torso-chest",
    name: "Base + Torso + Chest",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      chest: [0, 1.2, 0.57],
    },
  },
  "base-torso-chest-arms-speaker": {
    id: "base-torso-chest-arms-speaker",
    name: "Base + Torso + Chest + Arms + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      speaker: [0, 2.05, 0],
      arms: [0, 1.15, -0.25],
      chest: [0, 1.2, 0.57],
    },
  },
  "base-torso-arms-speaker": {
    id: "base-torso-arms-speaker",
    name: "Base + Torso + Arms + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      speaker: [0, 2.05, 0],
      arms: [0, 1.15, -0.25],
    },
  },
  "base-torso-head-speaker": {
    id: "base-torso-head-speaker",
    name: "Base + Torso + Head + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      speaker: [0, 3.01, 0],
    },
  },
  "base-torso-arms-head-speaker": {
    id: "base-torso-arms-head-speaker",
    name: "Base + Torso + Arms + Head + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      arms: [0, 1.15, -0.25],
      speaker: [0, 3.01, 0],
    },
  },
  "base-torso-chest-head": {
    id: "base-torso-chest-head",
    name: "Base + Torso + Chest + Head",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      chest: [0, 1.2, 0.57],
    },
  },
  "base-torso-chest-head-speaker": {
    id: "base-torso-chest-head-speaker",
    name: "Base + Torso + Chest + Head + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      chest: [0, 1.2, 0.57],
      speaker: [0, 3.01, 0],
    },
  },
  "base-torso-chest-arms-head": {
    id: "base-torso-chest-arms-head",
    name: "Full Configuration",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      chest: [0, 1.2, 0.57],
      arms: [0, 1.15, -0.25],
    },
  },
  "base-torso-chest-arms-head-speaker": {
    id: "base-torso-chest-arms-head-speaker",
    name: "Full Configuration + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      chest: [0, 1.2, 0.57],
      arms: [0, 1.15, -0.25],
      speaker: [0, 3.01, 0],
    },
  },
};

function withStandSwap(
  cfg: ConfigurationSpecification,
): ConfigurationSpecification | null {
  const basePos = cfg.modulePositions.base;
  if (!basePos) return null;
  const id = cfg.id.startsWith("base")
    ? cfg.id.replace("base", "stand")
    : `stand-${cfg.id}`;
  let name = cfg.name.replace(/^Base\b/, "Stand");
  if (name === cfg.name) {
    name = `${cfg.name} (Stand)`;
  }
  const modulePositions = { ...cfg.modulePositions } as Record<
    string,
    [number, number, number]
  >;
  delete modulePositions.base;
  modulePositions.stand = [0, 0, 0];
  return { id, name, modulePositions };
}

const standConfigurations = Object.fromEntries(
  Object.values(baseConfigurations)
    .map((cfg) => withStandSwap(cfg))
    .filter(Boolean)
    .map((cfg) => [cfg!.id, cfg!]),
);

export const configurator3DConfigurations: Record<
  string,
  ConfigurationSpecification
> = {
  ...baseConfigurations,
  ...standConfigurations,
};
