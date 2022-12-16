import { IImageComponent } from "@/modules/components";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { IUserInfo } from "../../types";

export const session = async ({
  session,
  user,
  token,
}: {
  session: Session;
  user: User;
  token: JWT & { pictureComponent?: IImageComponent };
}) => {
  const userOrToken = { ...token, ...user };
  const {
    name,
    preferred_username,
    givenname,
    familyname,
    route,
    email,
    role,
    profession,
    pictureComponent,
    uuid,
  } = userOrToken;

  session.user = {
    name,
    preferred_username,
    givenname,
    familyname,
    route,
    email,
    role,
    profession,
    pictureComponent,
    uuid,
  } as IUserInfo;
  return { ...session };
};
