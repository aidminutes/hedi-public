import { IPage } from "@/modules/common/types";
import { IWithType } from "@/modules/model";
import { AboutView, IAboutView } from "../../about/client/components";
import { ContactView } from "../../contact/client/components/ContactView";
import { Faq } from "../../faq/client/components/Faq/Faq";

export const TryGeneralPages = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null => {
  switch (content.type) {
    case "About":
      return <AboutView content={content as IAboutView} key="about" />;
    case "Contact":
      return <ContactView content={content as IPage} key="contact" />;
    case "FAQ":
      return <Faq content={content as IPage} key="faq" />;
    default:
      return null;
  }
};
