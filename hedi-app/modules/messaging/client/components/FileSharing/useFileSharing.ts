import { RefObject, useEffect, useState } from "react";

export const useFileSharing = (props: {
  imageInput: RefObject<HTMLInputElement>;
  fileInput: RefObject<HTMLInputElement>;
  createSmallImage: (
    src: string,
    index: number,
    onDelete: () => void,
    activeImageIndex: number,
    setActiveImageIndex: (index: number) => void
  ) => JSX.Element;
  setShowFileSharing: (show: boolean) => void;
}) => {
  const { imageInput, fileInput, createSmallImage, setShowFileSharing } = props;
  const [blobs, setBlobs] = useState<Blob[]>();
  const [showFileOverlay, setFileOverlay] = useState(false);
  const [images, setImages] = useState<File[]>();
  const [files, setFiles] = useState<File[]>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imagesToRender, setImagesToRender] = useState<JSX.Element[]>();

  //imageInput
  useEffect(() => {
    imageInput?.current?.addEventListener("change", e => {
      if (imageInput?.current?.files) {
        setFileOverlay(true);
        setImages([
          ...(images || []),
          ...Array.from(imageInput?.current?.files),
        ]);
      }
    });
    return () => {
      imageInput?.current?.removeEventListener("onChange", () => {});
    };
  }, [imageInput, images]);

  //FileInput
  useEffect(() => {
    fileInput?.current?.addEventListener("change", _ => {
      if (fileInput?.current?.files) {
        setFileOverlay(true);
        setFiles([...(files || []), ...Array.from(fileInput?.current?.files)]);
      }
    });
    return () => {
      fileInput?.current?.removeEventListener("onChange", () => {});
    };
  }, [fileInput, files]);

  useEffect(() => {
    if (images) {
      const res = images.map((image, index) => {
        const src = URL.createObjectURL(image);
        return createSmallImage(
          src,
          index,
          () => {
            if (images.length > 1) {
              images.splice(index, 1);
              setImages([...images]);
            } else {
              images.splice(index, 1);
              setImages([...images]);
              setShowFileSharing(false);
              setFileOverlay(false);
            }
          },
          activeImageIndex,
          setActiveImageIndex
        );
      });
      setImagesToRender(res);
    }
  }, [images, activeImageIndex, setActiveImageIndex]);

  useEffect(() => {
    if (files) {
      const res = files.map((file, index) => {
        const src = "/images/paper.png";

        return createSmallImage(
          src,
          index,
          () => {
            if (files.length > 1) {
              files.splice(index, 1);
              setFiles([...files]);
            } else {
              files.splice(index, 1);
              setFiles([...files]);
              setShowFileSharing(false);
              setFileOverlay(false);
            }
          },
          activeImageIndex,
          setActiveImageIndex
        );
      });
      setImagesToRender(res);
    }
  }, [files, activeImageIndex]);

  useEffect(() => {
    if (blobs) {
      let res = blobs.map((blob, index) => {
        return createSmallImage(
          URL.createObjectURL(blob),
          index,
          () => {
            if (blobs.length > 1) {
              blobs.splice(index, 1);
              setBlobs([...blobs]);
            } else {
              blobs.splice(index, 1);
              setBlobs([...blobs]);
              setShowFileSharing(false);
              setFileOverlay(false);
            }
          },
          activeImageIndex,
          setActiveImageIndex
        );
      });
      setImagesToRender(res);
    }
  }, [blobs, activeImageIndex]);

  return {
    showFileOverlay,
    images,
    files,
    imagesToRender,
    blobs,
    setFileOverlay,
    setBlobs,
    activeImageIndex,
  };
};
