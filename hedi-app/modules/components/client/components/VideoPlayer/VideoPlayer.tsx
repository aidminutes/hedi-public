import React from "react";
import { IVideoPlayerProps, useVideo } from "./useVideo";

export const VideoPlayer = (props: IVideoPlayerProps): JSX.Element => {
  const { subtitles, videoPlayerRef, mimeType, src } = useVideo(props);

  return (
    <div data-vjs-player>
      <video
        style={{ width: "100%" }}
        ref={videoPlayerRef}
        className="video-js">
        <source src={src} type={mimeType} />

        {subtitles &&
          subtitles.map((subtitle, index) => (
            <track
              label={subtitle.label}
              key={`subtitle-${index}`}
              kind="subtitles"
              srcLang={subtitle.langcode}
              src={subtitle.src}></track>
          ))}
      </video>
    </div>
  );
};
