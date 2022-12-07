import { IProfileHeaderImageProps } from "./ProfileHeaderImage";
import { getProfileHeaderImageDefinition } from "./getProfileHeaderImageDefinition";
import { ProfileCardType } from "../ProfileCard";
export function transformProfileHeaderImage(props: IProfileHeaderImageProps) {
  const { images, profileType } = props;
  const {
    organisationImage,
    professionalImage,
    personalImage,
  } = getProfileHeaderImageDefinition(images);
  const image =
    profileType === ProfileCardType.ORGANISATION
      ? organisationImage
      : profileType === ProfileCardType.PROFESSIONAL
      ? professionalImage
      : personalImage;

  return { image };
}
