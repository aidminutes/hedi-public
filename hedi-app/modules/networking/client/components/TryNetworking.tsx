import React from "react";
import { IWithType } from "@/modules/model";
import {
  IMidwifeCaresView,
  MidwifeCaresView,
  MyMidwifeCaresView,
  IMyMidwifeCaresView,
} from "./MidwifeCares";
import {
  IMidwifeCareConnectionsView,
  MidwifeCareConnectionsView,
} from "./MidwifeCareConnections";
import {
  IMidwifeCareRequestView,
  MidwifeCareRequestView,
} from "./MidwifeCareRequest";
import {
  IProfileEditOrganisationsView,
  ProfileEditOrganisationsView,
} from "./ProfileEditOrganisations";
import {
  IProfileEditOwnedOrganisationView,
  ProfileEditOwnedOrganisationView,
} from "./ProfileEditOwnedOrganisation";
import {
  IMidwifeFinishedCares,
  MidwifeFinishedCares,
} from "./MidwifeFinishedCares";
import {
  IMidwifeNetworkRequest,
  MidwifeNetworkRequest,
} from "./MidwifeNetworkRequest";

export const TryNetworking = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null => {
  switch (content.type) {
    case "MyMidwifeCares":
      return (
        <MyMidwifeCaresView
          content={content as IMyMidwifeCaresView}
          key="mymidwifecares"
        />
      );
    case "MidwifeCares":
      return (
        <MidwifeCaresView
          content={content as IMidwifeCaresView}
          key="midwifecares"
        />
      );
    case "MidwifeFinishedCares":
      return (
        <MidwifeFinishedCares
          content={content as IMidwifeFinishedCares}
          key="midwifefinishedcares"
        />
      );
    case "MidwifeCareConnections":
      return (
        <MidwifeCareConnectionsView
          content={content as IMidwifeCareConnectionsView}
          key="midwifecareconnections"
        />
      );
    case "MidwifeCareConnectionsArchive":
      return (
        <MidwifeCareConnectionsView
          content={content as IMidwifeCareConnectionsView}
          isArchive={true}
          key="midwifecareconnections"
        />
      );
    case "MidwifeCareRequest":
    case "MidwifeCareDetails":
      return (
        <MidwifeCareRequestView
          content={content as IMidwifeCareRequestView}
          key="midwifecarerequest"
        />
      );
    case "NetworkRequest":
      return (
        <MidwifeNetworkRequest
          content={content as IMidwifeNetworkRequest}
          key="midwifenetworkrequest"
        />
      );
    case "ProfileEditOrganisations":
      return (
        <ProfileEditOrganisationsView
          content={content as IProfileEditOrganisationsView}
          key="profileeditorganisations"
        />
      );
    case "ProfileEditOwnedOrganisation":
      return (
        <ProfileEditOwnedOrganisationView
          content={content as IProfileEditOwnedOrganisationView}
          key="profileeditownedorganisation"
        />
      );
    default:
      return null;
  }
};
