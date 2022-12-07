import { IComponent, IInlineNotificationComponent } from "@/modules/components";
import { IStateful, ITransition } from "@/modules/model";
import { IMidwifeCareConnection } from "@/modules/networking/types";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { sendConnectionTransition } from "../../request";
import { getTransitionModalDefinition } from "./getTransitionModalDefinition";

export function useTransitionModal(
  lang: string,
  components: IComponent[],
  mutate?: KeyedMutator<IMidwifeCareConnection[]>,
  onAfterSave?: Function
) {
  const {
    commitmentNotification,
    senderConfirmNotification,
    cancellationNotification,
    withdrawnNotification,
    abortNotification,
    generalError,
    finishCareNotification,
    cancelCareNotification,
  } = getTransitionModalDefinition(components);

  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false);
  const onTransitionModalClose = () => {
    setIsTransitionModalOpen(false);
  };
  const [hasError, setHasError] = useState(false);
  const [stateChangeNotification, setStateChangeNotification] = useState<
    IInlineNotificationComponent | undefined
  >();
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [careConnection, setCareConnection] = useState<
    IMidwifeCareConnection | undefined
  >();
  const [transition, setTransition] = useState<ITransition | undefined>();
  const onTransitionDone = async (entityAfterTransition: IStateful) => {
    if (mutate)
      await mutate(connections => {
        if (!connections) return [];
        return connections.map(c =>
          c.route === entityAfterTransition.route
            ? (entityAfterTransition as IMidwifeCareConnection)
            : c
        );
      });
  };

  const getNotificationMessage = ():
    | IInlineNotificationComponent
    | undefined => {
    switch (transition?.route) {
      case "midwife_care_connection.recipient_handshake":
        return commitmentNotification;
      case "midwife_care_connection.recipient_reject":
      case "midwife_care_connection.recipient_handshake_reject":
        return cancellationNotification;
        break;
      case "midwife_care_connection.sender_cancel":
        return withdrawnNotification;
      case "midwife_care_connection.sender_withdraw":
        return abortNotification;
      case "midwife_care_connection.recipient_care_cancel":
      case "midwife_care_connection.sender_care_cancel":
        return cancelCareNotification;
      case "midwife_care_connection.recipient_complete":
        return finishCareNotification;
      case "midwife_care_connection.sender_confirm":
        return senderConfirmNotification;
    }
    return;
  };

  const doTransition = async () => {
    if (
      careConnection &&
      transition &&
      (careConnection.type === "OrganisationConnection" || // for the future
        careConnection.type === "MidwifeCareConnection")
    ) {
      try {
        const res = await sendConnectionTransition(
          careConnection.route,
          transition.route
        );

        if (res.success && res.data?.state) {
          setStateChangeNotification(getNotificationMessage());

          onTransitionDone?.(res.data);
        }
      } catch (e) {
        setHasError(true);
        setStateChangeNotification(generalError);
        console.error("Sending connection action failed:", e);
      }
    } else {
      setHasError(true);
      setStateChangeNotification(generalError);
      console.warn(
        "unknown source entity type",
        careConnection ? careConnection.type : ""
      );
    }
  };

  const handleSubmit = () => {
    setHasError(false);
    setIsModalLoading(true);
    doTransition().then(() => {
      //if (!hasError) {
      onTransitionModalClose();
      if (onAfterSave) onAfterSave();
      //}
    });

    setIsModalLoading(false);
  };

  return {
    isTransitionModalOpen,
    setIsTransitionModalOpen,
    onTransitionModalClose,
    isModalLoading,
    hasError,
    handleSubmit,
    careConnection,
    setCareConnection,
    transition,
    setTransition,
    stateChangeNotification,
  };
}
