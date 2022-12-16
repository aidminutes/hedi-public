import { useCallback, useMemo, useRef } from "react";
import { Column } from "carbon-components-react";
import {
  Microphone32,
  MicrophoneOff32,
  PhoneBlock32,
  PhoneBlockFilled32,
  PhoneFilled16,
  PhoneIncomingFilled32,
  Video32,
  VideoChat32,
  VideoOff32,
} from "@carbon/icons-react";
import { CallErrorCode, CallType } from "matrix-js-sdk/lib/webrtc/call";
import { Button } from "@/modules/components";
import { ICall } from "./types";
import { useCall } from "./useCall";

export const Call = (props: ICall) => {
  const {
    room,
    client,
    answerCallButton,
    answerCallWithVideoButton,
    declineCallButton,
    videoOnButton,
    videoOffButton,
    microphoneOnButton,
    microphoneOffButton,
    hangUpButton,
    otherMemberAvatar
  } = props;

  const localFeedRef = useRef<HTMLVideoElement>(null);
  const remoteFeedRef = useRef<HTMLVideoElement>(null);

  const {
    callTime,
    isConnected,
    localFeed,
    matrixCall,
    opponentMemberCall,
  } = useCall({
    client,
    localFeedRef,
    remoteFeedRef,
    room,
  });


  let imageUrl = '';
  if(!!otherMemberAvatar)
  {
    imageUrl = otherMemberAvatar;
  }
  else
  {
    imageUrl = opponentMemberCall?.getAvatarUrl(
      client.baseUrl,
      500,
      500,
      "scale",
      false,
      false
    ) ?? "/svg/pregnancy_blue.svg";
  }

  // Callbacks --------------------

  const endCall = useCallback(() => {
    matrixCall?.hangup(CallErrorCode.UserHangup, false);
  }, [matrixCall]);

  const answerCall = useCallback(
    (accept: boolean, withVideo: boolean) => {
      if (accept) {
        matrixCall?.answer(true, true).then(() => {
          matrixCall?.setLocalVideoMuted(!withVideo);
        });
      } else {
        try {
          matrixCall?.reject();
        } catch (e) {
          endCall();
        }
      }
    },
    [matrixCall]
  );

  // Memos --------------------
  const isMute = matrixCall?.isMicrophoneMuted();
  const isVideoMute = matrixCall?.isLocalVideoMuted();

  const otherParty = useMemo(() => {
    let formattedCalltime = "00:00";

    if (callTime && callTime > 0) {
      const callTimeMinutes = Math.floor(callTime / 60);
      const callTimeSeconds = callTime - callTimeMinutes * 60;

      formattedCalltime =
        callTimeMinutes.toLocaleString("de-DE", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) +
        ":" +
        callTimeSeconds.toLocaleString("de-DE", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
    }

    return (
      <Column className="hedi--msg-call-otherParty">
        <img
          src={imageUrl ?? ""}
          alt=""
          className="hedi--msg-call-otherParty-profileImage"
          height={200}
          width={200}
        />
        <h2 className="hedi--msg-call-otherParty-user">
          {opponentMemberCall?.rawDisplayName}
        </h2>
        {isConnected && (
          <div className={"hedi--msg-call-otherParty-connectionWrapper"}>
            <PhoneFilled16
              style={{ color: "#2a84c6", marginRight: "0.25rem" }}
            />
            <h3 className={"hedi--msg-call-otherParty-connection"}>
              {formattedCalltime}
            </h3>
          </div>
        )}
      </Column>
    );
  }, [isConnected, opponentMemberCall, callTime]);

  const incomingCallControls = useMemo(() => {
    return (
      <div className={"hedi--msg-call-controls-incoming"}>
        <Button
          iconDescription={answerCallButton}
          buttonKind={"ghost"}
          className="hedi--msg-call-answer"
          renderIcon={PhoneIncomingFilled32}
          onClick={() => answerCall(true, false)}
        />
        {matrixCall?.type === CallType.Video && (
          <Button
            iconDescription={answerCallWithVideoButton}
            buttonKind={"ghost"}
            className="hedi--msg-call-answer-video"
            renderIcon={VideoChat32}
            onClick={() => answerCall(true, true)}
          />
        )}
        <Button
          iconDescription={declineCallButton}
          buttonKind={"ghost"}
          className="hedi--msg-call-decline"
          renderIcon={PhoneBlockFilled32}
          onClick={() => answerCall(false, false)}
        />
      </div>
    );
  }, [answerCall]);

  const localMute = localFeed?.isVideoMuted();
  const connectedCallControls = useMemo(() => {
    return (
      <div className={"hedi--msg-call-controls-connected"}>
        {matrixCall?.type === CallType.Video ? (
          <Button
            iconDescription={isVideoMute?videoOnButton:videoOffButton}
            className="hedi--msg-call-mute"
            buttonKind={"ghost"}
            hasIconOnly
            renderIcon={isVideoMute ? VideoOff32 : Video32}
            onClick={() => {
              localFeed?.setAudioVideoMuted(
                localFeed?.isAudioMuted(),
                !localMute
              );
              matrixCall?.setLocalVideoMuted(!isVideoMute);
            }}
          />
        ) : null}

        <Button
          iconDescription={isMute?microphoneOnButton:microphoneOffButton}
          className="hedi--msg-call-mute"
          buttonKind={"ghost"}
          hasIconOnly
          renderIcon={isMute ? MicrophoneOff32 : Microphone32}
          onClick={() => {
            matrixCall?.setMicrophoneMuted(!isMute);
          }}
        />

        <Button
          iconDescription={hangUpButton}
          className="hedi--msg-call-hangup"
          buttonKind={"button"}
          hasIconOnly
          renderIcon={PhoneBlock32}
          onClick={endCall}
        />
      </div>
    );
  }, [endCall, localFeed, matrixCall, isMute, isVideoMute, localMute]);

  const outgoingCallControls = useMemo(() => {
    return (
      <div className={"hedi--msg-call-controls"}>
        <Button
          iconDescription={hangUpButton}
          className="hedi--msg-call-hangup"
          buttonKind="button"
          hasIconOnly
          renderIcon={PhoneBlock32}
          onClick={endCall}
        />
      </div>
    );
  }, [endCall]);

  const controls = isConnected
    ? connectedCallControls
    : matrixCall?.direction === "inbound"
    ? incomingCallControls
    : outgoingCallControls;

  const isVideoCall = matrixCall?.type === CallType.Video;
  // Show other party only when not connected or in audio call
  const showOtherParty = !isConnected || !isVideoCall;

  return (
    <Column className={"hedi--msg-call"}>
      <Column className="hedi--msg-call-container">
        <Column
          className={
            "hedi--msg-call-feeds" + (!isConnected ? " not-connected" : "")
          }>
          <video
            className="hedi--msg-call-feeds-remote"
            ref={remoteFeedRef}
            style={{ visibility: isVideoCall ? "visible" : "hidden" }}
          />

          {/*{isVideoCall && (*/}
          {/*  <video className="hedi--msg-call-feeds-local" ref={localFeedRef} />*/}
          {/*)}*/}

          <video className="hedi--msg-call-feeds-local" ref={localFeedRef} />
        </Column>
        {showOtherParty && otherParty}

        {controls}
      </Column>
    </Column>
  );
};
