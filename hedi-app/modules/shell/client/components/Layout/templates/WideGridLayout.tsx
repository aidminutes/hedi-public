import { Column, Grid, Row } from "carbon-components-react";
import { IWideGridLayout } from "../types/IWideGridLayout";

import { IWithGroupClass } from "../types/IWithGroupClass";

export const WideGridLayout: React.FC<
  IWideGridLayout & IWithGroupClass & {}
> = ({ children, groupClass }) => (
  <>
    <Grid className={`${groupClass}__grid`}>
      <Row className="hedi--widegrid">
        <Column lg={3} md={0} sm={0} />
        <Column lg={10} md={8} sm={4}>
          {children && <div className={groupClass}>{children}</div>}
        </Column>
        <Column lg={3} md={0} sm={0} />
      </Row>
    </Grid>
  </>
);
