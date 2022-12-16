import { logout as authLogout } from "@/modules/auth/client";
// import { useMessagingService } from "@/modules/messaging/client/context";
// import { useCallback } from "react";

// BUG TODO client state not checked, just blindly called logout
// export function useLogout() {
//   const client = useMessagingService();

//   const logout = useCallback(() => {
//     try {
//       client.logout();
//     } catch (e) {
//       console.error(e);
//     }
//     authLogout();
//   }, [client]);
//   return { logout };
// }

export function useLogout() {
  return { logout: authLogout };
}
