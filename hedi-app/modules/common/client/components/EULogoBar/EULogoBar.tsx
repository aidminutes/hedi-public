import React from "react";
import { IImageComponent, Image } from "@/modules/components";

export interface EULogoBarProps {
  europeForLowerSaxonyLogo: IImageComponent;
  europeanUnionLogo: IImageComponent;
  bfhdLogo?: IImageComponent;
}

export const EULogoBar: React.FC<EULogoBarProps> = ({
  europeanUnionLogo,
  europeForLowerSaxonyLogo,
  bfhdLogo,
}) => {
  return (
    <div className="hedi--eu-logo-bar">
      <div className="hedi--eu-logo-bar__eu-logo">
        <Image
          {...europeanUnionLogo}
          sizes="200px"
          priority
          placeholder="empty"
        />
      </div>
      <div className="hedi--eu-logo-bar__europe-for-lower-saxony-logo">
        <Image
          {...europeForLowerSaxonyLogo}
          sizes="200px"
          priority
          placeholder="empty"
        />
      </div>
      {bfhdLogo && (
        <div className="hedi--eu-logo-bar__bfhd-logo">
          <Image {...bfhdLogo} sizes="200px" priority placeholder="empty" />
        </div>
      )}
    </div>
  );
};
