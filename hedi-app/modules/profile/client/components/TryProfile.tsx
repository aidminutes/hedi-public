import { IWithType } from "@/modules/model";
import { IPage } from "@/modules/common/types/IPage";
import { isIProfile } from "../../types";
import { IProfileView, ProfileView } from "./Profile/ProfileView";
import { Pregnancy } from "./Pregnancy";
import { ProfileEdit } from "./ProfileEdit";
import { ProfileEditImageView } from "./ProfileEditImage";
import { ProfilePreview } from "./ProfilePreview";
import { ProfileUserCard } from "./ProfileUserCard";
import { ProfileServices } from "./ProfileServices/ProfileServices";
import { ProfileCapacity } from "./ProfileCapacity/ProfileCapacity";
import { PregnantUserCard } from "./PregnantUserCard";

export const TryProfile = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null => {
  if (isIProfile(content))
    return <ProfileView content={content as IProfileView} key="profile" />;

  switch (content.type) {
    case "Pregnancy":
      return <Pregnancy content={content as IPage} key="pregancyedit" />;
    case "PregnantUserCard":
      return (
        <PregnantUserCard content={content as IPage} key="Pregnantusercard" />
      );
    case "ProfileEdit":
      return <ProfileEdit content={content as IPage} key="profileedit" />;
    case "ProfileEditImage":
      return (
        <ProfileEditImageView
          content={content as IPage}
          key="profileeditimage"
        />
      );
    case "ProfilePreview":
      return <ProfilePreview content={content as IPage} key="profilepreview" />;
    case "ProfileUserCard":
      return (
        <ProfileUserCard content={content as IPage} key="profileusercard" />
      );
    case "ProfileServices":
      return (
        <ProfileServices content={content as IPage} key="profileservices" />
      );
    case "ProfileCapacity":
      return (
        <ProfileCapacity content={content as IPage} key="profilecapacity" />
      );
    default:
      return null;
  }
};
