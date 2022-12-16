import { useCallback, useEffect, useState } from "react";
import {
  MatrixClient,
  MatrixEvent,
  Room,
  RoomMember,
  RoomMemberEvent,
  RoomState,
  RoomStateEvent,
  User,
  UserEvent,
} from "matrix-js-sdk";
import { useMessagingCallSession } from "../../context/MessagingContext";

export const useRoomHeader = (props: {
  getAudioAndVideoDevices: () => Promise<{
    audioDevices: MediaDeviceInfo[];
    videoDevices: MediaDeviceInfo[];
    audioOutputDevices: MediaDeviceInfo[];
  }>;
  client: MatrixClient;
  room: Room;
}) => {
  const { createCall } = useMessagingCallSession();

  const { getAudioAndVideoDevices, client, room } = props;
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [otherUserPresence, setOtherUserPresence] = useState("offline");

  const [isTyping, setIsTyping] = useState(false);

  const [availableAudioDevices, setAvailableAudioDevices] = useState<
    MediaDeviceInfo[]
  >([]);
  const [availableVideoDevices, setAvailableVideoDevices] = useState<
    MediaDeviceInfo[]
  >([]);
  const selectAudioAndVideoDevice = useCallback(
    (audioDeviceId: string | null, videoDeviceId: string | null) => {
      if (!!videoDeviceId) {
        client.getMediaHandler().setVideoInput(videoDeviceId);
        localStorage.setItem(
          "hedi-msg-chat-selected-video-device",
          videoDeviceId
        );
      }

      if (!!audioDeviceId) {
        client.getMediaHandler().setAudioInput(audioDeviceId);
        localStorage.setItem(
          "hedi-msg-chat-selected-audio-device",
          audioDeviceId
        );
      }
    },
    [client]
  );
  const [otherMember, setOtherMember] = useState<RoomMember | undefined>(
    undefined
  );
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string | null>(
    localStorage.getItem("hedi-msg-chat-selected-audio-device")
  );
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string | null>(
    localStorage.getItem("hedi-msg-chat-selected-video-device")
  );

  useEffect(() => {
    if (!showSettingsModal) {
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => {
        getAudioAndVideoDevices()
          .then(re => {
            stream.getTracks().forEach(t => t.stop());
            setAvailableAudioDevices(re.audioDevices);
            setAvailableVideoDevices(re.videoDevices);

            // Initial reselect last selected devices
            selectAudioAndVideoDevice(selectedAudioDevice, selectedVideoDevice);
          })
          .catch(er => console.error("getAudioAndVideoDevices failed:", er));
      })
      .catch(() => setShowSettingsModal(false));
  }, [showSettingsModal, setShowSettingsModal]);

  useEffect(() => {
    if (!showSettingsModal) {
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => {
        getAudioAndVideoDevices()
          .then(re => {
            stream.getTracks().forEach(t => t.stop());
            setAvailableAudioDevices(re.audioDevices);
            setAvailableVideoDevices(re.videoDevices);

            // Initial reselect last selected devices
            selectAudioAndVideoDevice(selectedAudioDevice, selectedVideoDevice);
          })
          .catch(er => console.error("getAudioAndVideoDevices failed:", er));
      })
      .catch(() => setShowSettingsModal(false));
  }, [showSettingsModal, setShowSettingsModal]);

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

    client.on(RoomStateEvent.NewMember, roomMemberListener);

    return () => {
      client.removeListener(RoomStateEvent.NewMember, roomMemberListener);
    };
  }, [room, client, setOtherMember]);

  useEffect(() => {
    // Listen for typing changes
    const roomTypingListener = (ev: MatrixEvent, member: RoomMember) => {
      if (
        member.userId === otherMember?.userId &&
        member.roomId === room.roomId
      ) {
        if (member.typing) {
          setIsTyping(true);
        } else {
          setIsTyping(false);
        }
      }
    };

    client.on(RoomMemberEvent.Typing, roomTypingListener);

    return () => {
      client.removeListener(RoomMemberEvent.Typing, roomTypingListener);
    };
  }, [client, setIsTyping, otherMember]);

  useEffect(() => {
    if (otherMember?.userId) {
      client.getPresence(otherMember?.userId ?? "").then((e: any) => {
        setOtherUserPresence(e.presence);
      });
    }
  }, [otherMember, setOtherUserPresence]);

  useEffect(() => {
    // Listen for presence changes
    const roomPresenceListener = (_: MatrixEvent | undefined, user: User) => {
      setOtherUserPresence(user?.presence ?? "offline");
    };

    client.on(UserEvent.Presence, roomPresenceListener);
    return () => {
      client.removeListener(UserEvent.Presence, roomPresenceListener);
    };
  }, [client, setOtherUserPresence, otherMember]);

  return {
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
  };
};
