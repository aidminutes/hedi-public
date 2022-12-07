import { getRoomHeaderDefinition } from "@/modules/messaging/client/components/RoomHeader";
import {
  getRoomViewDefinition,
  IRoomView,
  RoomView,
} from "@/modules/messaging/client/components/RoomView";

const roomId = "!PTUdcwokIpuMkYlMNX:hedi.msg";
const lang = "de";

export default function ChatDemo() {
  const roomViewDefinition = getRoomViewDefinition([]);
  const roomViewProps: IRoomView = {
    roomId,
    lang,
    roomHeaderDefinition: roomViewDefinition.roomHeaderDefinition,
    timelineDefinition: roomViewDefinition.timelineDefinition,
    messageComposerDefinition: roomViewDefinition.messageComposerDefinition,
    callDefinition: roomViewDefinition.callDefinition,
  };
  return (
    <div>
      <RoomView {...roomViewProps} />
    </div>
  );
}
