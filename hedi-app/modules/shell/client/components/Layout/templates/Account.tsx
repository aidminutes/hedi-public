import { Column, Grid, Row } from "carbon-components-react";
import { IAccountLayout } from "../types/IAccountLayout";
import { IWithGroupClass } from "../types/IWithGroupClass";

export const Account: React.FC<IAccountLayout & IWithGroupClass & {}> = ({
  children,
  groupClass,
}) => (
  <>
    <Grid className={`${groupClass}__grid`}>
      <Row className="hedi--account">
        <Column lg={4} md={0} sm={0} />
        <Column lg={8} md={8} sm={4}>
          {children && <div className={groupClass}>{children}</div>}
        </Column>
        <Column lg={4} md={0} sm={0} />
      </Row>
    </Grid>
  </>
);
