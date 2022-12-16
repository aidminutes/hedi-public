import { IGroupComponent } from "@/modules/components";
import React from "react";
import { ProfileCardType } from "../ProfileCard";
import { Image } from "@/modules/components";
import { transformProfileHeaderImage } from "./transformProfileHeaderImage";
export interface IProfileHeaderImageProps {
  profileType: ProfileCardType;
  images: IGroupComponent;
}

export const ProfileHeaderImage = (props: IProfileHeaderImageProps) => {
  const { image } = transformProfileHeaderImage(props);
  return (
    <div className="hedi--profile-header-image">
      <Image {...image} objectFit="cover" objectPosition="top" />
    </div>
  );
};
