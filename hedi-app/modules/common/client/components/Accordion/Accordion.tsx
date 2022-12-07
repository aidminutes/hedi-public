import React from "react";
import {
  Accordion as CarbonAccordion,
  AccordionItem,
} from "carbon-components-react";
import { HTML } from "@/modules/react/html";
import { IBodyComponent, ILabelComponent } from "@/modules/components";
import cx from "classnames";

export interface IAccordionItemProps {
  title: ILabelComponent;
  text: IBodyComponent;
  className: string;
}

export interface IAccordionProps {
  data: IAccordionItemProps[];
  className?: string;
}

export const Accordion = ({ data, className }: IAccordionProps) => {
  return (
    <CarbonAccordion size="xl" className={cx("hedi--accordion", className)}>
      {data.map((item, index) => {
        return (
          <AccordionItem key={index} title={item.title.text}>
            <HTML data={item.text.body} />
          </AccordionItem>
        );
      })}
    </CarbonAccordion>
  );
};
