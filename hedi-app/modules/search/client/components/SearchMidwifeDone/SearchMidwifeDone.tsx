import { IPage } from "@/modules/common/types/IPage";
import { Body, Button, Image, Label } from "@/modules/components";
import { getSearchMidwifeDoneDefinition } from "./getSearchMidwifeDoneDefinition";

export const SearchMidwifeDone = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components" | "isPartOfWizard" | "wizard">;
}) => {
  const {
    footerImage,
    footerText,
    topImage,
    topImageCaptionLabel,
    headline,
    inboxButton,
    topicsButton,
    contentBody,
  } = getSearchMidwifeDoneDefinition(content.components);
  return (
    <>
      <div className="hedi--account__content-wrap hedi--account__content-wrap--blue hedi--account__content-wrap--more-space">
        <div className="hedi--account__headline hedi--centered hedi--login__headline">
          <Label {...headline} labelKind="h3" />
        </div>
        <div className="hedi--account__content mb-07">
          <Body {...contentBody} />
        </div>
        <div className="hedi--account__image-wrap">
          <div className="hedi--account__image">
            <Image {...topImage} />
          </div>
        </div>
        <div className="hedi--account__image-caption hedi--centered">
          <Label {...topImageCaptionLabel} />
        </div>
        <div className="hedi--account__footer">
          <div className="hedi--account__footer-buttons hedi--account__footer-buttons--column">
            <Button {...inboxButton} />
            <Button {...topicsButton} />
          </div>
        </div>
      </div>
      <div className="hedi--account__after-content-wrap">
        <div className="hedi--account__footer-text">
          <Body {...footerText} />
        </div>
        <div className="hedi--account__footer-image hedi--search-midwife-entry__footer-image">
          <Image {...footerImage} />
        </div>
      </div>
    </>
  );
};
