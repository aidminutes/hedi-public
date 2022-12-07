import { IAudioComponent, AudioKind } from "./IAudioComponent";
import { IBodyComponent, BodyKind } from "./IBodyComponent";
import { IButtonComponent, ButtonKind } from "./IButtonComponent";
import { ICheckboxComponent, CheckboxKind } from "./ICheckboxComponent";
import { IColumnComponent, ColumnKind } from "./IColumnComponent";
import { IDatePickerComponent, DatePickerKind } from "./IDatePickerComponent";
import { IGenericComponent, GenericKind } from "./IGenericComponent";
import { IGroupComponent, GroupKind } from "./IGroupComponent";
import {
  IInlineNotificationComponent,
  InlineNotificationKind,
} from "./IInlineNotificationComponent";
import { ILabelComponent, LabelKind } from "./ILabelComponent";
import { ILinkComponent, LinkKind } from "./ILinkComponent";
import { IFileComponent, FileKind } from "./File";
import { IHeadlineComponent, HeadlineKind } from "./IHeadlineComponent";
import { IImageComponent, ImageKind } from "./IImageComponent";
import {
  INumberInputComponent,
  NumberInputKind,
} from "./INumberInputComponent";
import {
  IRadioButtonGroupComponent,
  RadioButtonGroupKind,
} from "./IRadioButtonGroupComponent";
import {
  IRadioButtonComponent,
  RadioButtonKind,
} from "./IRadioButtonComponent";
import { ISelectComponent, SelectKind } from "./ISelectComponent";
import { ISliderComponent, SliderKind } from "./ISliderComponent";
import { ISvgComponent, SvgKind } from "./ISvgComponent";
import { ITextAreaComponent, TextAreaKind } from "./ITextAreaComponent";
import { ITextInputComponent, TextInputKind } from "./ITextInputComponent";
import {
  IToastNotificationComponent,
  ToastNotificationKind,
} from "./IToastNotificationComponent";
import { IToggleComponent, ToggleKind } from "./IToggleComponent";
import { IVideoComponent, VideoKind } from "./IVideoComponent";
import {
  IProfileEntryComponent,
  IProfileRoutesComponent,
  ProfileEntryKind,
  ProfileRoutesKind,
} from "./IProfileEntryComponent";
import { IMenuComponent, MenuKind } from "./IMenuComponent";
import { IMenuHeaderComponent, MenuHeaderKind } from "./IMenuHeaderComponent";
import {
  CuratedArticlesKind,
  ICuratedArticlesComponent,
} from "./ICuratedArticlesComponent";

export type HTML = string;

export type ComponentKind =
  | never
  | BodyKind
  | ButtonKind
  | ColumnKind
  | CheckboxKind
  | CuratedArticlesKind
  | DatePickerKind
  | GenericKind
  | GroupKind
  | HeadlineKind
  | ColumnKind
  | LabelKind
  | LinkKind
  | MenuKind
  | MenuHeaderKind
  | AudioKind
  | FileKind
  | ImageKind
  | RadioButtonKind
  | RadioButtonGroupKind
  | SvgKind
  | VideoKind
  | NumberInputKind
  | ProfileEntryKind
  | ProfileRoutesKind
  | SelectKind
  | SliderKind
  | TextAreaKind
  | TextInputKind
  | ToggleKind
  | InlineNotificationKind
  | ToastNotificationKind;

export interface IComponent {
  kind: ComponentKind;
  id?: string;
}

export type Component =
  | IAudioComponent
  | IBodyComponent
  | IButtonComponent
  | ICheckboxComponent
  | IColumnComponent
  | ICuratedArticlesComponent
  | IDatePickerComponent
  | IFileComponent
  | IGenericComponent
  | IGroupComponent
  | IHeadlineComponent
  | IImageComponent
  | IInlineNotificationComponent
  | ILabelComponent
  | ILinkComponent
  | IMenuComponent
  | INumberInputComponent
  | IProfileEntryComponent
  | IProfileRoutesComponent
  | IRadioButtonComponent
  | IRadioButtonGroupComponent
  | ISelectComponent
  | ISliderComponent
  | ISvgComponent
  | ITextAreaComponent
  | ITextInputComponent
  | IToastNotificationComponent
  | IToggleComponent
  | IVideoComponent;
