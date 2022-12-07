import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Modal,
  RadioButton,
  RadioButtonGroup,
} from "carbon-components-react";
import {
  Phone32,
  Settings32,
  VideoChat32,
  ChevronLeft16,
} from "@carbon/icons-react";
import { Button as HediButton, Image } from "@/modules/components";
import { CallType } from "matrix-js-sdk/lib/webrtc/call";
import config from "../../../config";
import { IRoomHeader } from "./types";
import { useRoomHeader } from "./useRoomHeader";
import { useLocaleInfo } from "@/modules/shell/client/contexts";
import { requestMyMidwifeCareConnection } from "@/modules/networking/client/request";
import { IMidwifeCareConnectionsView } from "@/modules/networking/client/components";
import { IMidwifeCareConnection } from "@/modules/networking/types";
import { IImage } from "@/modules/media/types";
import { HediPersonRound } from "@/modules/svg";
import { useCurrentUser } from "@/modules/auth/client/hooks/useCurrentUser";

const getAudioAndVideoDevices = async () => {
  const allDevices = (await navigator?.mediaDevices?.enumerateDevices()) ?? [];
  const videoDevices = allDevices.filter(d => d.kind === "videoinput");
  const audioDevices = allDevices.filter(d => d.kind === "audioinput");
  const audioOutputDevices = allDevices.filter(d => d.kind === "audiooutput");
  return { audioDevices, videoDevices, audioOutputDevices };
};

function historyBackWFallback(lang: string) {
  let fallbackUrl = "/" + lang + "/";
  const prevPage = window.location.href;

  window.history.go(-1);

  setTimeout(function () {
    if (window.location.href == prevPage) {
      window.location.href = fallbackUrl;
    }
  }, 1000);
}

export const RoomHeader = (props: IRoomHeader) => {
  const {
    active: { locale },
  } = useLocaleInfo();

  const {
    room,
    client,
    selectedAudioVideoDeviceLabel,
    saveLabel,
    cancelLabel,
    audioDevicesLabel,
    videoDevicesLabel,
    isTypingLabel,
    videoChatLabel,
    audioChatLabel,
    audioVideoSettingsLabel,
    backLabel,
    setOtherMemberAvatar,
  } = props;

  const {
    availableAudioDevices,
    availableVideoDevices,
    createCall,
    isTyping,
    otherMember,
    otherUserPresence,
    selectAudioAndVideoDevice,
    selectedAudioDevice,
    selectedVideoDevice,
    setSelectedAudioDevice,
    setSelectedVideoDevice,
    setShowSettingsModal,
    showSettingsModal,
  } = useRoomHeader({ getAudioAndVideoDevices, client, room });

  const [connection, setConnection] = useState<
    IMidwifeCareConnection | undefined
  >();
  const [currentUser] = useCurrentUser();
  const settingsModal = useMemo(() => {
    const availableAudioDevicesRadioButtons = availableAudioDevices.map(
      audioInputDevice => (
        <RadioButton
          labelText={audioInputDevice.label ?? "Test"}
          value={audioInputDevice.deviceId}
          id={audioInputDevice.deviceId}
          key={"audioDevice" + audioInputDevice.deviceId}
        />
      )
    );

    const availableVideoDevicesRadioButtons = availableVideoDevices.map(
      videoInputDevice => (
        <RadioButton
          labelText={videoInputDevice.label ?? "Test"}
          value={videoInputDevice.deviceId}
          id={videoInputDevice.deviceId}
          key={"videoDevice" + videoInputDevice.deviceId}
        />
      )
    );

    return (
      <Modal
        className={"deviceSelection"}
        open={showSettingsModal}
        onRequestClose={() => setShowSettingsModal(false)}
        onRequestSubmit={() => {
          selectAudioAndVideoDevice(selectedAudioDevice, selectedVideoDevice);
          setShowSettingsModal(false);
        }}
        modalHeading={selectedAudioVideoDeviceLabel}
        primaryButtonText={saveLabel}
        secondaryButtonText={cancelLabel}>
        <RadioButtonGroup
          legendText={audioDevicesLabel}
          name="audio-devices-radio-button-group"
          orientation={"vertical"}
          valueSelected={selectedAudioDevice || ""}
          onChange={(newSelection, name, event) =>
            setSelectedAudioDevice(newSelection as string)
          }>
          {availableAudioDevicesRadioButtons}
        </RadioButtonGroup>
        <RadioButtonGroup
          className={"withMarginTop"}
          legendText={videoDevicesLabel}
          name="video-devices-radio-button-group"
          orientation={"vertical"}
          valueSelected={selectedVideoDevice || ""}
          onChange={(newSelection, name, event) =>
            setSelectedVideoDevice(newSelection as string)
          }>
          {availableVideoDevicesRadioButtons}
        </RadioButtonGroup>
      </Modal>
    );
  }, [
    availableAudioDevices,
    availableVideoDevices,
    selectedAudioDevice,
    selectedVideoDevice,
    showSettingsModal,
    client,
  ]);

  if (!otherMember) {
    // Alone in the chat - no need for a room header
    return null;
  }

  const imageUrl =
    otherMember?.getAvatarUrl(
      client.baseUrl,
      200,
      200,
      "scale",
      false,
      false
    ) ?? "/svg/pregnancy_blue.svg";

  if (setOtherMemberAvatar) {
    setOtherMemberAvatar(imageUrl);
  }

  return (
    <div className="hedi--msg-room-header">
      <div className="hedi--msg-room-header-room-info">
        <HediButton
          hasIconOnly
          buttonKind="ghost"
          renderIcon={ChevronLeft16}
          iconDescription={backLabel}
          onClick={() => historyBackWFallback(locale)}
        />

        <div
          className={`hedi--msg-room-header-profile-image ${otherUserPresence}`}>
          <img
            src={imageUrl ?? ""}
            alt=""
            className="hedi--msg-room-header-profile-image"
            height={200}
            width={200}
          />

          <div
            className={`hedi--msg-room-header-online-status ${otherUserPresence}`}
          />
        </div>
        <div className="hedi--msg-room-header-user-info">
          <div className="hedi--msg-room-header-user-name-wrapper">
            <h2 className={"hedi--msg-room-header-user-name"}>
              {otherMember?.rawDisplayName}
            </h2>
          </div>
          {isTyping && (
            <h3 className={"hedi--msg-room-header-user-typing"}>
              {isTypingLabel}
            </h3>
          )}
        </div>
      </div>
      {config.roomHeaderShowCallButtons && (
        <div className="hedi--msg-room-header-call-buttons">
          <Button
            hasIconOnly
            tooltipPosition={"bottom"}
            iconDescription={videoChatLabel}
            renderIcon={VideoChat32}
            onClick={() => createCall(CallType.Video, room.roomId)}
          />
          <Button
            hasIconOnly
            tooltipPosition={"bottom"}
            iconDescription={audioChatLabel}
            renderIcon={Phone32}
            onClick={() => createCall(CallType.Voice, room.roomId)}
          />
          <Button
            kind={"primary"}
            hasIconOnly
            tooltipPosition={"left"}
            iconDescription={audioVideoSettingsLabel}
            renderIcon={Settings32}
            onClick={() => setShowSettingsModal(true)}
          />
        </div>
      )}
      {settingsModal}
    </div>
  );
};
