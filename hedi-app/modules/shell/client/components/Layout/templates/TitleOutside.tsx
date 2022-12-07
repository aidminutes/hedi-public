import { HeroImage } from "@/modules/common/client/components";
import { Grid, Row } from "carbon-components-react";
import { BreadCrumb } from "../../BreadCrumb";
import { ITitleOutsideLayout } from "../types/ITitleOutsideLayout";
import { IWithGroupClass } from "../types/IWithGroupClass";

export const TitleOutside: React.FC<
  ITitleOutsideLayout & IWithGroupClass & {}
> = ({ headline, children, groupClass, breadcrumbs, poster }) => (
  <>
    <HeroImage layout="fill" {...poster} />
    <Grid className={`hedi--page-grid ${groupClass}`}>
      <Row narrow={true} className="hedi--outside-headline">
        <div className="hedi--titlegroup">
          {breadcrumbs && <BreadCrumb {...breadcrumbs} />}
          <h1>{headline}</h1>
        </div>
      </Row>
      {children && <div className={groupClass}>{children}</div>}
    </Grid>
  </>
);
