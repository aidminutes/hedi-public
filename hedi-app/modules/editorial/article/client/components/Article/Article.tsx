import { ComponentRenderer, Link } from "@/modules/components/client";
import { Column, Grid, Row } from "carbon-components-react";
import { ActionBar, useActionBarActions } from "../ActionBar";
import { HeroImage } from "@/modules/common/client/components";
import { RelatedProfiles } from "@/modules/profile/client/components/RelatedProfiles";
import { AudioPlayer } from "@/modules/components/client";
import { TagList } from "@/modules/common/client/components";
import {
  BreadCrumb,
  parseIBreadCrumb,
} from "@/modules/shell/client/components/BreadCrumb";
import { IArticleView } from "../../../types/IArticleView";
import { useArticleContent } from "./useArticleContent";

export const Article = ({
  content,
}: {
  content: IArticleView;
}): JSX.Element => {
  const { route, posterImage, relatedProfiles, tags } = content;

  const {
    backLink,
    actionBarGroup,
    notificationText,
    articleRelatedProfilesDefinition,
    tagListHeadline,
    profileCardDefinition,
  } = content;

  const breadcrumbs = parseIBreadCrumb(content, backLink);

  const {
    content: { route: actualContentRoute, label, audio, components },
    localeInfo,
    languageSwitchActions,
  } = useArticleContent(content);

  const { actions, showPlayer, printProfile } = useActionBarActions(
    actionBarGroup,
    !!audio,
    languageSwitchActions,
    actualContentRoute
  );
  // TODO needs rework when we know the finished layout
  return (
    <>
      {/* --- Section Header --- */}
      <div className="hedi--titlegroup__container">
        {posterImage && <HeroImage layout="fill" {...posterImage} />}
        <Grid className="hedi--article-page hedi--article-page__print--no-profiles">
          <Row condensed narrow>
            <Column lg={3} md={1} sm={0} className="hedi--print__hide" />
            <Column
              sm={4}
              md={{ span: 6 }}
              lg={{ span: 10 }}
              className="hedi--titlegroup hedi--titlegroup--article hedi--print__full-width">
              <BreadCrumb {...breadcrumbs} />
              <h1
                className={
                  printProfile === "Profiles"
                    ? "hedi--article__print--headline-only-profile"
                    : ""
                }
                style={{ direction: localeInfo?.isRTL ? "rtl" : "ltr" }}>
                {label}
              </h1>
            </Column>
            <Column lg={3} md={1} sm={0} className="hedi--print__hide" />
          </Row>
        </Grid>
      </div>
      {/* --- Section Article Body --- */}
      <article
        className={`hedi--article${
          printProfile === "Article"
            ? " hedi--article__print--no-profiles"
            : printProfile === "Profiles"
            ? " hedi--article__print--only-profiles"
            : " hedi--article__print--profiles-and-article"
        }`}>
        <Grid className="hedi--article-page">
          <Row>
            <Column lg={3} md={1} sm={0} className="hedi--print__hide" />
            <Column
              lg={{ span: 10 }}
              md={{ span: 6 }}
              className="hedi--print__full-width">
              <ActionBar actions={actions.main} />
              <div className="hedi--action-bar__sub-actions-container">
                {audio && (
                  <AudioPlayer
                    kind="Audio"
                    labelText={audio.label}
                    route={audio.route}
                    mimeType={audio.mime}
                    visible={showPlayer}
                  />
                )}
              </div>
              {components && (
                <ComponentRenderer
                  className={`hedi--article-page__content${
                    localeInfo?.isRTL ? " hedi--article-page__content--rtl" : ""
                  }`}
                  route={route}
                  components={components}
                  copyLinkNotificationText={notificationText.notificationText}
                />
              )}
              {tags.length > 0 && (
                <TagList tags={tags} headline={tagListHeadline?.text} />
              )}
            </Column>

            <Column lg={3} md={1} sm={0} className="hedi--print__hide" />
          </Row>
        </Grid>

        {relatedProfiles?.length > 0 && (
          <>
            <RelatedProfiles
              profiles={relatedProfiles}
              articleTags={tags}
              {...articleRelatedProfilesDefinition}
              {...profileCardDefinition}
            />
          </>
        )}
      </article>
    </>
  );
};
