import Head from "next/head";
import {
  Column,
  Grid,
  Modal,
  OverflowMenu,
  Row,
} from "carbon-components-react";
import {
  Button,
  IButtonProps,
  ILabelComponent,
  ISelectProps,
  Label,
  Select,
  TextInput,
} from "@/modules/components";
import { SettingsAdjust16 } from "@carbon/icons-react";
import { ITextInputProps } from "@/modules/components/client/components/TextInput/transformTextInput";
import { useState } from "react";

const filterHeadline: ILabelComponent = {
  kind: "Label",
  labelKind: "h4",
  text: "Filter",
};
const plz: ITextInputProps = {
  id: "plz",
  type: "text",
  labelText: "Postleitzahl",
  placeholder: "PLZ",
};
const umkreis: ISelectProps = {
  id: "umkreis",
  labelText: "Umkreis",
  items: [
    { route: "", label: "+ 5 km" },
    { route: "", label: "+ 10 km" },
    { route: "", label: "+ 20 km" },
    { route: "", label: "+ 50 km" },
    { route: "", label: "+ 100 km" },
  ],
};

const resetButton: IButtonProps = {
  buttonKind: "ghost",
  labelText: "zurücksetzen",
};
const filterButton: IButtonProps = {
  buttonKind: "primary",
  labelText: "Filtern",
};
export default function ContactSearchFilterlayground() {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalState = () => setIsOpen(!isOpen);
  return (
    <div>
      <Head>
        <title>Contact Search Filter</title>
      </Head>
      <main style={{ padding: "50px" }}>
        <Grid>
          <Row>
            <h1>Contact Search Filter</h1>
          </Row>
          <Row>
            <Column>
              <OverflowMenu
                renderIcon={SettingsAdjust16}
                className="hedi--search-filter__menu">
                <div className="hedi--search-filter">
                  <Label
                    {...filterHeadline}
                    className="hedi--search-filter__headline"
                  />
                  <TextInput {...plz} className="hedi--search-filter__input" />
                  <Select {...umkreis} className="hedi--search-filter__input" />
                </div>
                <div className="hedi--search-filter__buttons">
                  <Button
                    {...filterButton}
                    onClick={() => handleModalState()}
                  />
                </div>
              </OverflowMenu>
            </Column>
          </Row>
          <Row>
            <Column>
              <Button
                renderIcon={SettingsAdjust16}
                buttonKind="ghost"
                onClick={() => handleModalState()}
                iconDescription={filterButton.labelText}
              />
              <Modal
                open={isOpen}
                modalHeading={filterHeadline.text}
                primaryButtonText={filterButton.labelText}
                size="xs"
                modalAriaLabel="Ein Modal mit den Filtern"
                onRequestClose={() => handleModalState()}>
                <TextInput {...plz} className="hedi--search-filter__input" />
                <Select {...umkreis} className="hedi--search-filter__input" />
              </Modal>
            </Column>
          </Row>
        </Grid>
      </main>
    </div>
  );
}
