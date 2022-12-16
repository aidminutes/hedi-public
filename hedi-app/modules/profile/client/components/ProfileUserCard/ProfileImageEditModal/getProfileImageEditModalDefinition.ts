import {
  getBodyInstance,
  getLabelInstance,
  IBodyComponent,
  IComponent,
  ILabelComponent,
} from "@/modules/components";
export interface IEditImage {
  modalImageHeadlineLabel: ILabelComponent;
}

export const getProfileImageEditModalDefinition = (
  components: IComponent[]
): IEditImage => ({
  modalImageHeadlineLabel: getLabelInstance(
    components,
    "modalImageHeadlineLabel",
    { labelKind: "span", text: "Profilbild" }
  ),
});
