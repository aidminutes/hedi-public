import { HeroImage } from "@/modules/common/client/components";
import { Column, Grid, Row } from "carbon-components-react";
import { IGridColumnLayout } from "../types/IGridColumnLayout";
import { IWithGroupClass } from "../types/IWithGroupClass";

export const GridColumn: React.FC<IGridColumnLayout & IWithGroupClass & {}> = ({
  headline,
  children,
  groupClass,
  poster,
}) => (
  <>
    {poster && <HeroImage layout="fill" {...poster} />}
    <Grid className={`${groupClass}__grid`}>
      <Row>
        <Column className="hedi--titlegroup">
          <h1>{headline}</h1>
        </Column>
      </Row>
      {children && <div className={groupClass}>{children}</div>}
    </Grid>
  </>
);
