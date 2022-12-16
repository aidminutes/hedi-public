import { getSearchConfigFieldsByGroupName, searchConfigs } from "../solr";

export const applyMidwifeRequestPreferencesToSearchResult = (
  docs: any[],
  lang: string
) => {
  docs = filterFarFromMidwife(docs, lang);
  return docs;
};

const filterFarFromMidwife = (docs: any[], lang: string) => {
  const radiusFieldName = getSearchConfigFieldsByGroupName(
    searchConfigs.searchMidwife.groupedFields,
    "midwifeRequestPreferenceRadius",
    lang
  )[0];
  return docs.filter(docItem =>
    !isNaN(parseFloat(docItem[radiusFieldName])) && !isNaN(docItem.geoDistance)
      ? parseFloat(docItem.geoDistance) <= parseFloat(docItem[radiusFieldName])
      : false // When a plz is not correct or is not found by our geo apis, then the Midwife will not be shown.
  );
};
