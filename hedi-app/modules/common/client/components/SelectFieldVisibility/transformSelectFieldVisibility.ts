import { ISelectComponent } from "@/modules/components";
import { IPersonalProfileDistinguisher } from "@/modules/profile/types";

export interface ISelectFieldVisibilty
  extends ISelectComponent,
    IPersonalProfileDistinguisher {
  value?: number;
  onChange?: (value: number) => void;
}

export function transformSelectFieldVisibilty(props: ISelectFieldVisibilty) {
  const { value, items, onChange, personalContext } = props;

  const wrapClass = `hedi--field-visibility${
    personalContext ? ` hedi--field-visibility--personal-context` : ""
  }`;

  return {
    items,
    value: value || 0,
    onChange: onChange || (() => console.log("Function missing")),
    personalContext,
    wrapClass,
  };
}
