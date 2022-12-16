// TODO LocationPerson Icon nicht da
import { Organisation } from "@/modules/svg";
import { ProfileCard } from "@/modules/profile/client/components/ProfileCard";
import { Button } from "@/modules/components";
import { ArrowRight16 } from "@carbon/icons-react";
import { ProfileCardDetailsGrid } from "@/modules/profile/client/components/ProfileCard/ProfileCardDetailsGrid";
import { ContactInfo } from "@/modules/profile/client/components/ProfileCard/ContactInfo";
import {
  IProfileEntryProps,
  isProfileEntryDefault,
} from "@/modules/profile/types";
import { getProfileCardType } from "../Profile/getProfileCardType";

export const ProfileEntry: React.FC<IProfileEntryProps> = (
  props
): JSX.Element => {
  const { type, label, route, profession, address } = props;

  const classNames = [
    `hedi--profile-type--${type.toLowerCase()}`,
    "hedi--profile-entry",
  ];
  if (isProfileEntryDefault(props) && props?.services)
    classNames.push("hedi--profile-entry--with-services");

  return (
    <ProfileCard
      className={type === "Organisation" ? "hedi--print__hide" : ""}
      title={label}
      profileType={getProfileCardType(type)}
      href={route}
      profession={profession}
      address={address}
      renderInteractionArea={() =>
        props.profileLinkButton && (
          <Button
            {...props.profileLinkButton}
            size="sm"
            renderIcon={ArrowRight16}
            href={route}
          />
        )
      }
      renderDetails={() => {
        return (
          <ProfileCardDetailsGrid smallFirstColumn>
            <ContactInfo {...props} />
          </ProfileCardDetailsGrid>
        );
      }}
      showImage={type === "Organisation" ? false : true}
    />
  );
};
