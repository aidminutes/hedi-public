import {
  filterGroupInstanceByProfession,
  findGroupInstance,
} from "@/modules/components";
import { IPage } from "@/modules/common/types";
import { IPageConfig } from "@/modules/shell/types";
import { IBlankLayout } from "@/modules/shell/client/components/Layout/types/IBlankLayout";

export const getSearchMidwifePage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "SearchMidwife";
  const { components } = content;

  const serviceSelectGroup = findGroupInstance(components, "serviceSelect");
  if (serviceSelectGroup) {
    const filteredServiceSelectGroup = filterGroupInstanceByProfession(
      serviceSelectGroup,
      "profession/hebammegroup"
    );
    serviceSelectGroup.components = filteredServiceSelectGroup.components;
  }
  /*
  const layout: IBlankLayout = {
    kind: "Blank",
  };
  
  const shell: IPageConfig = {
    layout,
  };
*/
  return {
    ...content,
    //  ...shell
  };
};
