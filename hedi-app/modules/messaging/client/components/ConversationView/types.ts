import { IPage } from "@/modules/common/types/IPage";
import { IRoomViewDefinition } from "../RoomView/types";

export type IConversationView = Omit<IPage, "components"> &
  IConversationViewDefinition;

export interface IConversationViewDefinition {
  roomViewDefinition: IRoomViewDefinition;
}
