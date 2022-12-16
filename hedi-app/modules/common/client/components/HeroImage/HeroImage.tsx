import React from "react";
import { Grid } from "carbon-components-react";
import { Image, IImageProps } from "@/modules/components";
import { transformHeroImage } from "./transformHeroImage";
export const HeroImage = (props: IImageProps) => {
  const {
    color,
    image,
    objectFit,
    objectPosition,
    layout,
  } = transformHeroImage(props);
  return (
    <div style={{ backgroundColor: color }}>
      <Grid className="hedi--grid__no-padding">
        <div className="hedi--hero-image">
          <Image
            className="hedi--hero-image__image"
            layout={layout}
            objectFit={objectFit}
            objectPosition={objectPosition}
            {...image}
            priority // NOTE: this can block the loading of the page if the image is too big or the connection too slow
          />
        </div>
      </Grid>
    </div>
  );
};
