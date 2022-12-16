import {
  FeatureFlag,
  FeatureFlags,
  Seperator,
} from "@/modules/common/client/components";
import {
  Body,
  Button,
  Image,
  InlineNotification,
  Label,
} from "@/modules/components";
import React from "react";
import { ISearchMidwifeNoResultsDefinition } from "./getSearchMidwifeNoResultsDefinition";
import { Accordion, AccordionItem } from "carbon-components-react";
import { Send16 } from "@carbon/icons-react";

export type ISearchMidwifeNoResultsProps = {
  hasCareTypes?: boolean;
  onNetworkRequest: () => void;
} & ISearchMidwifeNoResultsDefinition;

export const SearchMidwifeNoResults = (props: ISearchMidwifeNoResultsProps) => {
  const {
    networkRequestButton,
    noResultsHeadline,
    noResultsImage,
    noResultsQuestionHelpBody,
    noResultsQuestionHelpLabel,
    noResultsQuestionNetworkRequestBody,
    noResultsQuestionNetworkRequestLabel,
    noResultsQuestionTodoBody,
    noResultsQuestionTodoLabel,
    noResultsQuestionWhyBody,
    noResultsQuestionWhyLabel,
    noResultsQuestionWhyImage,
    noResultsQuestionTodoImage,
    noResultsQuestionHelpImage,
    hasCareTypes,
    networkRequestNotification,
    onNetworkRequest,
  } = props;

  return (
    <div className="hedi--search-midwife-no-results">
      <Seperator />
      <Label {...noResultsHeadline} />
      <div className="hedi--search-midwife-no-results__image-container hedi--search-midwife-no-results__image-container--big">
        <Image {...noResultsImage} />
      </div>
      <Accordion
        size="xl"
        className="hedi--accordion hedi--accordion--with-border">
        <AccordionItem title={noResultsQuestionWhyLabel.text}>
          <Body {...noResultsQuestionWhyBody} />
          <div className="hedi--search-midwife-no-results__image-container--right">
            <div className="hedi--search-midwife-no-results__image-container hedi--search-midwife-no-results__image-container--small">
              <Image {...noResultsQuestionWhyImage} />
            </div>
          </div>
        </AccordionItem>
        <FeatureFlag name={FeatureFlags.networkRequestsActive}>
          <AccordionItem title={noResultsQuestionNetworkRequestLabel.text}>
            <Body {...noResultsQuestionNetworkRequestBody} />
            {!!hasCareTypes ? (
              <div className="hedi--search-midwife-no-results__button-container">
                <Button
                  {...networkRequestButton}
                  renderIcon={Send16}
                  onClick={() => onNetworkRequest()}
                />
              </div>
            ) : (
              <div className="hedi--search-midwife-no-results__button-container">
                <InlineNotification {...networkRequestNotification} />
              </div>
            )}
          </AccordionItem>
        </FeatureFlag>
        <AccordionItem title={noResultsQuestionTodoLabel.text}>
          <Body {...noResultsQuestionTodoBody} />
          <div className="hedi--search-midwife-no-results__image-container--right">
            <div className="hedi--search-midwife-no-results__image-container hedi--search-midwife-no-results__image-container--small">
              <Image {...noResultsQuestionTodoImage} />
            </div>
          </div>
        </AccordionItem>
        <AccordionItem title={noResultsQuestionHelpLabel.text}>
          <Body {...noResultsQuestionHelpBody} />
          <div className="hedi--search-midwife-no-results__image-container--right">
            <div className="hedi--search-midwife-no-results__image-container hedi--search-midwife-no-results__image-container--small">
              <Image {...noResultsQuestionHelpImage} />
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
