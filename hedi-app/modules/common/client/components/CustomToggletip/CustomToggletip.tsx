import { Button, IButtonComponent } from "@/modules/components";
import { useOnClickOutside } from "@/modules/react/hooks";
import { CarbonIconType } from "@carbon/icons-react";
import { ForwardRefReturn } from "carbon-components-react/typings/shared";
import React, { useState, useRef } from "react";

export interface ICustomToggletipProps {
  children: React.ReactNode;
  label: string;
  className?: string;
  icon?: CarbonIconType;
}

export const CustomToggletip = (props: ICustomToggletipProps) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleToggle = () => setIsOpen(!isOpen);
  useOnClickOutside(ref, () => setIsOpen(false));
  return (
    <div
      ref={ref}
      className={`hedi--toggletip${
        props.className !== undefined ? ` ${props.className}` : ""
      }`}>
      <Button
        buttonKind="primary"
        className="hedi--toggletip__button"
        text={props.label}
        renderIcon={props.icon || null}
        onClick={() => handleToggle()}>
        {props.label}
      </Button>
      <div
        className={`hedi--toggletip__content${
          isOpen
            ? " hedi--toggletip__content--visible"
            : " hedi--toggletip__content--hidden"
        }`}>
        {props.children}
      </div>
    </div>
  );
};
