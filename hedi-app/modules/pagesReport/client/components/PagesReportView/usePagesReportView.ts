import {
  Component,
  IColumnComponent,
  IGroupComponent,
} from "@/modules/components";
import { IRadioButtonGroupComponent } from "@/modules/components/types/IRadioButtonGroupComponent";
import { IPage } from "@/modules/common/types";
import { getPagesReport } from "../../request";
import { useEffect, useState } from "react";

interface IComponentsTranslationInfo {
  pageId: string;
  pageTitle: string;
  componentType: string;
  componentPath: string;
  property: string;
  translations: Record<string, string>;
}

export function usePagesReportView() {
  const { data: pages, isValidating: isLoading } = getPagesReport();
  const [componentsTranslations, setComponentsTranslations] = useState<
    IComponentsTranslationInfo[]
  >([]);
  const [
    showOnlyRowsWithMissingTranslation,
    setShowOnlyRowsWithMissingTranslation,
  ] = useState(false);
  const showOnlyMissingTranslationsHandler = (checked: boolean) =>
    setShowOnlyRowsWithMissingTranslation(checked);
  const [langs, setLangs] = useState<string[]>(["de"]);
  useEffect(() => {
    const languages = !pages
      ? ["de"]
      : pages
          .map(page => page.lang)
          .reduce((distinct, lang) => {
            if (!distinct.includes(lang)) distinct.push(lang);
            return distinct;
          }, [] as string[]);
    setLangs(languages);
    if (pages) {
      const translations: IComponentsTranslationInfo[] = [];
      const groupedPages = pages.reduce((result, page) => {
        if (!result[page.id]) result[page.id] = [];
        result[page.id].push(page);
        return result;
      }, {} as Record<string, IPage[]>);
      for (const pageId in groupedPages) {
        const germanPage = groupedPages[pageId].find(page => page.lang == "de");
        germanPage?.components.map(component => {
          const componentInOtherLangs = groupedPages[pageId]
            .filter(page => page.lang != "de")
            .map(
              page =>
                ({
                  [page.lang]: page.components.find(
                    pComp =>
                      pComp.id == component.id && pComp.kind == component.kind
                  ),
                } as Record<string, Component | undefined>)
            );
          expandComponent(
            translations,
            component,
            componentInOtherLangs,
            pageId,
            germanPage.label,
            component.id ?? "",
            showOnlyRowsWithMissingTranslation
          );
        });
      }
      setComponentsTranslations(translations);
    }
  }, [pages, showOnlyRowsWithMissingTranslation]);
  return {
    isLoading,
    componentsTranslations,
    langs,
    showOnlyRowsWithMissingTranslation,
    showOnlyMissingTranslationsHandler,
  };
}

const expandComponent = (
  componentsTranslations: IComponentsTranslationInfo[],
  component: Component,
  componentInOtherLangs: Record<string, Component | undefined>[],
  pageId: string,
  pageTitle: string,
  componentPath: string,
  showOnlyRowsWithMissingTranslation: boolean
) => {
  if (
    component.kind == "Column" ||
    component.kind == "Group" ||
    component.kind == "RadioButtonGroup"
  ) {
    (component.kind == "RadioButtonGroup"
      ? (component as IRadioButtonGroupComponent).items
      : (component as IColumnComponent | IGroupComponent).components
    ).forEach(subComponent => {
      const subComponentInOtherLangs = componentInOtherLangs
        .map(record => {
          const lang = Object.keys(record)[0];
          const componentInOtherLang = record[lang];
          if (componentInOtherLang) {
            return {
              [lang]: (componentInOtherLang.kind == "RadioButtonGroup"
                ? (componentInOtherLang as IRadioButtonGroupComponent).items
                : (componentInOtherLang as IColumnComponent | IGroupComponent)
                    .components
              ).find(
                subComp =>
                  subComp.id == subComponent.id &&
                  subComp.kind == subComponent.kind
              ),
            } as Record<string, Component | undefined>;
          }
          return undefined;
        })
        .filter(x => x) as Record<string, Component | undefined>[];
      expandComponent(
        componentsTranslations,
        subComponent,
        subComponentInOtherLangs,
        pageId,
        pageTitle,
        componentPath + "." + subComponent.id,
        showOnlyRowsWithMissingTranslation
      );
    });
  }
  const translatableProperties = translatableFields[component.kind];
  if (!translatableProperties) return;
  translatableProperties.forEach(translatableProp => {
    const row = {
      pageId,
      pageTitle,
      componentType: component.kind,
      componentPath,
      property: translatableProp,
      translations: [{ de: component } as Record<string, Component | undefined>]
        .concat(...componentInOtherLangs)
        .reduce((flatten, record) => {
          const lang = Object.keys(record)[0];
          flatten = {
            ...flatten,
            ...{
              [lang]: (record[lang] as any)[translatableProp] as string,
            },
          };
          return flatten;
        }, {} as Record<string, string>) as Record<string, string>,
    } as IComponentsTranslationInfo;
    if (showOnlyRowsWithMissingTranslation) {
      const hasEmptyCell =
        Object.entries(row.translations).findIndex(([lang, value]) => !value) !=
        -1;
      if (hasEmptyCell) componentsTranslations.push(row);
    } else componentsTranslations.push(row);
  });
};

type TranslatableComponentFields = {
  [Subtype in Component as Subtype["kind"]]?: (keyof Subtype)[];
};

const translatableFields: TranslatableComponentFields = {
  Button: ["text", "labelText", "ariaLabel", "iconDescription"],
  Body: ["body"],
  Checkbox: ["title", "labelText"],
  Column: ["labelText"],
  Generic: ["text", "labelText", "ariaLabel"],
  Group: [],
  Headline: ["text"],
  Image: ["alt"],
  InlineNotification: ["title", "subtitle"],
  Label: ["text"],
  Link: ["labelText"],
  Menu: ["labelText"],
  NumberInput: ["label", "helperText"],
  RadioButton: ["labelText"],
  RadioButtonGroup: [],
  Select: ["labelText"],
  Slider: ["labelText", "minLabel", "maxLabel"],
  Svg: ["labelText"],
  TextArea: ["labelText", "placeholder", "helperText"],
  TextInput: ["labelText", "placeholder", "helperText", "ariaLabel"],
  ToastNotification: ["title", "subtitle", "caption"],
  Toggle: ["labelText", "labelA", "labelB"],
};
