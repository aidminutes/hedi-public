import {
  Column,
  FormGroup,
  FormGroupProps,
  Row,
} from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import {
  IButtonComponent,
  Button,
  ILabelComponent,
  Label,
} from "@/modules/components";
import { useInteractiveList } from "@/modules/react/hooks";
import { IWebsiteInput, WebsiteInputDefault } from "../../../types";
import { WebsiteInput, IWebsiteInputDefinition } from "./WebsiteInput";
import { Seperator } from "@/modules/common/client/components";

export type IWebsitesInputProps = {
  value?: IWebsiteInput[];
} & IWebsitesInputDefinition &
  IWebsitesInputConfig &
  Partial<Omit<FormGroupProps, "onChange">>;

export interface IWebsitesInputDefinition {
  websiteInputDefinition: IWebsiteInputDefinition;
  websitesLabel: ILabelComponent;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

interface IWebsitesInputConfig {
  defaultItem?: IWebsiteInput;
  maxCount?: number;
  onChange?: (websites: IWebsiteInput[]) => void;
}

export const WebsitesInput = (props: IWebsitesInputProps) => {
  const {
    value,
    websiteInputDefinition,
    websitesLabel,
    addButton,
    removeButton,
    defaultItem,
    maxCount,
    onChange,
    ...formGroupProps
  } = props;

  const {
    list: websiteInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(defaultItem ?? WebsiteInputDefault, value, onChange);
  const { labelText, ...restRemoveButton } = removeButton;
  return (
    <Row>
      <Column {...{ sm: 0, md: 8, lg: 4 }}></Column>
      <Column {...{ sm: 4, md: 8, lg: 12 }}>
        {websiteInputs.map((value, i) => (
          <WebsiteInput
            value={value}
            {...websiteInputDefinition}
            onChange={item => handleItemChange(item, i)}>
            <div className="hedi--flex-end">
              <Button
                {...restRemoveButton}
                iconDescription={labelText}
                hasIconOnly
                renderIcon={TrashCan32}
                onClick={_ => handleRemoveClick(i)}
              />
            </div>
          </WebsiteInput>
        ))}
        {(!maxCount || websiteInputs.length < maxCount) && (
          <>
            <Button
              {...addButton}
              renderIcon={Add32}
              onClick={handleAddClick}
            />
          </>
        )}
      </Column>
    </Row>
  );
};
