import { AssertClientSide } from "@/modules/common/utils";
import { useEffect, useState } from "react";
import { Rect } from "./types";

export const useImageUpload = (
  previewContainerRef: React.RefObject<HTMLDivElement>,
  cropboxRef: React.RefObject<HTMLDivElement>,
  ratio?: number
) => {
  const [isCropBoxPositioned, setIsCropBoxPositioned] = useState(false);
  const [cropboxRect, setCropboxRect] = useState<Rect>({
    x: 50,
    y: 50,
    width: 50,
    height: 50,
  });

  useEffect(() => {
    AssertClientSide() &&
      window.addEventListener("resize", () => {
        if (!previewContainerRef.current || !cropboxRef.current) return;
        const {
          width: containerWidth,
          height: containerHeight,
          left: containerLeft,
          top: containerTop,
        } = previewContainerRef.current.getBoundingClientRect();
        let {
          width: cropWidth,
          height: cropHeight,
          left: cropLeft,
          top: cropTop,
        } = cropboxRef.current.getBoundingClientRect();
        cropLeft -= containerLeft;
        cropTop -= containerTop;

        if (
          !(
            cropLeft + cropWidth > containerWidth ||
            cropTop + cropHeight > containerHeight
          )
        )
          return;
        if (cropLeft + cropWidth > containerWidth)
          cropLeft = containerWidth - cropWidth;
        if (cropTop + cropHeight > containerHeight)
          cropTop = containerHeight - cropHeight;
        if (cropLeft < 0 || cropTop < 0) {
          positionCropboxInCenter();
        } else {
          setCropboxRect({
            width: cropWidth,
            height: cropHeight,
            x: cropLeft,
            y: cropTop,
          });
        }
      });
  }, []);

  const positionCropboxInCenter = () => {
    if (!previewContainerRef.current) return;
    const {
      width,
      height,
    } = previewContainerRef.current.getBoundingClientRect();
    let newHeight = 0,
      newWidth = 0;
    if (width > height) {
      newHeight = height / 4;
      newWidth = newHeight * (ratio ?? 1);
    } else {
      newWidth = width / 4;
      newHeight = newWidth / (ratio ?? 1);
    }
    setCropboxRect({
      width: newWidth,
      height: newHeight,
      x: width / 2 - newWidth / 2,
      y: height / 2 - newHeight / 2,
    });
  };

  const handleImageOnLoad = () => {
    if (!isCropBoxPositioned && previewContainerRef.current) {
      positionCropboxInCenter();
      setIsCropBoxPositioned(true);
    }
  };
  return { cropboxRect, handleImageOnLoad };
};
