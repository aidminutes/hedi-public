import { ILanguage } from "@/modules/common/types";
import { IService, IServiceWithChildren } from "@/modules/profile/types";
import { RankedScoredIProfile } from "@/modules/search/types";
import { useEffect, useState } from "react";

export const useServicesAndLanguagesFilter = ({
  onFilter,
  defaultSelectedLanguages,
  defaultSelectedServices,
  allLanguages,
  allServices,
  resultProfiles,
}: {
  onFilter?: (
    selectedLanguages: ILanguage[],
    selectedServices: IService[]
  ) => void;
  defaultSelectedLanguages: string[];
  defaultSelectedServices: string[];
  allLanguages: ILanguage[];
  allServices: IServiceWithChildren[];
  resultProfiles?: RankedScoredIProfile[];
}) => {
  allLanguages = filterLanguagesBasedOnSearchResults(
    allLanguages,
    resultProfiles
  );
  allServices = filterServicesBasedOnSearchResults(allServices, resultProfiles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(
    mapToSelectedLanguages(defaultSelectedLanguages, allLanguages)
  );
  const [selectedServices, setSelectedServices] = useState(
    mapToSelectedServices(defaultSelectedServices, allServices)
  );
  useEffect(() => {
    setSelectedLanguages(
      mapToSelectedLanguages(defaultSelectedLanguages, allLanguages)
    );
  }, [defaultSelectedLanguages]);
  useEffect(() => {
    setSelectedServices(
      mapToSelectedServices(defaultSelectedServices, allServices)
    );
  }, [defaultSelectedServices]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    resetStatesHandler();
  };
  const doFilterHandler = () => {
    if (onFilter) onFilter(selectedLanguages, selectedServices);
    setIsModalOpen(false);
  };
  const resetStatesHandler = () => {
    setSelectedLanguages(
      mapToSelectedLanguages(defaultSelectedLanguages, allLanguages)
    );
    setSelectedServices(
      mapToSelectedServices(defaultSelectedServices, allServices)
    );
    setIsModalOpen(false);
  };
  const serviceChangeHandler = (
    checked: boolean,
    route: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (checked) {
      setSelectedServices(prev => {
        const service = allServices
          .flatMap(group => group.children || [])
          .find(service => service.route === route);
        if (service) prev.push(service);
        return [...prev];
      });
    } else {
      setSelectedServices(prev => {
        const itemIndex = prev.findIndex(service => service.route === route);
        if (itemIndex !== -1) prev.splice(itemIndex, 1);
        return [...prev];
      });
    }
  };

  const getGroupServicesCountLabel = (groupLabel: string) => {
    const count = selectedServices.filter(
      service => service.parent?.label === groupLabel
    ).length;
    return count === 0 ? "" : ` (${count})`;
  };

  const languagesChangeHandler = (value: { selectedItems: ILanguage[] }) => {
    setSelectedLanguages(
      value.selectedItems.map(
        item =>
          allLanguages.find(lang => lang.route === item.route) as ILanguage
      )
    );
  };

  const languagesState = {
    items: allLanguages,
    selectedItems: selectedLanguages,
  };

  return {
    isModalOpen,
    selectedServices,
    languagesState,
    getGroupServicesCountLabel,
    openModal,
    closeModal,
    doFilterHandler,
    resetStatesHandler,
    serviceChangeHandler,
    languagesChangeHandler,
    allServices,
    allLanguages,
  };
};

const mapToSelectedLanguages = (
  items: string[],
  allLanguages: ILanguage[]
): ILanguage[] => {
  if (!items || !allLanguages || !items.length) return [];
  return items
    .map(selecteItem => allLanguages.find(lang => lang.route == selecteItem))
    .filter(x => x) as ILanguage[];
};

const mapToSelectedServices = (
  items: string[],
  allServices: IServiceWithChildren[]
): IService[] => {
  if (!items || !allServices || !items.length) return [];
  const allChildServices = allServices
    .flatMap(service => service.children)
    .filter(x => x) as IService[];
  return items
    .map(selecteItem =>
      allChildServices.find(service => service.route == selecteItem)
    )
    .filter(x => x) as IService[];
};

const filterLanguagesBasedOnSearchResults = (
  allLanguages: ILanguage[],
  resultProfiles?: RankedScoredIProfile[]
) => {
  if (!resultProfiles) return allLanguages;
  return allLanguages.filter(lang =>
    resultProfiles.find(profile =>
      profile.languageLevels.find(ll => ll.language.route == lang.route)
    )
  );
};

const filterServicesBasedOnSearchResults = (
  allServices: IServiceWithChildren[],
  resultProfiles?: RankedScoredIProfile[]
) => {
  if (!resultProfiles) return allServices;
  return allServices
    .map(group => {
      const filteredChildren = group.children?.filter(service =>
        resultProfiles.find(profile =>
          profile.services.find(ps => ps.route == service.route)
        )
      );
      return { ...group, children: filteredChildren };
    })
    .filter(group => group?.children?.length) as IServiceWithChildren[];
};
