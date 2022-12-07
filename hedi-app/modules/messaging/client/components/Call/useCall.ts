import { RefObject, useEffect, useState } from "react";
import {
  MatrixClient,
  MatrixEvent,
  Room,
  RoomMember,
  RoomState,
  RoomStateEvent,
} from "matrix-js-sdk";
import { CallFeed } from "matrix-js-sdk/lib/webrtc/callFeed";
import { CallState, CallEvent } from "matrix-js-sdk/lib/webrtc/call";
import { useMessagingCallSession } from "../../context/MessagingContext";

export const useCall = (props: {
  client: MatrixClient;
  room: Room;
  localFeedRef: RefObject<HTMLVideoElement>;
  remoteFeedRef: RefObject<HTMLVideoElement>;
}) => {
  const { localFeedRef, remoteFeedRef, client, room } = props;

  const { matrixCall, callStart } = useMessagingCallSession();

  const [callTime, setCallTime] = useState<number | null>(null);
  const [localFeed, setLocalFeed] = useState<CallFeed | null>(null);
  const [remoteFeed, setRemoteFeed] = useState<CallFeed | null>(null);

  const [otherMember, setOtherMember] = useState<RoomMember | undefined>(
    undefined
  );

  useEffect(() => {
    setOtherMember(
      room?.getJoinedMembers().find(m => m.userId !== client.credentials.userId)
    );

    const roomMemberListener = (
      event: MatrixEvent,
      state: RoomState,
      member: RoomMember
    ) => {
      setOtherMember(
        room
          ?.getJoinedMembers()
          .find(m => m.userId !== client.credentials.userId)
      );
    };

    //client.on("RoomState.newMember", roomMemberListener);
    client.on(RoomStateEvent.NewMember, roomMemberListener);

    return () => {
      client.removeListener(RoomStateEvent.NewMember, roomMemberListener);
    };
  }, [room, client, setOtherMember]);

  // feeds_changed lissener
  useEffect(() => {
    if (!!matrixCall) {
      const callFeedsChangeListener = (feeds: any) => {
        setLocalFeed(feeds.find((feed: any) => feed.isLocal()));
        setRemoteFeed(feeds.find((feed: any) => !feed.isLocal()));
      };

      matrixCall.on(CallEvent.FeedsChanged, callFeedsChangeListener);

      return () => {
        matrixCall.removeListener(
          CallEvent.FeedsChanged,
          callFeedsChangeListener
        );
      };
    }
  }, [matrixCall, setLocalFeed, setRemoteFeed]);

  useEffect(() => {
    if (!!remoteFeed && !!remoteFeedRef && !!remoteFeedRef.current) {
      try {
        remoteFeedRef.current.srcObject = remoteFeed.stream;
        remoteFeedRef.current.play().catch(_ => null);
      } catch (e) {
        console.error("CALL FEATURE: Remote feed failed", e);
      }
    }

    if (
      !!localFeed &&
      !!localFeedRef &&
      !!localFeedRef.current
      // &&
      // !localFeed.isVideoMuted()
    ) {
      // Connect and show local feed for video calls
      try {
        localFeedRef.current.muted = true;
        localFeedRef.current.srcObject = localFeed.stream;
        localFeedRef.current.play().catch(_ => null);
      } catch (e) {
        console.error("CALL FEATURE: Local feed failed", e);
      }
    }
  }, [localFeed, localFeedRef, remoteFeed, remoteFeedRef]);

  useEffect(() => {
    // Synchronize call time

    if (!callStart) {
      return;
    }

    const callTimeSyncInterval = setInterval(() => {
      if (!!callStart) {
        setCallTime(Math.round((Date.now() - callStart) / 1000));
      }
    }, 1000);

    return () => {
      clearInterval(callTimeSyncInterval);
    };
  }, [callStart, setCallTime]);

  return {
    callStart,
    callTime,
    isConnected: matrixCall?.state === CallState.Connected,
    localFeed,
    matrixCall,
    opponentMemberCall: matrixCall?.getOpponentMember(),
    otherMember,
  };
};
