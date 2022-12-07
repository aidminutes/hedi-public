import { useSysMessageList } from "@/modules/sysmessage/client/components/SysMessageList/useSysMessageList";
import { useRouter } from "next/router";
import { normalizeSegments } from "@/modules/common/routing/normalize";
import { ISysMessageDetailView } from "@/modules/sysmessage/types/ISysMessageDetailView";

export const useSysMessageDetails = (content: ISysMessageDetailView) => {
  const { route, lang } = content;
  const { data: sysMessages } = useSysMessageList(lang);
  const router = useRouter();
  const { segments } = router.query;
  let sysMessage;

  if (Array.isArray(segments)) {
    let path = normalizeSegments(segments, lang);
    path = path.endsWith("/") ? path.substring(0, path.length - 1) : path;
    const uuid = path.split("/").pop();
    if (!uuid?.includes(route)) {
      sysMessage = sysMessages?.find(msg => msg.route === uuid);
    }
  }

  return { sysMessage };
};
