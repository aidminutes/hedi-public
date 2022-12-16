import { IImageProps } from "@/modules/components";

export function transformHeroImage(image: IImageProps) {
  const { color, layout, objectFit, objectPosition, width, height } = image;

  const ratio: number = width / height;
  const transformedObjectfit = objectFit || getObjectFitByRatio(ratio);
  const transformedObjectPos =
    objectPosition || getObjectPositionByRatio(ratio);

  return {
    color: color || "transparent",
    image,
    layout: layout || "fill",
    objectFit: transformedObjectfit,
    objectPosition: transformedObjectPos,
  };
}

function getObjectFitByRatio(ratio: number) {
  return ratio > 1.8 ? "cover" : "scale-down";
}
function getObjectPositionByRatio(ratio: number) {
  return ratio > 1.8 ? "top center" : "center";
}
