import {
  IComponent,
  isAudio,
  isBody,
  isButton,
  isFile,
  isImage,
  isLabel,
  isSvg,
  isTextArea,
  isTextInput,
  isVideo,
  isHeadline,
  findInlineNotificationInstance,
} from "@/modules/components/types";
import {
  TextArea,
  TextInput,
  Button,
  Body,
  Label,
  AudioPlayer,
  Image,
  DownloadFile,
  VideoPlayer,
  Svg,
} from "../index";
import React from "react";
import { HeadlineWithLinkCopy } from "@/modules/common/client/components";
interface IRendererProps {
  components: IComponent[];
  route?: string;
  className?: string;
  copyLinkNotificationText?: string;
}

export const ComponentRenderer = (props: IRendererProps) => {
  const { components, route, className, copyLinkNotificationText } = props;

  const notificationText = findInlineNotificationInstance(
    components,
    "copyLinkNotificationText"
  )?.title;
  return (
    <div className={className}>
      {components &&
        components.map((component, index) => {
          if (isLabel(component))
            return <Label key={component.kind + index} {...component} />;
          if (isHeadline(component))
            return (
              <HeadlineWithLinkCopy
                key={component.kind + index}
                {...component}
                route={route}
                notificationText={
                  copyLinkNotificationText ?? notificationText ?? ""
                }
              />
            );
          if (isBody(component))
            return <Body key={component.kind + index} {...component} />;
          if (isButton(component))
            return <Button key={component.kind + index} {...component} />;
          if (isTextArea(component))
            return <TextArea key={component.kind + index} {...component} />;
          if (isTextInput(component))
            return <TextInput key={component.kind + index} {...component} />;
          if (isAudio(component))
            return <AudioPlayer key={component.kind + index} {...component} />;
          if (isImage(component))
            return <Image key={component.kind + index} {...component} />;
          if (isFile(component))
            return <DownloadFile key={component.kind + index} {...component} />;
          if (isVideo(component))
            return (
              <VideoPlayer key={component.kind + index} video={component} />
            );
          if (isSvg(component))
            return <Svg key={component.kind + index} {...component} />;
        })}
    </div>
  );
};
