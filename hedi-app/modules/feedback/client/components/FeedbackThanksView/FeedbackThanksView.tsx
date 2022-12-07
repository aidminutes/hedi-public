import { Button, Body } from "@/modules/components";
import { ArrowLeft16 } from "@carbon/icons-react";
import { useFeedbackThanksView } from "./useFeedbackThanksView";
import { useRouter } from "next/router";
import { IPage } from "@/modules/common/types";

export const FeedbackThanksView = (props: { content: IPage }) => {
  const { backRoute, backButton, body } = useFeedbackThanksView(props);
  const router = useRouter();

  return (
    <>
      {body && <Body {...body} />}
      <div className="hedi-app-page-link-buttons">
        {backButton && (
          <Button
            {...backButton}
            renderIcon={ArrowLeft16}
            onClick={() => router.push(backRoute)}
          />
        )}
      </div>
    </>
  );
};
