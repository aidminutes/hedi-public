import { IPage } from "@/modules/common/types";
import { IWithType } from "@/modules/model";
import { getAboutViewDefinition } from "./getAboutViewDefinition";
import { Body, Label, Image, Button } from "@/modules/components";
import { Column, Grid, Row } from "carbon-components-react";
import { Send16 } from "@carbon/icons-react";
import React from "react";
import { SectionWave01 } from "@/modules/generalPages/about/client/components/AboutView/SectionWave01";
import { SectionWave02 } from "@/modules/generalPages/about/client/components/AboutView/SectionWave02";
import { SectionWave04 } from "@/modules/generalPages/about/client/components/AboutView/SectionWave04";
import { EULogoBar } from "@/modules/common/client/components";

export type IAboutView = IPage & {
  // props...
};

export const AboutView = ({ content }: { content: IAboutView }) => {
  const {
    headline,
    introText,
    introImage,
    roadmapHeadline,
    roadmapIntroText,
    roadmapWinter21Image,
    roadmapWinter21Text,
    roadmapSpring22Image,
    roadmapSpring22Text,
    roadmapSummer22Image,
    roadmapSummer22Text,
    roadmapFall22Image,
    roadmapFall22Text,
    targetgroupHeadline,
    targetgroupSubheadline,
    targetgroupMothersImage,
    targetgroupMothersHeadline,
    targetgroupMothersText,
    targetgroupMidwivesImage,
    targetgroupMidwivesHeadline,
    targetgroupMidwivesText,
    targetgroupDoctorsImage,
    targetgroupDoctorsHeadline,
    targetgroupDoctorsText,
    targetgroupSectionEndImage,
    contributionHeadline,
    contributionText,
    contactHediButton,
    creditsHeadline,
    creditsText,
    creditsPeopleColumnOne,
    creditsPeopleColumnTwo,
    teamHeadline,
    teamText,
    teamImage,
    logosColumnOne,
    logosColumnTwo,
    imageEULogo,
    imageLowerSaxonyEU,
    imageBfhdLogo,
  } = getAboutViewDefinition(content.components);
  return (
    <div className="hedi--about-page">
      {imageEULogo && imageLowerSaxonyEU && (
        <EULogoBar
          europeanUnionLogo={imageEULogo}
          europeForLowerSaxonyLogo={imageLowerSaxonyEU}
          bfhdLogo={imageBfhdLogo}
        />
      )}
      <div className="hedi--about-page__section--blue hedi--about-page__intro">
        <Grid>
          <Row>
            <Column lg={4} md={1} sm={0} />
            <Column lg={8} md={6} sm={4}>
              <Label
                {...headline}
                className="hedi--about-page__intro__headline"
              />
              <div className="hedi--about-page__intro__text">
                <Body {...introText} />
              </div>
              {introImage && (
                <div className="hedi--about-page__intro__image">
                  <Image
                    {...introImage}
                    sizes="(max-width: 671px) 373px, 504px"
                    placeholder="empty"
                    priority // NOTE: this can block the loading of the page if the image is too big or the connection too slow
                  />
                </div>
              )}
            </Column>
          </Row>
        </Grid>
      </div>

      <div className="hedi--about-page__section--white hedi--about-page__roadmap">
        <Grid>
          <Row>
            <Column lg={2} md={0} sm={0} />
            <Column lg={4} md={3} sm={4}>
              <Label
                {...roadmapHeadline}
                className="hedi--about-page__roadmap__headline"
              />
            </Column>
            <Column lg={6} md={4} sm={4}>
              <div className="hedi--about-page__roadmap__text">
                <Body {...roadmapIntroText} />
              </div>
            </Column>
          </Row>
          <Row>
            <Column lg={3} md={1} sm={1} />
            <Column lg={3} md={2} sm={2}>
              {roadmapWinter21Image && (
                <div className="hedi--about-page__roadmap__winter21__image">
                  <Image
                    {...roadmapWinter21Image}
                    sizes="(max-width: 671px) 304px, 256px"
                    placeholder="empty"
                  />
                </div>
              )}
            </Column>
            <Column lg={6} md={4} sm={4}>
              <div className="hedi--about-page__roadmap__winter21__text">
                <Body {...roadmapWinter21Text} />
              </div>
            </Column>
          </Row>
          <Row>
            <Column lg={3} md={1} sm={1} />
            <Column lg={3} md={2} sm={2}>
              {roadmapSpring22Image && (
                <div className="hedi--about-page__roadmap__spring22__image">
                  <Image
                    {...roadmapSpring22Image}
                    sizes="(max-width: 671px) 304px, 256px"
                    placeholder="empty"
                  />
                </div>
              )}
            </Column>
            <Column lg={6} md={4} sm={4}>
              <div className="hedi--about-page__roadmap__spring22__text">
                <Body {...roadmapSpring22Text} />
              </div>
            </Column>
          </Row>
          <Row>
            <Column lg={3} md={1} sm={1} />
            <Column lg={3} md={2} sm={2}>
              {roadmapSummer22Image && (
                <div className="hedi--about-page__roadmap__summer22__image">
                  <Image
                    {...roadmapSummer22Image}
                    sizes="(max-width: 671px) 304px, 256px"
                    placeholder="empty"
                  />
                </div>
              )}
            </Column>
            <Column lg={6} md={4} sm={4}>
              <div className="hedi--about-page__roadmap__summer22__text">
                <Body {...roadmapSummer22Text} />
              </div>
            </Column>
          </Row>
          <Row>
            <Column lg={3} md={1} sm={1} />
            <Column lg={3} md={2} sm={2}>
              {roadmapFall22Image && (
                <div className="hedi--about-page__roadmap__fall22__image">
                  <Image
                    {...roadmapFall22Image}
                    sizes="(max-width: 671px) 304px, 256px"
                    placeholder="empty"
                  />
                </div>
              )}
            </Column>
            <Column lg={6} md={4} sm={4}>
              <div className="hedi--about-page__roadmap__fall22__text">
                <Body {...roadmapFall22Text} />
              </div>
            </Column>
          </Row>
        </Grid>
        <SectionWave01 className="hedi--about-page__roadmap__wave" />
      </div>

      <div className="hedi--about-page__section--blue hedi--about-page__targetgroups">
        <Grid>
          <Row>
            <Column>
              <Label
                {...targetgroupHeadline}
                className="hedi--about-page__targetgroups__headline"
              />
              <Label
                {...targetgroupSubheadline}
                className="hedi--about-page__targetgroups__subheadline"
              />
              <hr className="hedi--about-page__targetgroups__line" />
            </Column>
          </Row>
          <Row className="hedi--about-page__targetgroups__mothers">
            <Column lg={2} md={0} sm={1} />
            <Column lg={4} md={3} sm={2}>
              {targetgroupMothersImage && (
                <div className="hedi--about-page__targetgroups__mothers__image">
                  <Image {...targetgroupMothersImage} sizes="352px" />
                </div>
              )}
            </Column>
            <Column
              lg={6}
              md={4}
              sm={4}
              className="hedi--about-page__targetgroups__mothers__text hedi--about-page__targetgroup">
              <Label {...targetgroupMothersHeadline} useAnchor />
              <Body {...targetgroupMothersText} />
            </Column>
          </Row>
        </Grid>
        <SectionWave02 className="hedi--about-page__targetgroups__mothers__wave" />
      </div>

      <div className="hedi--about-page__section--white">
        <Grid>
          <Row className="hedi--about-page__targetgroups__midwives">
            <Column lg={3} md={1} sm={1} />
            <Column lg={0} md={0} sm={2}>
              {targetgroupMidwivesImage && (
                <div className="hedi--about-page__targetgroups__midwives__image">
                  <Image {...targetgroupMidwivesImage} sizes="352px" />
                </div>
              )}
            </Column>
            <Column
              lg={6}
              md={4}
              sm={4}
              className="hedi--about-page__targetgroups__midwives__text hedi--about-page__targetgroup">
              <Label {...targetgroupMidwivesHeadline} useAnchor />
              <Body {...targetgroupMidwivesText} />
            </Column>
            <Column lg={4} md={3} sm={0}>
              {targetgroupMidwivesImage && (
                <div className="hedi--about-page__targetgroups__midwives__image">
                  <Image {...targetgroupMidwivesImage} sizes="352px" />
                </div>
              )}
            </Column>
          </Row>
        </Grid>
        <SectionWave04 className="hedi--about-page__targetgroups__midwives__wave" />
      </div>

      <div className="hedi--about-page__section--blue">
        <Grid>
          <Row className="hedi--about-page__targetgroups__doctors">
            <Column lg={2} md={0} sm={1} />
            <Column lg={4} md={3} sm={2}>
              {targetgroupDoctorsImage && (
                <div className="hedi--about-page__targetgroups__doctors__image">
                  <Image {...targetgroupDoctorsImage} sizes="352px" />
                </div>
              )}
            </Column>
            <Column
              lg={6}
              md={4}
              sm={4}
              className="hedi--about-page__targetgroups__doctors__text hedi--about-page__targetgroup">
              <Label {...targetgroupDoctorsHeadline} useAnchor />
              <Body {...targetgroupDoctorsText} />
            </Column>
          </Row>
          <Row>
            <Column lg={2} md={0} sm={0} />
            <Column lg={12} md={8} sm={4}>
              <div className="hedi--about-page__targetgroups__end-image">
                {targetgroupSectionEndImage && (
                  <Image
                    {...targetgroupSectionEndImage}
                    sizes="(max-size: 671px) 100vw, 80vw"
                  />
                )}
              </div>
            </Column>
          </Row>
        </Grid>
      </div>

      <div className="hedi--about-page__section--white">
        <Grid>
          <Row className="hedi--about-page__contribution">
            <Column lg={3} md={0} sm={0} />
            <Column lg={4} md={3} sm={4}>
              <Label
                {...contributionHeadline}
                className="hedi--about-page__contribution__headline"
              />
            </Column>
            <Column lg={6} md={4} sm={4}>
              <Body {...contributionText} />
              <Button
                {...contactHediButton}
                renderIcon={Send16}
                className="hedi--about-page__contribution__button hedi--rtl-icon"
              />
            </Column>
          </Row>
          <Row className="hedi--about-page__credits">
            <Column lg={3} md={0} sm={0} />
            <Column lg={4} md={3} sm={4}>
              <Label
                {...creditsHeadline}
                className="hedi--about-page__credits__headline"
              />
            </Column>
            <Column lg={6} md={4} sm={4}>
              <Body {...creditsText} />
            </Column>
          </Row>
          <Row className="hedi--about-page__credits-people">
            <Column lg={4} md={1} sm={0} />
            <Column
              lg={5}
              md={3}
              sm={4}
              className="hedi--about-page__credits-people__column1">
              <Body {...creditsPeopleColumnOne} />
            </Column>
            <Column
              lg={5}
              md={3}
              sm={4}
              className="hedi--about-page__credits-people__column2">
              <Body {...creditsPeopleColumnTwo} />
            </Column>
          </Row>
          <Row className="hedi--about-page__team">
            <Column lg={2} md={0} sm={0} />
            <Column lg={12} md={8} sm={4}>
              {teamImage && (
                <div className="hedi--about-page__team__image">
                  <Image {...teamImage} sizes="(max-size: 671px) 100vw, 80vw" />
                </div>
              )}
            </Column>
            <Column lg={2} md={0} sm={0} />
            <Column lg={3} md={0} sm={0} />
            <Column lg={4} md={3} sm={4}>
              <Label
                {...teamHeadline}
                className="hedi--about-page__team__headline"
              />
            </Column>
            <Column lg={7} md={4} sm={4}>
              <Body {...teamText} />
            </Column>
          </Row>
          <Row>
            <Column lg={7} md={3} sm={0} />
            <Column lg={7} md={5} sm={4} className="hedi--about-page__logos">
              {logosColumnOne && (
                <div className="image">
                  <Image
                    {...logosColumnOne}
                    sizes="(max-size: 671px) 100vw, 50vw"
                  />
                </div>
              )}
              {logosColumnTwo && (
                <div className="image">
                  <Image
                    {...logosColumnTwo}
                    sizes="(max-size: 671px) 100vw, 50vw"
                  />
                </div>
              )}
            </Column>
          </Row>
        </Grid>
      </div>
    </div>
  );
};
