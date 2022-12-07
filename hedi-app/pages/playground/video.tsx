import { VideoPlayer } from "@/modules/components";

const data = {
  subtitles: [
    { label: "Deutsch", langcode: "de", src: "/dummy/subtitle/de.vtt" },
    { label: "English", langcode: "en", src: "/dummy/subtitle/en.vtt" },
    { label: "Espagnol", langcode: "es", src: "/dummy/subtitle/es.vtt" },
  ],
  sources: [
    {
      mimeType: "webm",
      src: "/dummy/video/210211_Audio_Multitrack_Tryout_1015.webm",
    },
  ],
};

export default function ChatIndex() {
  return (
    <div>
      {/* <VideoPlayer data={data} /> */}
    </div>
  );
}
