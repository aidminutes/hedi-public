import React, { ReactNode } from "react";
import {
  Body,
  Image,
  IMenuHeaderComponent,
  isImage,
  isSvg,
  Label,
  Svg,
} from "@/modules/components";
import { Grid, Column, Row } from "carbon-components-react";

export interface MenuHeaderProps {
  header: IMenuHeaderComponent;
  className?: string;
  children?: ReactNode;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({
  header,
  className,
  children,
}) => {
  const imageInstance =
    header.menuHeaderImage && isImage(header.menuHeaderImage)
      ? header.menuHeaderImage
      : null;
  const svgInstance =
    header.menuHeaderImage && isSvg(header.menuHeaderImage)
      ? header.menuHeaderImage
      : null;

  return (
    <div className="hedi--menu-header__wrap">
      <Grid className="hedi--menu-header">
        <Row className="">
          <Column className="" lg={12} md={6}>
            <Row>
              <Column>
                <Label
                  {...{ text: header.menuHeaderTitle, labelKind: "h2" }}
                  className="hedi--menu-header__title"></Label>
              </Column>
            </Row>
            {/* <Row>
            <Column>
            <Body {...{ body: header.menuHeaderDescription }}></Body>
            </Column>
          </Row> */}
          </Column>
          <Column lg={4} md={2} className="hedi--menu-header__image-container">
            <div className="hedi--menu-header__image">
              {imageInstance && <Image {...imageInstance}></Image>}
              {svgInstance && <Svg {...svgInstance}></Svg>}
            </div>
          </Column>
        </Row>
        {children && (
          <Row>
            <Column>{children}</Column>
          </Row>
        )}
      </Grid>
    </div>
  );
};
