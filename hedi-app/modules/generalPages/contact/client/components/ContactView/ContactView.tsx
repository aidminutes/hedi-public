import { Column, Grid, Row } from "carbon-components-react";
import { Body, Label, Image } from "@/modules/components";
import { IPage } from "@/modules/common/types";
import { transformContactPage } from "./transformContactPage";
import { useContactView } from "./useContactView";
import { getContactDefinition } from "./getContactDefinition";

export const ContactView = ({ content }: { content: IPage }) => {
  const { descriptionBody, moreContactsBody, pageTitle } = getContactDefinition(
    content.components
  );
  const { emailLinks } = transformContactPage(content.components);
  const { emailsBody } = useContactView(emailLinks, content.lang);
  return (
    <div className="hedi--contact-page__wrap">
      <Grid>
        <Row className="hedi--contact-page-content">
          <Column md={0} lg={3} sm={0} />
          <Column>
            <Grid>
              <Row>
                <Column>
                  {pageTitle && (
                    <Label
                      className="hedi--contact-page__title"
                      {...pageTitle}
                    />
                  )}
                </Column>
              </Row>
              <Row>
                <Column md={4} lg={8} sm={4} className="">
                  {descriptionBody && <Body {...descriptionBody} />}
                  {emailsBody && (
                    <div className="hedi--contact-page-emails">
                      {" "}
                      <Body {...emailsBody} />
                    </div>
                  )}
                </Column>
                <Column md={1} sm={0} lg={1} />
                <Column
                  md={3}
                  lg={7}
                  sm={4}
                  className="hedi--contact-page__more">
                  {moreContactsBody && <Body {...moreContactsBody} />}
                </Column>
              </Row>
            </Grid>
          </Column>
          <Column md={0} lg={3} sm={0} />
        </Row>
      </Grid>
    </div>
  );
};
