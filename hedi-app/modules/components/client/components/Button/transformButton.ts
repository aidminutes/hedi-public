import { IButtonComponent } from "../../../types";
import { ButtonDefaultProps } from "carbon-components-react";
import { BasicHTML } from "@/modules/react/html";
import { PartialBy } from "@/modules/common/utils";
import dynamic from "next/dynamic";
import { CarbonIconProps, CarbonIconType } from "@carbon/icons-react";

export type IButtonProps = PartialBy<
  Omit<IButtonComponent, "renderIcon">,
  "kind" | "usage"
> &
  Omit<ButtonDefaultProps, "id" | "href">;

export function transformButton(props: IButtonProps) {
  const {
    kind,
    buttonKind,
    text,
    usage,
    labelText,
    renderIcon: iconNameOrType,
    ariaLabel,
    ...rest
  } = props;

  // NOTE this would work, but pulls all carbon icons in any size into the app package (=400kb)
  // can only be done, if we re-export actually used icons in a prebuild step and reference that one here
  // const renderIcon = (!!iconNameOrType && typeof iconNameOrType === "string") ? dynamic<CarbonIconProps>(() =>
  //   import("@carbon/icons-react")
  //   .then(module => module[iconNameOrType] as CarbonIconType ))
  //    : iconNameOrType;

  // NOTE see above
  const renderIcon = iconNameOrType;

  const child = text
    ? BasicHTML({ data: text })
    : labelText
    ? BasicHTML({ data: labelText })
    : null;

  return {
    kind: buttonKind,
    child,
    renderIcon,
    hasIconOnly: !!renderIcon && child === null ? true : undefined,
    "aria-label": ariaLabel,
    ...rest,
  };
}
