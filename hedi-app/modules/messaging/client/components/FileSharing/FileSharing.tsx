import { Button } from "@/modules/components";
import {
  Add24,
  Camera16,
  Close16,
  Close32,
  CopyFile16,
  Image16,
  Send24,
} from "@carbon/icons-react";
import { Column } from "carbon-components-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMatrixClient } from "../../context/MatrixClientContext";
import { IFileSharing } from "./types";
import { useFileSharing } from "./useFileSharing";

type ShareBar = Pick<
  IFileSharing,
  | "setShowFileSharing"
  | "takePictureButton"
  | "selectPictureButton"
  | "selectFileButton"
  | "closeButton"
  | "addImageButton"
> & {
  startStreaming: () => void;
  captureSnapshot: () => void;
  selectPicture: () => void;
  selectFile: () => void;
  onSend: () => void;
};
const ShareBar = (props: ShareBar) => {
  const {
    startStreaming,
    selectPicture,
    selectFile,
    setShowFileSharing,
    takePictureButton,
    selectPictureButton,
    selectFileButton,
    closeButton,
    addImageButton,
  } = props;
  return (
    <div className="hedi--msg-share-bar">
      <Button
        onClick={() => {
          startStreaming();
        }}
        buttonKind="primary"
        hasIconOnly
        iconDescription={takePictureButton.text}
        renderIcon={Camera16}
      />
      <Button
        onClick={() => {
          selectPicture();
        }}
        buttonKind="primary"
        hasIconOnly
        iconDescription={selectPictureButton.text}
        renderIcon={Image16}
      />
      <Button
        onClick={() => {
          selectFile();
        }}
        buttonKind="primary"
        hasIconOnly
        iconDescription={selectFileButton.text}
        renderIcon={CopyFile16}
      />
      <Button
        onClick={() => setShowFileSharing(false)}
        buttonKind="tertiary"
        hasIconOnly
        iconDescription={closeButton.text}
        renderIcon={Close16}
      />
    </div>
  );
};

const useFileSharingLogic = () => {
  const imageInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const streamRef = useRef<HTMLVideoElement>(null);
  const captureRef = useRef<HTMLCanvasElement>(null);
  return { imageInput, fileInput, streamRef, captureRef };
};

const createSmallImage = (
  src: string,
  index: number,
  onDelete: () => void,
  activeImageIndex: number,
  setActiveImageIndex: (index: number) => void
) => {
  return (
    <div className="smallImage">
      <div
        className={`hedi--msg-file-select-wrapper ${
          activeImageIndex === index ? "selected" : ""
        }`}
        onClick={() => setActiveImageIndex(index)}>
        <Close32 onClick={onDelete} />
      </div>
      <img
        src={src}
        alt="e"
        className={
          activeImageIndex === index ? "hedi--msg-file-selected-thumbnail" : ""
        }
      />
    </div>
  );
};

export const FileSharing = (props: IFileSharing) => {
  const {
    roomId,
    setShowFileSharing,
    takePictureButton: takePictureLabel,
    selectPictureButton,
    selectFileButton,
    closeButton,
    addImageButton,
  } = props;
  const {
    imageInput,
    fileInput,
    captureRef,
    streamRef,
  } = useFileSharingLogic();

  const {
    showFileOverlay,
    imagesToRender,
    activeImageIndex,
    images,
    files,
    blobs,
    setFileOverlay,
    setBlobs,
  } = useFileSharing({
    imageInput,
    fileInput,
    createSmallImage,
    setShowFileSharing,
  });

  // The video stream
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const stopStreamingRef = useRef<(() => void) | null>(null);

  const client = useMatrixClient();

  const selectPicture = () => {
    window.addEventListener("focus", closeFileSharing);

    imageInput?.current?.click();
  };

  const selectFile = () => {
    window.addEventListener("focus", closeFileSharing);
    fileInput?.current?.click();
  };

  const closeFileSharing = useMemo(() => {
    return () => {
      window.removeEventListener("focus", closeFileSharing);

      setTimeout(() => {
        if (
          (imageInput.current?.files?.length ?? 0) < 1 &&
          (fileInput.current?.files?.length ?? 0) < 1
        ) {
          setShowFileSharing(false);
        }
      }, 500);
    };
  }, [imageInput, fileInput]);

  const onSend = () => {
    if (images) {
      for (let i = 0; i <= images.length; i++) {
        const image = images[i];
        if (image) {
          client
            .uploadContent(image, { onlyContentUri: true })
            .then(e => {
              client.sendImageMessage(roomId, e, {}, "", () => null);
            })
            .catch(err => console.error("err", err));
        }
      }
    } else if (files) {
      for (let i = 0; i <= files.length; i++) {
        const file = files[i];
        if (file) {
          client
            .uploadContent(file, { onlyContentUri: true })
            .then(e => {
              client
                .sendMessage(
                  roomId,
                  {
                    body: file.name,
                    filename: file.name,
                    msgtype: "m.file",
                    url: e,
                  },
                  file.name
                )
                .then(e => {
                  console.error("send file", e);
                });
            })
            .catch(err => console.error("err", err));
        }
      }
    } else if (blobs) {
      blobs.map(blob => {
        client
          .uploadContent(blob, { onlyContentUri: true })
          .then(e => {
            client.sendImageMessage(roomId, e, {}, "", () => null);
          })
          .catch(err => console.error("err", err));
      });
    }
    setShowFileSharing(false);
  };

  // Start Streaming
  const startStreaming = useCallback(() => {
    setFileOverlay(true);
    let mediaSupport = "mediaDevices" in navigator;
    if (mediaSupport && !cameraStream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (mediaStream) {
          setCameraStream(mediaStream);
          if (streamRef.current) {
            streamRef.current.srcObject = mediaStream;
            streamRef.current.play().catch(_ => null);
          }
        })
        .catch(function (err) {
          console.error("Unable to access camera: " + err);
        });
    } else {
      /*TODO add actual strings*/
      alert("Your browser does not support media devices.");
      return;
    }
  }, [streamRef, cameraStream]);

  useEffect(() => {
    stopStreamingRef.current = () => {
      if (!!cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());

        if (!!streamRef.current) {
          streamRef.current.load();
        }
        setCameraStream(null);
      }
    };
  }, [stopStreamingRef, cameraStream, streamRef, setCameraStream]);

  // picture to blob for upload
  const dataURItoBlob = (dataURI: any) => {
    let byteString = atob(dataURI.split(",")[1]);
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    let buffer = new ArrayBuffer(byteString.length);
    let data = new DataView(buffer);
    for (let i = 0; i < byteString.length; i++) {
      data.setUint8(i, byteString.charCodeAt(i));
    }
    return new Blob([buffer], { type: mimeString });
  };

  // take picture
  const captureSnapshot = useCallback(() => {
    if (!!cameraStream) {
      if (streamRef.current && captureRef.current) {
        const ctx = captureRef.current.getContext("2d");
        const img = new Image();
        if (ctx) {
          ctx.drawImage(
            streamRef.current,
            0,
            0,
            captureRef.current.width,
            captureRef.current.height
          );
          img.src = captureRef.current.toDataURL("image/png");
          img.width = 240;
          const imageData = dataURItoBlob(
            captureRef.current?.toDataURL("image/png")
          );
          setBlobs([...(blobs ?? []), imageData]);
          stopStreamingRef.current?.();
        }
      }
    }
  }, [streamRef, captureRef, blobs, cameraStream, stopStreamingRef]);

  useEffect(() => {
    return () => {
      stopStreamingRef.current?.();
    };
  }, [stopStreamingRef]);

  return (
    <div className={`hedi--msg--file-sharing`}>
      <input
        ref={imageInput}
        accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG"
        multiple={true}
        type="file"
        name="picture"
        hidden={true}
      />

      <input
        ref={fileInput}
        accept="files/*"
        multiple={true}
        type="file"
        name="files"
        hidden={true}
      />

      {showFileOverlay ? (
        <div className={"hedi--msg-file-overlay"}>
          <Button
            onClick={() => {
              setShowFileSharing(false);
              setFileOverlay(false);
            }}
            buttonKind="tertiary"
            tooltipPosition={"bottom"}
            className="hedi--msg-file-overlay--close"
            hasIconOnly
            iconDescription={closeButton.text}
            renderIcon={Close16}
          />
          {cameraStream ? (
            <div className="hedi--msg-camera-preview">
              <div className="hedi--msg-capture">
                <video ref={streamRef} id="stream" width="320" height="240" />
              </div>

              <canvas
                style={{ display: "none" }}
                id="capture"
                ref={captureRef}
                width="320"
                height="240"
              />

              <div className="hedi--msg-capture-button">
                <Button
                  onClick={() => captureSnapshot()}
                  buttonKind="primary"
                  hasIconOnly
                  iconDescription={takePictureLabel.text}
                  renderIcon={Camera16}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="hedi--msg-file-preview">
                <Column>
                  {/*big image */}
                  {(imagesToRender?.length ?? 0) > 0 &&
                    imagesToRender?.[activeImageIndex]}
                  {files?.[activeImageIndex].name && (
                    <div className="filename">
                      <p>{files?.[activeImageIndex].name}</p>
                    </div>
                  )}
                </Column>
              </div>
              <div className="hedi--msg-file-thumbnails-wrapper">
                {/*small images */}
                <div className="hedi--msg-file-thumbnails">
                  <div className="hedi--msg-file-thumbnails-alignment-wrapper">
                    {(imagesToRender?.length ?? 0) > 0 && imagesToRender}
                    {
                      <div className="hedi--msg-file-add-wrapper">
                        <Button
                          buttonKind="tertiary"
                          className="hedi--msg-file-add"
                          hasIconOnly
                          iconDescription={addImageButton.text}
                          renderIcon={Add24}
                          onClick={
                            (images?.length ?? 0) > 0
                              ? selectPicture
                              : (files?.length ?? 0) > 0
                              ? selectFile
                              : startStreaming
                          }
                        />
                      </div>
                    }
                  </div>
                </div>
                <Button
                  onClick={() => onSend()}
                  buttonKind="tertiary"
                  className="hedi--msg-file-overlay--send"
                  hasIconOnly
                  iconDescription={"send"}
                  renderIcon={Send24}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <div
            className="hedi--msg-share-bar-background"
            onClick={() => setShowFileSharing(false)}
          />
          <ShareBar
            startStreaming={startStreaming}
            captureSnapshot={captureSnapshot}
            selectPicture={selectPicture}
            selectFile={selectFile}
            onSend={onSend}
            {...(props as IFileSharing)}
          />
        </>
      )}
    </div>
  );
};
