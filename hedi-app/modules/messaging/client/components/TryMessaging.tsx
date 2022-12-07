import { UserPanel } from "@/modules/common/client/components/UserPanel";
import { AssertServerSide } from "@/modules/common/utils";
import { IWithType } from "@/modules/model";
import { MatrixClientContextProvider } from "../context/MatrixClientContext/MatrixClientContextProvider";
import { ConversationView } from "./ConversationView";
import { IConversationView } from "./ConversationView/types";
import { RoomsView } from "./DevOnly/RoomsView";
import { IRoomsView } from "./DevOnly/RoomsView/types";

export const TryMessaging = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null => {
  if (!content.type.startsWith("MSG") || AssertServerSide()) return null;
  else {
    const msgPageType = content.type.substring(4);
    return (
      <MatrixClientContextProvider>
        {msgPageType === "Conversation" && (
          <ConversationView
            content={content as IConversationView}
            key={msgPageType}
          />
        )}
        {msgPageType === "Rooms" && (
          <RoomsView content={content as IRoomsView} key={msgPageType} />
        )}
      </MatrixClientContextProvider>
    );
  }
};
