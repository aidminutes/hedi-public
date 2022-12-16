import React from "react";
import { transformLanguageSkill } from "./transformLanguageSkill";
import { Rating } from "@/modules/common/client/components";
import { ILanguageLevel } from "@/modules/profile/types";

type DisplayMode = "vertical" | "horizontal";

export const LanguageSkill = (props: {
  languageLevel: ILanguageLevel;
  mode?: DisplayMode;
}) => {
  const { label, level } = transformLanguageSkill(props);
  return (
    <>
      {props.mode === "vertical" ? (
        <>
          <tr>
            <td className="with-spacing">{label}</td>
          </tr>
          <tr>
            <td className="with-spacing">
              <Rating level={level} />
            </td>
          </tr>
        </>
      ) : (
        <tr>
          <td>{label}</td>
          <td>
            <Rating level={level} />
          </td>
        </tr>
      )}
    </>
  );
};
