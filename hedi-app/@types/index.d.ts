import * as carbonIconsReact from "@carbon/icons-react";

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";

// "@types/carbon__icons-react": "10.31.0", "carbon-icons": "^7.0.7","@carbon/icons-react": "10.36.0",
declare module "@carbon/icons-react" {
  export const SelectWindow24: carbonIconsReact.CarbonIconType;
  export const SearchLocate24: carbonIconsReact.CarbonIconType;
  export * from carbonIconsReact;
}