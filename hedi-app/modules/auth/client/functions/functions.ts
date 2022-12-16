import { signIn, signOut } from "next-auth/react";

export const login = async (
  username: string,
  password: string,
  callbackUrl?: string
) =>
  signIn<"credentials">("credentials", {
    username,
    password,
    callbackUrl,
    redirect: false,
  });

export const logout = (callbackUrl?: string) =>
  signOut({ redirect: false, callbackUrl });
