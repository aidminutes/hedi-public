import React, { ReactElement } from "react";
import { useFeatureFlag } from "@/modules/common/client/components";
import { FeatureFlags } from "../FeatureContext";

export interface FeatureFlagProps {
  name: FeatureFlags;
  fallbackContent?: ReactElement;
}

export const FeatureFlag: React.FC<FeatureFlagProps> = ({
  name,
  children,
  fallbackContent,
}) => {
  const isEnabled = useFeatureFlag(name);
  return isEnabled ? <>{children}</> : fallbackContent ?? null;
};
