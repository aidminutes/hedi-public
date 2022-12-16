import { IPage } from "@/modules/common/types";
import { IGlossaryKeyGroup } from ".";

export interface IGlossaryViewDefinition extends IPage {
  glossaryKeyGroups: IGlossaryKeyGroup[];
}
