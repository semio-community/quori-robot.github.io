"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/react-pages/features/sections/configurator3d/spec.tsx
var spec_exports = {};
__export(spec_exports, {
  configurator3DConfigurations: () => configurator3DConfigurations,
  configurator3DInitialConfigurationId: () => configurator3DInitialConfigurationId,
  configurator3DModules: () => configurator3DModules
});
module.exports = __toCommonJS(spec_exports);
var import_react10 = __toESM(require("react"));

// src/react-pages/features/sections/configurator3d/icons.tsx
var import_react = __toESM(require("react"));
function HeadIcon(props) {
  return /* @__PURE__ */ import_react.default.createElement(
    "svg",
    {
      width: "100%",
      height: "100%",
      viewBox: "0 0 24 24",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5
      },
      ...props
    },
    /* @__PURE__ */ import_react.default.createElement("g", { transform: "matrix(1.202934,0.278199,-0.257259,1.112386,0.898882,-4.860649)" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M14,13.326C14,14.802 12.892,16 11.527,16L8.473,16C7.108,16 6,14.802 6,13.326C6,11.85 7.108,10.652 8.473,10.652L11.527,10.652C12.892,10.652 14,11.85 14,13.326ZM7.139,13.871C7.216,13.711 7.575,13.599 8.004,13.611C8.37,13.622 8.654,13.918 8.808,13.852C8.961,13.787 8.927,13.441 8.923,13.22C8.91,12.523 8.471,11.966 7.942,11.978C7.413,11.989 6.995,12.565 7.008,13.262C7.012,13.476 7.062,14.031 7.139,13.871ZM12.344,13.929C12.419,14.09 12.477,13.535 12.484,13.321C12.506,12.625 12.095,12.043 11.567,12.023C11.038,12.003 10.591,12.553 10.569,13.25C10.562,13.471 10.524,13.816 10.676,13.884C10.829,13.951 11.116,13.66 11.483,13.655C11.912,13.649 12.27,13.768 12.344,13.929Z",
        style: { fillOpacity: 0.5, fill: "currentColor" }
      }
    )),
    /* @__PURE__ */ import_react.default.createElement("g", { transform: "matrix(0.818182,0,0,1.052632,3.272727,-1.157895)" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M12.5,7.678L12.5,4.341C12.5,3.601 13.273,3 14.225,3L16.275,3C17.227,3 18,3.601 18,4.341L18,9.508",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5
        }
      }
    )),
    /* @__PURE__ */ import_react.default.createElement("g", { transform: "matrix(0.818182,0,0,1.052632,3.272727,-1.157895)" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M18,17.368L18,20.659C18,21.399 17.227,22 16.275,22L14.225,22C13.273,22 12.5,21.399 12.5,20.659L12.5,19.643",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5
        }
      }
    )),
    /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M18.392,10.865C18.69,10.716 19.364,10.283 19.423,10.616C19.535,11.243 19.631,13.492 19.364,14C18.886,14.454 18.93,14.374 18.93,14.374",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5
        }
      }
    ),
    /* @__PURE__ */ import_react.default.createElement("g", { transform: "matrix(0.881117,0,0,0.855012,1.141186,1.862209)" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M5.721,8.026C4.465,8.608 3.454,15.855 5,16.518C7.087,17.412 12.833,18.42 15,18C16.636,17.683 17.883,15.465 18,14C18.117,12.535 17.287,10 15.702,9.208C13.702,8.208 7.505,6.894 5.721,8.026Z",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5
        }
      }
    ))
  );
}
function TorsoIcon(props) {
  return /* @__PURE__ */ import_react.default.createElement(
    "svg",
    {
      width: "100%",
      height: "100%",
      viewBox: "0 0 24 24",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5
      },
      ...props
    },
    /* @__PURE__ */ import_react.default.createElement("g", { transform: "matrix(1,0,0,1,-3.75,0)" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M18,3.125L18,20.875C18,21.496 17.496,22 16.875,22L14.625,22C14.004,22 13.5,21.496 13.5,20.875L13.5,3.125C13.5,2.504 14.004,2 14.625,2L16.875,2C17.496,2 18,2.504 18,3.125Z",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5
        }
      }
    ))
  );
}
function BaseIcon(props) {
  return /* @__PURE__ */ import_react.default.createElement(
    "svg",
    {
      width: "100%",
      height: "100%",
      viewBox: "0 0 24 24",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5
      },
      ...props
    },
    /* @__PURE__ */ import_react.default.createElement("g", { transform: "matrix(0.922704,0,0,0.922704,1.047909,0.850636)" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M6.536,5C6.05,7.403 5.274,15.227 7.087,16.42C8.9,17.613 11.943,18.339 16.355,16.117C18.31,14.623 18.134,14.35 18.283,12.958C18.513,10.658 19.333,4.833 19,4C18.499,2.691 12.167,1.833 10,2C8.59,2.108 6.866,3.366 6.536,5Z",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5
        }
      }
    )),
    /* @__PURE__ */ import_react.default.createElement("g", { transform: "matrix(1,0,0,1,0,-13.859909)" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M7.443,18.407C9.078,20.645 11.692,19.061 12.2,20.127C13.55,22.962 14.983,26.47 17.511,26.537",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeOpacity: 0.5,
          strokeWidth: 1.5
        }
      }
    )),
    /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M5.007,15.054C4.591,16.828 5.515,19.364 6.298,20.189C8.064,22.183 13.916,22.443 17.42,20.636C18.746,19.952 19.539,16.089 19.494,14.563",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5
        }
      }
    )
  );
}
function SpeakerIcon(props) {
  return /* @__PURE__ */ import_react.default.createElement(
    "svg",
    {
      width: "100%",
      height: "100%",
      viewBox: "0 0 24 24",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5
      },
      ...props
    },
    /* @__PURE__ */ import_react.default.createElement("g", { transform: "matrix(1,0,0,1,0,0.5)" }, /* @__PURE__ */ import_react.default.createElement(
      "ellipse",
      {
        cx: "12",
        cy: "9",
        rx: "7",
        ry: "3",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5
        }
      }
    )),
    /* @__PURE__ */ import_react.default.createElement("g", { transform: "matrix(1,0,0,1,0,5.5)" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M19,7L19,9C19,10.656 15.863,12 12,12C8.137,12 5,10.656 5,9L5,7",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5
        }
      }
    ))
  );
}
function ChestIcon(props) {
  return /* @__PURE__ */ import_react.default.createElement(
    "svg",
    {
      width: "100%",
      height: "100%",
      viewBox: "0 0 24 24",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5
      },
      ...props
    },
    /* @__PURE__ */ import_react.default.createElement("g", { transform: "matrix(1.263648,0,0,1.263648,-3.279157,-3.317306)" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M9,5C7.042,7.048 6.737,17.001 8.837,19.2C10.261,20.691 14.023,19.58 15.221,17.902C15.612,16.808 15.283,7.994 14.283,5.911C13.547,4.379 10.174,3.771 9,5Z",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.19
        }
      }
    )),
    /* @__PURE__ */ import_react.default.createElement("g", { transform: "matrix(1.263648,0,0,1.263648,-5.732733,-6.885591)" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M18.392,10.865C18.69,10.716 19.364,10.283 19.423,10.616C19.535,11.243 19.631,13.492 19.364,14C18.886,14.454 18.93,14.374 18.93,14.374",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.19
        }
      }
    ))
  );
}
function ArmsIcon(props) {
  return /* @__PURE__ */ import_react.default.createElement(
    "svg",
    {
      width: "100%",
      height: "100%",
      viewBox: "0 0 24 24",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5
      },
      ...props
    },
    /* @__PURE__ */ import_react.default.createElement("g", { transform: "matrix(1,0,0,1,0,-0.785357)" }, /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M6.061,4C7.248,2.918 8.108,4.404 9,4C12.522,2.404 14,5 14,5L14.95,5.616C14.95,5.616 16.227,4.462 16.961,5.498C17.95,6.894 16.379,7.587 16.379,7.587L16.917,11.055C17.566,11.576 17.696,12.243 17.208,13.085C18.288,14.716 19.264,20.431 18.231,21.828C17.146,23.026 15.917,19.787 15.574,18.637C15.244,17.533 14.883,13.328 14.883,13.328C14.059,12.655 14.076,11.921 14.697,11.144C14.697,11.144 14.569,9.251 14,8C13.812,7.587 11.75,6.878 11.75,6.878C11.409,6.28 10.859,6.097 10.048,6.431C10.048,6.431 8.381,6.262 8.184,6.377L8.123,9.146C8.499,9.903 8.41,10.595 7.999,11.242C8.545,11.95 7.939,18.038 7,18C6.058,17.962 5.299,16.599 5.236,15.658C5.192,14.999 5.884,11.17 5.884,11.17C5.46,10.496 5.434,9.794 5.9,9.058L6.145,6.077C6.145,6.077 5.252,4.745 6.061,4Z",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5
        }
      }
    ))
  );
}
function StandIcon(props) {
  return /* @__PURE__ */ import_react.default.createElement(
    "svg",
    {
      width: "100%",
      height: "100%",
      viewBox: "0 0 24 24",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5
      },
      ...props
    },
    /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M14.25,3.125L14.25,16.875C14.25,17.496 13.746,18 13.125,18L10.875,18C10.254,18 9.75,17.496 9.75,16.875L9.75,3.125C9.75,2.504 10.254,2 10.875,2L13.125,2C13.746,2 14.25,2.504 14.25,3.125Z",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5
        }
      }
    ),
    /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M16.5,13C17.742,13 18.45,14 18.75,15.25L19.75,19.75C19.75,20.992 18.742,22 17.5,22L6.5,22C5.258,22 4.25,20.992 4.25,19.75L5.25,15.25C5.609,13.89 6.258,13 7.5,13",
        style: {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5
        }
      }
    )
  );
}

// src/react-pages/features/sections/configurator3d/models/HeadModel.tsx
var import_react3 = __toESM(require("react"));
var import_drei2 = require("@react-three/drei");

// src/react-pages/features/sections/configurator3d/models/GLBModel.tsx
var import_react2 = __toESM(require("react"));
var import_drei = require("@react-three/drei");
var import_three = require("three");
function GLBModel({
  url,
  modelOffset,
  modelRotation,
  ...props
}) {
  const gltf = (0, import_drei.useGLTF)(url);
  const scene = (0, import_react2.useMemo)(() => {
    const scene2 = gltf.scene.clone(true);
    scene2.traverse((obj) => {
      const mesh = obj;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    return scene2;
  }, [gltf.scene]);
  return /* @__PURE__ */ import_react2.default.createElement("group", { ...props }, /* @__PURE__ */ import_react2.default.createElement("group", { rotation: modelRotation }, /* @__PURE__ */ import_react2.default.createElement("group", { position: modelOffset }, /* @__PURE__ */ import_react2.default.createElement("primitive", { object: scene }))));
}

// src/react-pages/features/sections/configurator3d/models/HeadModel.tsx
function HeadModel({
  url = "/configurations/Head.glb",
  ...props
}) {
  return /* @__PURE__ */ import_react3.default.createElement(GLBModel, { url, modelOffset: [-0.03, 0, 0.7], ...props });
}
if (typeof window !== "undefined") {
  import_drei2.useGLTF.preload("/configurations/Head.glb");
}

// src/react-pages/features/sections/configurator3d/models/ArmsModel.tsx
var import_react4 = __toESM(require("react"));
var import_drei3 = require("@react-three/drei");
function ArmsModel({
  url = "/configurations/Arms.glb",
  ...props
}) {
  return /* @__PURE__ */ import_react4.default.createElement(GLBModel, { url, modelOffset: [0, 0, 0.7], ...props });
}
if (typeof window !== "undefined") {
  import_drei3.useGLTF.preload("/configurations/Arms.glb");
}

// src/react-pages/features/sections/configurator3d/models/TorsoModel.tsx
var import_react5 = __toESM(require("react"));
var import_drei4 = require("@react-three/drei");
function TorsoModel({
  url = "/configurations/Torso.glb",
  ...props
}) {
  return /* @__PURE__ */ import_react5.default.createElement(GLBModel, { url, modelOffset: [0, 0, 0.5], ...props });
}
if (typeof window !== "undefined") {
  import_drei4.useGLTF.preload("/configurations/Torso.glb");
}

// src/react-pages/features/sections/configurator3d/models/BaseModel.tsx
var import_react6 = __toESM(require("react"));
var import_drei5 = require("@react-three/drei");
function BaseModel({
  url = "/configurations/Base.glb",
  ...props
}) {
  return /* @__PURE__ */ import_react6.default.createElement(GLBModel, { url, ...props });
}
if (typeof window !== "undefined") {
  import_drei5.useGLTF.preload("/configurations/Base.glb");
}

// src/react-pages/features/sections/configurator3d/models/ChestPlateModel.tsx
var import_react7 = __toESM(require("react"));
var import_drei6 = require("@react-three/drei");
function ChestPlateModel({
  url = "/configurations/ChestPlate.glb",
  ...props
}) {
  return /* @__PURE__ */ import_react7.default.createElement(GLBModel, { url, ...props });
}
if (typeof window !== "undefined") {
  import_drei6.useGLTF.preload("/configurations/ChestPlate.glb");
}

// src/react-pages/features/sections/configurator3d/models/SmartSpeakerModel.tsx
var import_react8 = __toESM(require("react"));
var import_drei7 = require("@react-three/drei");
function SmartSpeakerModel({
  url = "/configurations/SmartSpeaker.glb",
  ...props
}) {
  return /* @__PURE__ */ import_react8.default.createElement(GLBModel, { url, ...props, modelOffset: [0, 0, 0.47] });
}
if (typeof window !== "undefined") {
  import_drei7.useGLTF.preload("/configurations/SmartSpeaker.glb");
}

// src/react-pages/features/sections/configurator3d/models/StandModel.tsx
var import_react9 = __toESM(require("react"));
var import_drei8 = require("@react-three/drei");
function StandModel({
  url = "/configurations/Stand.glb",
  ...props
}) {
  return /* @__PURE__ */ import_react9.default.createElement(GLBModel, { url, modelOffset: [0, 0, 0.7], ...props });
}
if (typeof window !== "undefined") {
  import_drei8.useGLTF.preload("/configurations/Stand.glb");
}

// src/react-pages/features/sections/configurator3d/spec.tsx
var BASE_HEIGHT = 0.5;
var STAND_HEIGHT = 0.3;
var STAND_Y_OFFSET = (BASE_HEIGHT - STAND_HEIGHT) / 2;
var configurator3DInitialConfigurationId = "base-torso-chest-arms-head";
var configurator3DModules = {
  speaker: {
    id: "speaker",
    name: "Speaker",
    preview: /* @__PURE__ */ import_react10.default.createElement(SpeakerIcon, null),
    model: /* @__PURE__ */ import_react10.default.createElement(SmartSpeakerModel, null)
  },
  head: {
    id: "head",
    name: "Head",
    preview: /* @__PURE__ */ import_react10.default.createElement(HeadIcon, null),
    model: /* @__PURE__ */ import_react10.default.createElement(HeadModel, null)
  },
  torso: {
    id: "torso",
    name: "Torso",
    preview: /* @__PURE__ */ import_react10.default.createElement(TorsoIcon, null),
    model: /* @__PURE__ */ import_react10.default.createElement(TorsoModel, null)
  },
  chest: {
    id: "chest",
    name: "Chest",
    preview: /* @__PURE__ */ import_react10.default.createElement(ChestIcon, null),
    model: /* @__PURE__ */ import_react10.default.createElement(ChestPlateModel, null)
  },
  arms: {
    id: "arms",
    name: "Arms",
    preview: /* @__PURE__ */ import_react10.default.createElement(ArmsIcon, null),
    model: /* @__PURE__ */ import_react10.default.createElement(ArmsModel, null)
  },
  base: {
    id: "base",
    name: "Mobile Base",
    preview: /* @__PURE__ */ import_react10.default.createElement(BaseIcon, null),
    model: /* @__PURE__ */ import_react10.default.createElement(BaseModel, null)
  },
  stand: {
    id: "stand",
    name: "Stand",
    preview: /* @__PURE__ */ import_react10.default.createElement(StandIcon, null),
    model: /* @__PURE__ */ import_react10.default.createElement(StandModel, null)
  }
};
var baseConfigurations = {
  base: {
    id: "base",
    name: "Base Only",
    modulePositions: {
      base: [0, -0.75, 0]
    }
  },
  "base-speaker": {
    id: "base-speaker",
    name: "Base + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      speaker: [0, 0.95, 0]
    }
  },
  "base-head": {
    id: "base-head",
    name: "Base + Head",
    modulePositions: {
      base: [0, -0.75, 0],
      head: [0, 1.05, 0]
    }
  },
  "base-torso": {
    id: "base-torso",
    name: "Base + Torso",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0]
    }
  },
  "base-head-speaker": {
    id: "base-head-speaker",
    name: "Base + Head + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      head: [0, 1.05, 0],
      speaker: [0, 1.89, 0]
    }
  },
  "base-torso-head": {
    id: "base-torso-head",
    name: "Base + Torso + Head",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0]
    }
  },
  "base-torso-arms-head": {
    id: "base-torso-arms-head",
    name: "Base + Torso + Arms + Head",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      arms: [0, 1.15, -0.25]
    }
  },
  "base-torso-speaker": {
    id: "base-torso-speaker",
    name: "Base + Torso + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      speaker: [0, 2.05, 0]
    }
  },
  "base-torso-chest-speaker": {
    id: "base-torso-chest-speaker",
    name: "Base + Torso + Chest + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      speaker: [0, 2.05, 0],
      chest: [0, 1.2, 0.57]
    }
  },
  "base-torso-chest-arms-speaker": {
    id: "base-torso-chest-arms-speaker",
    name: "Base + Torso + Chest + Arms + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      speaker: [0, 2.05, 0],
      arms: [0, 1.15, -0.25],
      chest: [0, 1.2, 0.57]
    }
  },
  "base-torso-arms-speaker": {
    id: "base-torso-arms-speaker",
    name: "Base + Torso + Arms + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      speaker: [0, 2.05, 0],
      arms: [0, 1.15, -0.25]
    }
  },
  "base-torso-head-speaker": {
    id: "base-torso-head-speaker",
    name: "Base + Torso + Head + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      speaker: [0, 3.01, 0]
    }
  },
  "base-torso-arms-head-speaker": {
    id: "base-torso-arms-head-speaker",
    name: "Base + Torso + Arms + Head + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      arms: [0, 1.15, -0.25],
      speaker: [0, 3.01, 0]
    }
  },
  "base-torso-chest-head": {
    id: "base-torso-chest-head",
    name: "Base + Torso + Chest + Head",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      chest: [0, 1.2, 0.57]
    }
  },
  "base-torso-chest-head-speaker": {
    id: "base-torso-chest-head-speaker",
    name: "Base + Torso + Chest + Head + Speaker",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      chest: [0, 1.2, 0.57],
      speaker: [0, 3.01, 0]
    }
  },
  "base-torso-chest-arms-head": {
    id: "base-torso-chest-arms-head",
    name: "Full Configuration",
    modulePositions: {
      base: [0, -0.75, 0],
      torso: [0, 0.9, 0],
      head: [0, 2.19, 0],
      chest: [0, 1.2, 0.57],
      arms: [0, 1.15, -0.25]
    }
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
      speaker: [0, 3.01, 0]
    }
  }
};
function withStandSwap(cfg) {
  const basePos = cfg.modulePositions.base;
  if (!basePos) return null;
  const standPos = [
    basePos[0],
    basePos[1] + STAND_Y_OFFSET,
    basePos[2]
  ];
  const id = cfg.id.startsWith("base") ? cfg.id.replace("base", "stand") : `stand-${cfg.id}`;
  let name = cfg.name.replace(/^Base\b/, "Stand");
  if (name === cfg.name) {
    name = `${cfg.name} (Stand)`;
  }
  const modulePositions = { ...cfg.modulePositions };
  delete modulePositions.base;
  modulePositions.stand = standPos;
  return { id, name, modulePositions };
}
var standConfigurations = Object.fromEntries(
  Object.values(baseConfigurations).map((cfg) => withStandSwap(cfg)).filter(Boolean).map((cfg) => [cfg.id, cfg])
);
var configurator3DConfigurations = {
  ...baseConfigurations,
  ...standConfigurations
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configurator3DConfigurations,
  configurator3DInitialConfigurationId,
  configurator3DModules
});
