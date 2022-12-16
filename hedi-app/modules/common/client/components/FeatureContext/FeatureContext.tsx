/**
 * This feature context uses environment variables with the format "FEATURE_myFeatureName" and creates
 * a context where you can retrieve either a map with all features (using the context consumer) or
 * a specific feature flag using the "useFeatureFlag" hook.
 */
import React, { useContext } from "react";
import {
  IFeatureFlag,
  IFeatureFlags,
} from "@/modules/common/types/IFeatureFlags";

export enum FeatureFlags {
  testActive = "testActive",
  testInactive = "testInactive",
  networkRequestsActive = "networkRequestsActive",
}

type FeatureFlagType = { [name in FeatureFlags]: boolean };

const stringToBoolean = (s?: string) => {
  return !!s && s !== "false";
};

// Unfortunately, it is not possible to dynamically parse process env for feature flag variables
// (like key.startsWith("NEXT_PUBLIC_FEATURE") for example), because then it wouldn't work in the browser.
//
// webpack replaces instances of process.env.$NAME$ usages during the build time and this does not work
// if the variables are not referenced explicitly in the code.
export const FEATURE_FLAG_MAP: FeatureFlagType = {
  testActive: stringToBoolean(process.env.NEXT_PUBLIC_FEATURE_testActive),
  testInactive: stringToBoolean(process.env.NEXT_PUBLIC_FEATURE_testInactive),
  networkRequestsActive: stringToBoolean(
    process.env.NEXT_PUBLIC_FEATURE_networkRequestsActive
  ),
};

export const FeatureContext = React.createContext<IFeatureFlags>(
  FEATURE_FLAG_MAP
);

export const FeatureFlagsProvider: React.FC = ({ children }) => {
  return (
    <FeatureContext.Provider value={FEATURE_FLAG_MAP}>
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatureFlag: (name: string) => IFeatureFlag = name => {
  const featureFlags = useContext(FeatureContext);
  return featureFlags[name];
};
