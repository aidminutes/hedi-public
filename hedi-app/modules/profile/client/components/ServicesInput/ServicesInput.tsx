import { FormGroup, FormGroupProps } from "carbon-components-react";
import { IGroupComponent, ILabelComponent } from "@/modules/components";
import { ServiceSelect } from "./ServiceSelect";
import { useServicesInput } from "./useServicesInput";

export type IServicesInputProps = {
  value?: string[];
  professionFilter?: string;
} & IServicesInputDefinition &
  IServicesInputConfig &
  Partial<Omit<FormGroupProps, "onChange">>;

export interface IServicesInputDefinition {
  serviceSelectGroup: Pick<IGroupComponent, "components" | "id" | "labelText">;
  addServiceLabel: ILabelComponent;
}

export interface IServicesInputConfig {
  onChange?: (services: string[]) => void;
}

// NOTE: wraps service selects and handles:
// - filtering available service groups (=selects) along profession route value
// - grouping of services which are stored as plain list on a profile
// TODO filter out select items which are also available as select label = service group parent
export const ServicesInput = (props: IServicesInputProps) => {
  const {
    value,
    professionFilter,
    serviceSelectGroup: { components, id, labelText },
    addServiceLabel,
    onChange,
    ...formGroupProps
  } = props;

  const serviceSelects = useServicesInput(
    value,
    components,
    professionFilter,
    onChange
  );

  return (
    <FormGroup
      id={id}
      legendText={<h2>{labelText ?? ""}</h2>}
      {...formGroupProps}>
      {serviceSelects.map(select => (
        <ServiceSelect
          {...select}
          addServiceText={addServiceLabel.text}
          key={select.id}
        />
      ))}
    </FormGroup>
  );
};
