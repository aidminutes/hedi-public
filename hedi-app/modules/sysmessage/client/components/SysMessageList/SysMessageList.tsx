import { IPage } from "@/modules/common/types";
import {
  getSysMessageEntryDefinition,
  SysMessageEntry,
} from "../SysMessageEntry";
import { useSysMessageList } from "./useSysMessageList";

export type SysMessageListView = IPage & {};

export const SysMessageList = ({
  content,
}: {
  content: SysMessageListView;
}) => {
  const { data: sysMessages } = useSysMessageList(content.lang);

  const sysMessageDefinition = getSysMessageEntryDefinition(content.components);
  return (
    <>
      {sysMessages?.map(sysMessage => (
        <SysMessageEntry
          {...sysMessage}
          {...sysMessageDefinition}
          key={sysMessage.route}
        />
      ))}
    </>
  );
};
