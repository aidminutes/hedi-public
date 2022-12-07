import { IPage } from "@/modules/common/types";
import { useRouter } from "next/router";
import { isNewsBarExpired } from "./newsBarHelper";
import { IWithType } from "@/modules/model";
import { LandingPageViewDefinition } from ".";
import { Body, Button, Label } from "@/modules/components";
import NextLink from "next/link";
import { AspectRatio, Column, Grid, Row } from "carbon-components-react";
import {
  EULogoBar,
  Accordion,
  IAccordionItemProps,
  NewsBar,
} from "@/modules/common/client/components";
import { Image } from "@/modules/components";
import { SectionOneEndShape } from "./SectionOneEndShape";
import { SectionTwoAndThreeEndShape } from "./SectionTwoAndThreeEndShape";
import { ArrowRight16 } from "@carbon/icons-react";

export type ILandingPageView = IPage & {
  componentDefinitions: LandingPageViewDefinition;
  faqTeaserQuestions: IAccordionItemProps[];
};

export const TryLandingPage = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null => {
  return content.type == "LandingPage" ? (
    <LandingPageView content={content as ILandingPageView} />
  ) : null;
};

export const LandingPageView = ({ content }: { content: ILandingPageView }) => {
  const {
    bodySectionOne,
    addtionalBodySectionOne,
    buttonTwoSectionOne,
    buttonOneSectionThree,
    bodySectionThree,
    bodySectionTwo,
    bodySectionOneTwo,
    callToActionSectionThree,
    buttonOneSectionOne,
    imageEULogo,
    imageLowerSaxonyEU,
    imageBfhdLogo,
    imageSectionOne,
    imageSectionTwo,
    imageSectionThree,
    imageWomanWithChild,
    imageMidwife,
    imageDoctor,
    headlineFAQ,
    buttonFAQ,
    headlineSectionFour,
    headlineSectionOne,
    headlineSectionThree,
    headlineSectionTwo,
    headlineSectionTwoAndThree,
    headlineSectionOneTwo,
    headlineSectionTwoNew,
    linkToAboutPageMothers,
    linkToAboutPageMidwives,
    linkToAboutPageDoctors,
    newsBarText,
    newsBarDownloadFile,
    newsBarDownloadFileText,
    newsBarExpirationDate,
  } = content.componentDefinitions;

  const { locale } = useRouter();
  const faqTeaserQuestions = content.faqTeaserQuestions;

  return (
    <div className="hedi--landing-page">
      {imageEULogo && imageLowerSaxonyEU && (
        <EULogoBar
          europeanUnionLogo={imageEULogo}
          europeForLowerSaxonyLogo={imageLowerSaxonyEU}
          bfhdLogo={imageBfhdLogo}
        />
      )}
      {!isNewsBarExpired(newsBarExpirationDate) && (
        <NewsBar
          text={newsBarText}
          linkText={newsBarDownloadFileText}
          file={newsBarDownloadFile}
        />
      )}
      <div className="hedi--landing-page__section--blue hedi--landing-page__section-one">
        <Grid>
          <Row>
            <Column lg={1} md={0} sm={0} />
            <Column lg={7} md={5} sm={4}>
              {/* <Label
                labelKind="span"
                text="HEDI"
                className="hedi--landing-page__section-one__product-name"
              /> */}
              <Label
                {...headlineSectionOne}
                className="hedi--landing-page__section-one__headline"
              />
              <div className="hedi--landing-page__section-one__text">
                <Label
                  {...headlineSectionTwo}
                  className="hedi--landing-page__sub-headline"
                />
                <Label {...bodySectionTwo} />
                {(locale === "de" || locale === "en") && (
                  <div className="hedi--landing-page__section-one-two">
                    <Label
                      {...headlineSectionOneTwo}
                      className="hedi--landing-page__sub-headline"
                    />
                    <Label {...bodySectionOneTwo} />
                  </div>
                )}

                {(locale === "de" || locale === "en") && (
                  <Body {...addtionalBodySectionOne} />
                )}
              </div>
              <div className="hedi--landing-page__section-one__button-container">
                <Button
                  {...buttonOneSectionOne}
                  className="hedi--landing-page__section__button hedi--landing-page__section-one__button"
                />
                <Button
                  {...buttonTwoSectionOne}
                  className="hedi--landing-page__section__button"
                />
              </div>
            </Column>
            <Column lg={1} md={0} sm={0} />
            <Column
              lg={6}
              md={3}
              sm={4}
              className="hedi--landing-page__section-one__image-container">
              <div className="hedi--landing-page__section-one__image">
                {imageSectionOne && (
                  <Image
                    {...imageSectionOne}
                    sizes="(max-width: 671px) 100vw, 500px"
                    placeholder="empty"
                    priority // NOTE: this can block the loading of the page if the image is too big or the connection too slow
                  />
                )}
              </div>
            </Column>
          </Row>
        </Grid>
        <SectionOneEndShape className="hedi--landing-page__section-one--end" />
      </div>
      <div className="hedi--landing-page__section--white hedi--landing-page__section-two-and-three">
        <Grid>
          <Row>
            <Column lg={2} md={0} sm={0} />
            <Column lg={6} md={3} sm={4}>
              <div className="hedi--landing-page__circles">
                <div className="hedi--landing-page__circles__image-1">
                  {imageSectionTwo && (
                    <Image
                      {...imageSectionTwo}
                      sizes="(max-width: 671px) 50vw, 256px"
                      placeholder="empty"
                      priority
                    />
                  )}
                </div>
                <div className="hedi--landing-page__circles__image-2">
                  {imageSectionThree && (
                    <Image
                      {...imageSectionThree}
                      sizes="(max-width: 671px) 50vw, 256px"
                      placeholder="empty"
                      priority
                    />
                  )}
                </div>
              </div>
            </Column>
            <Column lg={6} md={4} sm={4}>
              <div className="hedi--landing-page__section-two">
                <Label
                  {...headlineSectionTwoAndThree}
                  className="hedi--landing-page__section-two-and-three__headline"
                />
                {(locale === "de" || locale === "en") && (
                  <Label
                    {...headlineSectionTwoNew}
                    className="hedi--landing-page__sub-headline"
                  />
                )}
                <Label
                  {...bodySectionOne}
                  className="hedi--landing-page__section-one__text--first"
                />
              </div>
              <div className="hedi--landing-page__section-three">
                <Label
                  {...headlineSectionThree}
                  className="hedi--landing-page__sub-headline"
                />
                <Label {...bodySectionThree} />
                <Button
                  {...buttonOneSectionThree}
                  className="hedi--landing-page__section__button hedi--landing-page__section-three__button"
                />
                <Button
                  {...callToActionSectionThree}
                  className="hedi--landing-page__section__button"
                />
              </div>
            </Column>
          </Row>
        </Grid>
        <SectionTwoAndThreeEndShape className="hedi--landing-page__section-two-and-three--end" />
      </div>
      <div className="hedi--landing-page__section--blue hedi--landing-page__section-four">
        <Grid>
          <Row>
            <Column lg={2} md={1} sm={0} />
            <Column lg={6} md={5} sm={4}>
              <Label
                {...headlineSectionFour}
                className="hedi--landing-page__section-four__headline"
              />
            </Column>
          </Row>
          <Row className="hedi--landing-page__section-four__links">
            <Column lg={2} md={1} sm={1} />
            <Column
              lg={4}
              md={2}
              sm={2}
              className="hedi--landing-page__section-four__links__container">
              <NextLink href={linkToAboutPageMothers.href}>
                <a className="hedi--landing-page__section-four__links__hover-area">
                  <div className="hedi--landing-page__section-four__links__image-1">
                    {imageWomanWithChild && <Image {...imageWomanWithChild} />}
                  </div>
                  <AspectRatio
                    ratio="2x1"
                    className="hedi--landing-page__section-four__links__link-bg">
                    <p className="hedi--landing-page__section-four__links__link">
                      {linkToAboutPageMothers.labelText}
                    </p>
                  </AspectRatio>
                </a>
              </NextLink>
            </Column>
            <Column lg={0} md={0} sm={1} />
            <Column lg={0} md={0} sm={1} />
            <Column
              lg={4}
              md={2}
              sm={2}
              className="hedi--landing-page__section-four__links__container">
              <NextLink href={linkToAboutPageMidwives.href}>
                <a className="hedi--landing-page__section-four__links__hover-area">
                  <div className="hedi--landing-page__section-four__links__image-2">
                    {imageMidwife && <Image {...imageMidwife} />}
                  </div>
                  <AspectRatio
                    ratio="2x1"
                    className="hedi--landing-page__section-four__links__link-bg">
                    <p className="hedi--landing-page__section-four__links__link">
                      {linkToAboutPageMidwives.labelText}
                    </p>
                  </AspectRatio>
                </a>
              </NextLink>
            </Column>
            <Column lg={0} md={0} sm={1} />
            <Column lg={0} md={0} sm={1} />
            <Column
              lg={4}
              md={2}
              sm={2}
              className="hedi--landing-page__section-four__links__container">
              <NextLink href={linkToAboutPageDoctors.href}>
                <a className="hedi--landing-page__section-four__links__hover-area">
                  <div className="hedi--landing-page__section-four__links__image-1">
                    {imageDoctor && <Image {...imageDoctor} />}
                  </div>
                  <AspectRatio
                    ratio="2x1"
                    className="hedi--landing-page__section-four__links__link-bg">
                    <p className="hedi--landing-page__section-four__links__link">
                      {linkToAboutPageDoctors.labelText}
                    </p>
                  </AspectRatio>
                </a>
              </NextLink>
            </Column>
          </Row>
          <Row>
            <Column lg={2} md={1} sm={0} />
            <Column lg={12} md={6} sm={4}>
              <Label
                {...headlineFAQ}
                className="hedi--landing-page__section-faq__headline"
              />
              <Accordion
                data={faqTeaserQuestions}
                className="hedi--landing-page__section-faq__accordion"
              />
              <Button {...buttonFAQ} renderIcon={ArrowRight16} />
            </Column>
          </Row>
        </Grid>
      </div>
    </div>
  );
};
