import { getSysMessageDetailViewDefinition } from "./getSysMessageDetailViewDefinition";
import { ISysMessageDetailView } from "@/modules/sysmessage/types/ISysMessageDetailView";
import { Body, Label } from "@/modules/components";
import { TransitionButtons } from "@/modules/common/client/components/TransitionButtons";
import { isIStateful } from "@/modules/model";
import { useSysMessageDetails } from "@/modules/sysmessage/client/components/SysMessageDetail/useSysMessageDetails";

export const SysMessageDetailView = ({
  content,
}: {
  content: ISysMessageDetailView;
}) => {
  const {
    headline,
    statusLabel,
    notFoundBody,
  } = getSysMessageDetailViewDefinition(content.components);
  const { sysMessage } = useSysMessageDetails(content);

  if (!sysMessage) {
    return <Body {...notFoundBody} />;
  }

  return (
    <div>
      <Label {...headline} />
      <p>{sysMessage.message}</p>

      <Label {...statusLabel} />
      <p>{sysMessage.state.label}</p>

      {isIStateful(sysMessage.source) && (
        <TransitionButtons statefulEntity={sysMessage.source} />
      )}
    </div>
  );
};
