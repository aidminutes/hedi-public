import {
  findButtonInstance,
  findImageInstance,
  findLabelInstance,
  IComponent,
} from "@/modules/components";
import { IZipCodeDefinition } from "./types";

export function getZipCodeDefinition(
  uiComponents: IComponent[]
): IZipCodeDefinition {
  const zipCodeButton = findButtonInstance(uiComponents, "zipCodeButton");
  const zipCodeHeadline = findLabelInstance(uiComponents, "zipCodeHeadline");
  const zipCodeErrorMessage = findLabelInstance(
    uiComponents,
    "errorMessageZipCode"
  );
  const zipCodeHelperText = findLabelInstance(
    uiComponents,
    "zipCodeHelperText"
  );
  const zipCodeErrorHeadline = findLabelInstance(
    uiComponents,
    "errorZipCodeHeadline"
  );
  const zipCodeErrorHelperText = findLabelInstance(
    uiComponents,
    "errorZipCodeHelperText"
  );
  const zipCodeBackground = findImageInstance(
    uiComponents,
    "zipCodeBackground"
  );
  const zipCodePlaceHolderText = findLabelInstance(
    uiComponents,
    "zipCodePlaceHolderText"
  );
  return {
    zipCodeButton: zipCodeButton,
    zipCodeHeadline: zipCodeHeadline,
    zipCodeHelperText: zipCodeHelperText,
    zipCodeErrorMessage: zipCodeErrorMessage,
    zipCodeErrorHeadline: zipCodeErrorHeadline,
    zipCodeErrorHelperText: zipCodeErrorHelperText,
    zipCodeBackground: zipCodeBackground,
    zipCodePlaceHolderText: zipCodePlaceHolderText,
  };
}
