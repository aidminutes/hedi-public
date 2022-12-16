import { TagList } from "@/modules/common/client/components";
import { Tile } from "carbon-components-react";
import { transformServiceGroup } from "./transformServiceGroup";
import { BabyOnHand } from "@/modules/svg";

import { IServiceGroupProps } from "./IServiceGroupProps";

export const ServiceGroup = (props: IServiceGroupProps) => {
  const { headline, services } = transformServiceGroup(props);
  if (services) {
    return (
      <section className="hedi--profile-services hedi--profile--tile">
        <Tile>
          <BabyOnHand />
          <TagList tags={services} headline={headline}></TagList>
        </Tile>
      </section>
    );
  } else return null;
};
