import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { IVideoComponent } from "../../../types";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { PartialBy } from "@/modules/common/utils";

export interface IVideoPlayerProps {
  video: PartialBy<IVideoComponent, "kind" | "usage">;
  subtitles?: ISubtitles[];
}

interface ISubtitles {
  label: string;
  langcode: string;
  src: string;
}

export function useVideo(props: IVideoPlayerProps) {
  const router = useRouter();
  const { locale } = router;
  const { video, subtitles } = props;
  const { route, mimeType } = video;

  const videoPlayerRef = useRef(null); // Instead of ID
  const [currentTime, setCurrentTime] = useState(0);

  const videoJSOptions = {
    autoplay: "muted",
    controls: true,
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2],
    language: locale,
    aspectRatio: "16:9",
  };

  useEffect(() => {
    if (videoPlayerRef) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.on("ended", () => {
          console.log("ended");
        });
        player.on("timeupdate", () => {
          setCurrentTime(player.currentTime());
        });
        console.log("Player Ready");
      });
    }

    return () => {};
  }, []);

  return {
    src: process.env.NEXT_PUBLIC_ASSETS_URL + route,
    mimeType,
    subtitles,
    videoPlayerRef,
  };
}
