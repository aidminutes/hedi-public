import { IUserInfo } from "@/modules/auth/types";
import { useSession } from "next-auth/react";

export const useUser = (): [IUserInfo | undefined, boolean] => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  let user = undefined;
  if (!isLoading && session && session?.user) user = { ...session?.user } as IUserInfo;
  return [user, isLoading];
};
