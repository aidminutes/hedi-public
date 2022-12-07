import React from "react";
import { Chat32 } from "@carbon/icons-react";
const MAX_STARS = 4;
export const Rating = ({ level }: { level: number }) => {
  if (level > MAX_STARS) level = MAX_STARS;
  if (level < 0) level = 0;
  return (
    <>
      {[...Array(level)].map((x, index) => (
        <Chat32 key={"star-" + index} />
      ))}
      {[...Array(MAX_STARS - level)].map((x, index) => (
        <Chat32 className="inactive" key={"star-" + (level + index)} />
      ))}
    </>
  );
};
