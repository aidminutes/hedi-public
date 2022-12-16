import { IAudioComponent } from "../../../types";
import { transformAudio } from "./transformAudio";
import { useAudioPlayerRef } from "./useAudioPlayerRef";

export const AudioPlayer = (props: IAudioComponent) => {
  const { src, mimeType, isVisible } = transformAudio(props);
  const { playerRef } = useAudioPlayerRef(isVisible);

  return (
    <>
      <audio
        controls
        src={src}
        className={`hedi--audioplayer${
          !isVisible ? " hedi--audioplayer--hidden" : ""
        }`}
        ref={playerRef}>
        {/* TODO add possibility of multiple types */}
        <source src={src} type={mimeType} />
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </>
  );
};
