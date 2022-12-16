import {
  Activation,
  TryLogin,
  TryRegistration,
  TryResetPassword,
} from "@/modules/auth/client";
import {
  IProgressIndicatorProps,
  IProgressItemStatus,
  IProgressStepProps,
  ProgressIndicator,
} from "@/modules/common/client/components/ProgressIndicator/ProgressIndicator";
import { requestPageById } from "@/modules/common/client/request/requestPageById";
import {
  GlobalWizardStates,
  IPage,
  IWizard,
  Wizards,
} from "@/modules/common/types";
import { Column, Loading, Row } from "carbon-components-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useSearchMidwifeStateMachine,
  SearchMidwifeStates as states,
} from "./StateManagement";

import {
  columnWidth,
  offsetColumnWidth,
} from "../SearchMidwife/SearchMidwifeWidget/columnHelper";
import { getPageType } from "@/modules/common/server/page";
import { IPageConfig, IShell } from "@/modules/shell/types";
import { useLayoutContext } from "@/modules/shell/client/contexts/LayoutContext";
import { TryProfile } from "@/modules/profile/client/components/TryProfile";
import { TrySearch } from "../TrySearch";
import { useSystemContext } from "@/modules/shell/client/contexts/SystemContext/SystemContext";
import { getSearchMidwifeWizardDefinition } from "./getSearchMidwifeWizardDefinition";
import { SearchMidwifeConfirmation } from "../SearchMidwifeConfirmation";
import { PregnancyEdit } from "@/modules/profile/client/components";
import { PasswordView } from "@/modules/auth/client/components/ResetPassword/PasswordView";
import { SearchMidwifeDone } from "../SearchMidwifeDone/SearchMidwifeDone";

export const SearchMidwifeWizard = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components">;
}): JSX.Element | null => {
  const {
    currentState,
    counter,
    next,
    back,
    wizardData,
    getWizardData,
    upsertWizardData,
  } = useSearchMidwifeStateMachine();
  const [pageData, setPageData] = useState<(IPage & IPageConfig) | undefined>(
    undefined
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const router = useRouter();
  const { defaultLocale } = router;
  const defaultLang = defaultLocale || "de";

  const {
    pgMidwifesearchLabel,
    pgMidwifesearchDesc,
    pgUserCardLabel,
    pgUserCardDesc,
    pgPrangnancyDataLabel,
    pgPrangnancyDataDesc,
    pgReviewLabel,
    pgReviewDesc,
    pgFinishLabel,
    pgFinishDesc,
  } = getSearchMidwifeWizardDefinition(content.components);

  const getPageIdFromState = (state: string) => {
    let id = "";
    switch (state) {
      case states.SEARCH_ENTRY:
        id = "searchMidwifeEntry";
        break;
      case states.SEARCH_RESULT:
        id = "searchMidwife";
        break;
      case GlobalWizardStates.LOGIN:
        id = "login";
        break;
      case GlobalWizardStates.REGISTER:
        id = "register";
        break;
      case GlobalWizardStates.REGISTER_ACTIVATE:
        id = "activate_account";
        break;
      case GlobalWizardStates.FORGOT_PASSWORD:
        id = "reset_password";
        break;
      case GlobalWizardStates.FORGOT_PASSWORD_ACTIVATE:
        id = "passwordChange";
        break;
      case states.VISIT_CARD:
        id = "PregnantUserCard";
        break;
      case states.PRAGNANCY_DATA:
        id = "pregnancy";
        break;
      case states.REVIEW:
        id = "SearchMidwifeConfirmation";
        break;
      case states.FINISH:
        id = "searchMidwifeDone";
        break;
    }
    return id;
  };

  const layoutContext = useLayoutContext();
  const systemContext = useSystemContext();

  useEffect(() => {
    const id = getPageIdFromState(currentState);
    if (id != "") {
      if (id != systemContext.sysData?.pageData?.id) {
        setPageData(undefined);
        requestPageById(id, defaultLang).then(page => {
          if (page) {
            page.isPartOfWizard = true;
            const pageType = getPageType(page);
            pageType.then(pageData => {
              pageData.isPartOfWizard = true;
              pageData.wizard = {
                id: Wizards.searchMidwifeWizard,
                next,
                back,
                getWizardData,
                upsertWizardData,
              } as IWizard;
              systemContext.setSysData({
                ...systemContext.sysData,
                wizardId: Wizards.searchMidwifeWizard,
                wizardState: currentState,
                wizardData: wizardData,
                pageData: pageData,
              });
              if (pageData.layout?.kind !== layoutContext.layout?.kind) {
                layoutContext.setCurrentLayout(pageData.layout); //The page will be reloaded.
              } else {
                setPageData(pageData);
              }
            });
          }
        });
      } else {
        setPageData({
          ...systemContext.sysData.pageData,
          wizard: {
            id: Wizards.searchMidwifeWizard,
            next,
            back,
            getWizardData,
            upsertWizardData,
          } as IWizard,
        });
      }
    }
    switch (currentState) {
      case states.VISIT_CARD:
        setCurrentIndex(1);
        break;
      case states.PRAGNANCY_DATA:
        setCurrentIndex(2);
        break;
      case states.REVIEW:
        setCurrentIndex(3);
        break;
      case states.FINISH:
        setCurrentIndex(4);
        break;
      default:
        setCurrentIndex(0);
        break;
    }
  }, [currentState, counter]);

  const stepItems: IProgressStepProps[] = [
    {
      label: pgMidwifesearchLabel,
      status: IProgressItemStatus.complete,
      secondaryLabel: {
        kind: "Label",
        labelKind: "span",
        text: "",
      },
    },
    {
      label: pgUserCardLabel,
      status: IProgressItemStatus.current,
      secondaryLabel: { kind: "Label", labelKind: "span", text: "" },
    },
    {
      label: pgPrangnancyDataLabel,
      status: IProgressItemStatus.current,
      secondaryLabel: { kind: "Label", labelKind: "span", text: "" },
    },
    {
      label: pgReviewLabel,
      status: IProgressItemStatus.current,
      secondaryLabel: { kind: "Label", labelKind: "span", text: "" },
    },
    {
      label: pgFinishLabel,
      status: IProgressItemStatus.current,
      secondaryLabel: { kind: "Label", labelKind: "span", text: "" },
    },
  ];

  const progressParams: IProgressIndicatorProps = {
    steps: stepItems,
    currentIndex,
  };

  const isProgressVisible =
    currentState == states.VISIT_CARD ||
    currentState == states.PRAGNANCY_DATA ||
    currentState == states.REVIEW ||
    currentState == states.FINISH;

  const pageId = getPageIdFromState(currentState);
  return (
    <>
      {isProgressVisible ? (
        <Row>
          <Column {...offsetColumnWidth} />
          <Column {...columnWidth}>
            <div className="hedi--search-midwife__progress-indicator">
              <ProgressIndicator {...progressParams}></ProgressIndicator>
            </div>
          </Column>
        </Row>
      ) : null}

      {!!pageData && pageId == pageData.id ? (
        <div>
          {currentState == GlobalWizardStates.LOGIN ? (
            <TryLogin content={pageData} key="login" />
          ) : null}
          {currentState == states.SEARCH_ENTRY ||
          currentState == states.SEARCH_RESULT ? (
            <TrySearch content={pageData} key="search" />
          ) : null}

          {currentState == states.VISIT_CARD ? (
            <TryProfile content={pageData} key="profile" />
          ) : null}
          {currentState == states.PRAGNANCY_DATA ? (
            <PregnancyEdit
              content={pageData as IPage}
              viewKind="all"
              key="pregancyedit"
            />
          ) : null}

          {currentState == GlobalWizardStates.REGISTER ? (
            <TryRegistration content={pageData} key="registration" />
          ) : null}

          {currentState == GlobalWizardStates.REGISTER_ACTIVATE ? (
            <Activation content={pageData} key="activation" />
          ) : null}

          {currentState == GlobalWizardStates.FORGOT_PASSWORD ? (
            <TryResetPassword content={pageData} key="resetPassword" />
          ) : null}

          {currentState == GlobalWizardStates.FORGOT_PASSWORD_ACTIVATE ? (
            <PasswordView content={pageData} key="reset-password-password" />
          ) : null}

          {currentState == states.REVIEW ? (
            <SearchMidwifeConfirmation
              content={pageData}
              key="searchMidwifeConfirmation"
            />
          ) : null}

          {currentState == states.FINISH ? (
            <SearchMidwifeDone content={pageData} key="searchMidwifeDone" />
          ) : null}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
