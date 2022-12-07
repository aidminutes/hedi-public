import React from "react";
import { Accordion, AccordionItem } from "carbon-components-react";

export interface IListAccordion {
  title: string;
  elements: string[];
  emptyStateText: string;
}

export const ListAccordion = ({
  title,
  elements,
  emptyStateText,
}: IListAccordion) => {
  const count = elements.length;
  const compositeTitle = count > 0 ? `${title} (${count})` : title;

  return (
    <div className="hedi--list-accordion">
      <Accordion size="md">
        <AccordionItem title={compositeTitle}>
          {count > 0 && (
            <ul className="hedi--list-accordion__elements">
              {elements.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
          )}
          {count === 0 && (
            <p className="hedi--list-accordion__empty-state-text">
              {emptyStateText}{" "}
            </p>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};
