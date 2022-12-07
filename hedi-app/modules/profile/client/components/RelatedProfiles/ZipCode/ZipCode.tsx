import React, { FormEventHandler } from "react";
import { Column, Grid, Row, Form } from "carbon-components-react";
import { Button, TextInput } from "@/modules/components";
import { Location24 } from "@carbon/icons-react";
import { Location } from "@/modules/map/types";
import { IZipCodeDefinition } from "./types";

export type IZipCodeProps = {
  userLocation: Location | null;
  relatedProfilesHeadline: string;
  isInvalid: boolean;
  value: string;
  handleZipCodeSubmit: FormEventHandler<HTMLFormElement>;
  handleZipCodeChange: (value: string) => void;
} & IZipCodeDefinition;

export const ZipCode: React.FC<IZipCodeProps> = props => {
  const {
    zipCodeHeadline,
    zipCodeHelperText,
    zipCodeButton,
    zipCodeErrorMessage,
    zipCodeErrorHeadline,
    zipCodeErrorHelperText,
    relatedProfilesHeadline,
    zipCodePlaceHolderText,
    handleZipCodeSubmit,
    handleZipCodeChange,
    value,
    isInvalid,
    userLocation,
  } = props;
  return (
    <Form
      onSubmit={(e: any) => handleZipCodeSubmit(e)}
      className="hedi--zip-code">
      <Grid>
        <Row>
          <Column lg={3} md={1} sm={0}></Column>
          <Column lg={10} md={6} sm={6} className="hedi--zip-code__content">
            <div
              className={
                userLocation
                  ? "hedi--zip-code__svg-container"
                  : "hedi--zip-code__svg-container hedi--zip-code__svg-container--error"
              }
            />
            <div>
              <h3 className="hedi--zip-code__headline">
                {userLocation
                  ? zipCodeHeadline?.text
                  : zipCodeErrorHeadline?.text}
              </h3>
              {userLocation ? (
                <h4 className="hedi--zip-code__subheadline">
                  <Location24 className="hedi--zip-code__subheadline__icon" />
                  {relatedProfilesHeadline}
                  <span>&nbsp;{userLocation?.zipCode}</span>
                  <span>&nbsp;{userLocation?.city}</span>
                </h4>
              ) : null}
              <p className="hedi--zip-code__helper-text hedi--print__hide">
                {userLocation
                  ? zipCodeHelperText?.text
                  : zipCodeErrorHelperText?.text}
              </p>
              <div className="hedi--zip-code__input-container hedi--print__hide">
                <TextInput
                  id="zipcode"
                  labelText={""}
                  type="text"
                  onKeyDown={evt =>
                    (evt.key === "e" || evt.key === "E") && evt.preventDefault()
                  }
                  invalid={isInvalid}
                  invalidText={zipCodeErrorMessage?.text}
                  placeholder={zipCodePlaceHolderText?.text}
                  onChange={e => handleZipCodeChange(e.target.value)}
                  value={value}
                />
                <Button
                  className="hedi--zip-code__input-container__button"
                  buttonKind="primary"
                  size="field"
                  {...zipCodeButton}
                />
              </div>
            </div>
          </Column>
          <Column lg={3} md={2} sm={0}></Column>
        </Row>
      </Grid>
    </Form>
  );
};
