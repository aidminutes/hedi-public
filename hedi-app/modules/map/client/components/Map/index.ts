import { IMapProps } from "@/modules/map/types";
import dynamic from "next/dynamic";

export const Map = dynamic<IMapProps>(() => import("./Map"), {
  ssr: false,
});
