import { IServerCache } from "../../../server/ServerCache";
import { IRouteTransformSet } from "../../types";

export interface IRouteCache extends IServerCache {
  data: IRouteTransformSet;
  updateFn: () => Promise<IRouteTransformSet>;
}
