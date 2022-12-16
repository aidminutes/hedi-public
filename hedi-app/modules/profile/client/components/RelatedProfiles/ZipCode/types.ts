import {
  IButtonComponent,
  IImageComponent,
  ILabelComponent,
} from "@/modules/components";

export interface IZipCodeDefinition {
  zipCodeHeadline?: ILabelComponent;
  zipCodeHelperText?: ILabelComponent;
  zipCodeErrorMessage?: ILabelComponent;
  zipCodeButton?: IButtonComponent;
  zipCodeErrorHeadline?: ILabelComponent;
  zipCodeErrorHelperText?: ILabelComponent;
  zipCodeBackground?: IImageComponent;
  zipCodePlaceHolderText?: ILabelComponent;
}
