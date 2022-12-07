import { ReactChild } from "react";
import { IActionBarAction } from "./IActionBarAction";

export interface IActionBarProps {
  actions?: IActionBarAction[];
  children?: ReactChild;
}
