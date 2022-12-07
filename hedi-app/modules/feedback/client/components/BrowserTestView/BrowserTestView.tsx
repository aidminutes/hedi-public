import {
  Button,
  Body,
  InlineNotification,
  Label,
  Image,
} from "@/modules/components";
import {
  Column,
  Grid,
  InlineLoading,
  Row,
  Link as CarbonLink,
} from "carbon-components-react";
import { getBrowserTestDefinition } from "./getBrowserTestDefinition";
import { useBrowserTestView } from "./useBrowserTestView";
import { IBrowserTestView } from "@/modules/feedback/types/IBrowserTestView";
import { ArrowLeft16 } from "@carbon/icons-react";
import Link from "next/link";

export const BrowserTestView = (props: { content: IBrowserTestView }) => {
  const {
    headline,
    sendButton,
    body,
    failureInlineNotification,
    successImage,
    successText,
    backToHomeLink,
  } = getBrowserTestDefinition(props);
  const {
    sendBrowserData,
    didSucceed,
    hasFailed,
    isSending,
  } = useBrowserTestView();
  return (
    <Grid className="hedi--browser-test">
      <Row>
        <Column lg={8} md={6} sm={4}>
          {headline && (
            <Label {...headline} className="hedi--browser-test__headline" />
          )}
          {body && <Body {...body} />}
          <div className="hedi-app-page-link-buttons">
            {sendButton && !didSucceed && (
              <Button
                {...sendButton}
                onClick={() => sendBrowserData()}
                renderIcon={isSending ? InlineLoading : undefined}
                disabled={isSending}
              />
            )}
          </div>
          {hasFailed && <InlineNotification {...failureInlineNotification} />}
          {didSucceed && (
            <div className="hedi--browser-test__success">
              <div className="hedi--browser-test__success--image">
                {successImage && (
                  <Image {...successImage} layout="fill" objectFit="contain" />
                )}
              </div>
              {successText && <Label {...successText} />}
            </div>
          )}
          {backToHomeLink && (
            <Link href={backToHomeLink.href} passHref>
              <CarbonLink className="hedi--browser-test__back2home">
                <ArrowLeft16 />
                <span className="hedi--browser-test__back2home__text">
                  {backToHomeLink.labelText}
                </span>
              </CarbonLink>
            </Link>
          )}
        </Column>
      </Row>
    </Grid>
  );
};
