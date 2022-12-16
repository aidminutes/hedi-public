import {
  getLabelInstance,
  getGroupInstance,
  IComponent,
  ILabelComponent,
  getSelectInstance,
  IButtonComponent,
  getButtonInstance,
  IInlineNotificationComponent,
  getInlineNotificationInstance,
  filterGroupInstanceByProfession,
} from "@/modules/components";
import { getCareTypes, ICareType } from "@/modules/networking/types/ICareType";
import {
  getServicesWithChildren,
  IServiceWithChildren,
} from "@/modules/profile/types";

export interface IProfileServicesViewDefinition {
  allServices: IServiceWithChildren[];
  allCareTypes: ICareType[];
  servicesCareTypesTitleLabel: ILabelComponent;
  servicesLabel: ILabelComponent;
  editServicesTitleLabel: ILabelComponent;
  editServicesDescriptionLabel: ILabelComponent;
  saveButton: IButtonComponent;
  resetButton: IButtonComponent;
  servicesErrorNotification: IInlineNotificationComponent;
}

export const getProfileServicesEditModalViewDefinition = (
  components: IComponent[],
  professionRoute: string
): IProfileServicesViewDefinition => {
  const allServices = getServicesWithChildren(
    filterGroupInstanceByProfession(
      getGroupInstance(components, "serviceSelect", {
        usage: "",
        labelText: "Leistungen",
        components: [],
      }),
      professionRoute
    )
  );
  const allCareTypes = getCareTypes(
    getSelectInstance(components, "allCareTypesSelect", {
      labelText: "Betreuungsform",
      items: [],
    })
  );
  return {
    allServices,
    allCareTypes,
    servicesCareTypesTitleLabel: getLabelInstance(
      components,
      "servicesCareTypesTitleLabel",
      {
        labelKind: "label",
        text: "Angebotene Betreuungform",
      }
    ),
    servicesLabel: getLabelInstance(components, "servicesLabel", {
      labelKind: "label",
      text: "Weitere Leistungen & Services",
    }),
    editServicesDescriptionLabel: getLabelInstance(
      components,
      "editServicesDescriptionLabel",
      {
        labelKind: "paragraph",
        text: "Vervollständige deine Leistungsübersicht.",
      }
    ),
    editServicesTitleLabel: getLabelInstance(
      components,
      "editServicesTitleLabel",
      {
        labelKind: "label",
        text: "Deine Leistungen",
      }
    ),
    saveButton: getButtonInstance(components, "saveButton", {
      usage: "",
      buttonKind: "primary",
    }),
    resetButton: getButtonInstance(components, "resetButton", {
      usage: "",
      buttonKind: "ghost",
    }),
    servicesErrorNotification: getInlineNotificationInstance(
      components,
      "servicesErrorNotification",
      {
        notificationKind: "error",
        title: "Fehler beim Speichern. Prüfe die Daten und versuch es nochmal",
      }
    ),
  };
};
