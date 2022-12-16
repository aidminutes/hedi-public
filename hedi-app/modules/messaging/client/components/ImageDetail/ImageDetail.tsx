import { Button } from "@/modules/components";
import { Close32 } from "@carbon/icons-react";
import { IImageDetail } from "./types";

export const ImageDetail = (props: IImageDetail) => {
  const { imageUrl, closeButton, close } = props;

  return (
    <div className={`hedi--msg--image-detail`} onClick={close}>
      <Button
        {...closeButton}
        onClick={close}
        tooltipPosition={"bottom"}
        className="hedi--msg-image-detail-overlay--close"
        hasIconOnly
        renderIcon={Close32}
      />
      <img
        src={imageUrl ?? ""}
        alt=""
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
      />
    </div>
  );
};
