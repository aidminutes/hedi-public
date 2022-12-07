import { IGeoJSON } from "./IGeoJSON";
export interface ICoordinatesJSON {
  items: {
    title: string;
    id: string;
    resultType: string;
    localityType: string;
    position: IGeoJSON;
  }[];
}
