import { IPage } from "@/modules/common/types";
import React from "react";
import { NetworkRequestTeaser } from "./NetworkRequestTeaser";

export type IMidwifeNetworkRequest = IPage & {
  // props...
};

export const MidwifeNetworkRequest = ({
  content,
}: {
  content: IMidwifeNetworkRequest;
}) => {
  return (
    <div>
      <NetworkRequestTeaser components={content.components} />
    </div>
  );
};
