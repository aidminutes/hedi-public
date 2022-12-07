import { IPage } from "@/modules/common/types/IPage";
import { IBodyComponent, ILabelComponent } from "@/modules/components/types";
import { IRoomListDefinition } from "../../RoomList/types";

export type IRoomsView = Omit<IPage, "components"> & IRoomsViewDefinition;

export interface IRoomsViewDefinition {
  headline: ILabelComponent;
  body: IBodyComponent;
  roomListDefinition: IRoomListDefinition;
}
