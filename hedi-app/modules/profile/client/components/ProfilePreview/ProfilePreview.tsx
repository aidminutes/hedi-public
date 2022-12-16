import { Column, Row, Loading } from "carbon-components-react";

import { IPage } from "@/modules/common/types";

import { useProfilePreview } from "./useProfilePreview";
import { findButtonInstance, Button } from "@/modules/components";

export const ProfilePreview = ({ content }: { content: IPage }) => {
  const { myProfileRouteIsLoading } = useProfilePreview(content.lang);

  const profileEditButton = findButtonInstance(
    content.components,
    "profileEditButton"
  );
  return (
    <>
      {myProfileRouteIsLoading ? (
        <Loading />
      ) : (
        <Row>
          <Column>
            {profileEditButton && <Button {...profileEditButton} />}
          </Column>
        </Row>
      )}
    </>
  );
};
