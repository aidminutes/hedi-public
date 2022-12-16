import React from "react";
import NextImage from "next/image";

import { IImageProps, transformImage} from "./transformImage";
export const Image = (props: IImageProps) => {
  const data = transformImage(props)

  return <NextImage {...data} />
}