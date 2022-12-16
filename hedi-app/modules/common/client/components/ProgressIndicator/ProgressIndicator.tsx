import React from "react";
import {
  ProgressIndicator as CarbonProgressIndicator,
  ProgressStep,
} from "carbon-components-react";
import { HTML } from "@/modules/react/html";
import { IBodyComponent, ILabelComponent } from "@/modules/components";
import cx from "classnames";

export enum IProgressItemStatus {
  complete = "complete",
  current = "current",
}

export interface IProgressStepProps {
  label: ILabelComponent;
  status: IProgressItemStatus;
  secondaryLabel?: ILabelComponent;
  description?: IBodyComponent;
  className?: string;
  invalid?: boolean;
}

export interface IProgressIndicatorProps {
  steps: IProgressStepProps[];
  className?: string;
  currentIndex?: number;
  onChange?: Function;
}

export const ProgressIndicator = ({
  steps,
  currentIndex,
  className,
}: IProgressIndicatorProps) => {
  return (
    <CarbonProgressIndicator
      currentIndex={currentIndex}
      className={cx("hedi--progressindicator", className)}>
      {steps.map((step, index) => {
        return (
          <ProgressStep
            key={index}
            index={index}
            {...step.status}
            {...step.invalid}
            {...step.secondaryLabel}
            label={step.label.text ?? ""}
            secondaryLabel={step.secondaryLabel?.text ?? ""}
            description={
              step.description?.body ? (
                <HTML data={step.description.body} />
              ) : (
                ""
              )
            }
          />
        );
      })}
    </CarbonProgressIndicator>
  );
};
