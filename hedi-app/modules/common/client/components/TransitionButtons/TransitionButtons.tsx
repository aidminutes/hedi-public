import React, { PropsWithChildren, useState } from "react";
import { IStateful, ITransition } from "@/modules/model";
import { Button } from "@/modules/components";
import { ButtonContainer } from "@/modules/common/client/components";
import { sendConnectionTransition } from "@/modules/networking/client/request";
import { InlineLoading } from "carbon-components-react";

export interface TransitionButtonsProps {
  statefulEntity: IStateful;
  onTransitionDone?: (entityAfterTransition: IStateful) => any;
  useShortLabel?: Boolean;
}

export const TransitionButtons = ({
  statefulEntity,
  onTransitionDone,
  useShortLabel = false,
}: PropsWithChildren<TransitionButtonsProps>) => {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  return (
    <ButtonContainer>
      {statefulEntity.transitions?.map(
        (transition: ITransition, buttonIndex) => {
          if (!transition.label && !transition.longLabel) {
            return null;
          }

          return loadingIndex === buttonIndex ? (
            <InlineLoading status="active" />
          ) : (
            <Button
              buttonKind={
                transition.kind.includes("primary") ? "primary" : "tertiary"
              } // TODO: Update this as soon as we have a fixed format for "kind".
              size="sm"
              text={useShortLabel ? transition.label : transition.longLabel}
              kind="Button"
              disabled={loadingIndex !== null && loadingIndex !== buttonIndex}
              onClick={async () => {
                if (
                  statefulEntity.type === "OrganisationConnection" ||
                  statefulEntity.type === "MidwifeCareConnection"
                ) {
                  try {
                    setLoadingIndex(buttonIndex);
                    const res = await sendConnectionTransition(
                      statefulEntity.route,
                      transition.route
                    );
                    if (res.data?.state) {
                      onTransitionDone?.(res.data);
                    }
                    setLoadingIndex(null);
                  } catch (e) {
                    console.error("Sending connection action failed:", e);
                  }
                } else {
                  console.warn(
                    "unknown source entity type",
                    statefulEntity.type
                  );
                }
              }}
            />
          );
        }
      )}
    </ButtonContainer>
  );
};
