import { requestPageById } from "@/modules/common/client/request/requestPageById";
import { GlobalWizardStates, IPage, Wizards } from "@/modules/common/types";
import { IWithType } from "@/modules/model";
import { SearchMidwifeWizard } from "@/modules/search/client/components/SearchMidwifeWizard/SearchMidwifeWizard";
import {
  ISystemContextData,
  useSystemContext,
} from "@/modules/shell/client/contexts/SystemContext";
import { InlineLoading, Loading } from "carbon-components-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IActivateInfo, IActivation } from "../../../types";
import { Activation } from "./Activation";

export const TryActivation = ({
  content,
}: {
  content: IPage & IWithType;
}): JSX.Element | null => {
  if (content.type !== "Activation") return null;

  const router = useRouter();
  const systemContext = useSystemContext();

  const [isFinished, setIsFinished] = useState(false);
  const [wizardId, setWizardId] = useState<string>("");

  useEffect(() => {
    const { token } = (router.query as any) as IActivateInfo;
    if (token) {
      try {
        const info = JSON.parse(atob(decodeURI(token)));
        if (info.extra_info) {
          const sysData: ISystemContextData = JSON.parse(info.extra_info);
          sysData.wizardState = GlobalWizardStates.REGISTER_ACTIVATE;
          if (sysData.wizardId) {
            setWizardId(sysData.wizardId);
            requestPageById(sysData.wizardId, content.lang).then(page => {
              if (page) {
                sysData.redirectMode = true;
                sysData.redirectQuery = router.query;
                systemContext.setSysData(sysData);
                router.push(page.route);
              }
            });
          }
        } else {
          setIsFinished(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [router.query]);

  return !isFinished ? (
    <InlineLoading />
  ) : wizardId === "" ? (
    <Activation content={content as IActivation} />
  ) : null;
};
