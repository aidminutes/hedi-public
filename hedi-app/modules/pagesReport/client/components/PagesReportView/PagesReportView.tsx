import { IPage } from "@/modules/common/types";
import { usePagesReportView } from "./usePagesReportView";
import { Loading } from "carbon-components-react";
import { Checkbox } from "@/modules/components";

export const PagesReportView = ({ content }: { content: IPage }) => {
  const {
    isLoading,
    componentsTranslations,
    langs,
    showOnlyRowsWithMissingTranslation,
    showOnlyMissingTranslationsHandler,
  } = usePagesReportView();
  return (
    <>
      <div>
        <Checkbox
          defaultChecked={showOnlyRowsWithMissingTranslation}
          labelText="show only rows with missing translations"
          id="showOnly"
          onChange={(checked: boolean) =>
            showOnlyMissingTranslationsHandler(checked)
          }
        />
      </div>
      <table className="hedi__pages-report-table">
        <thead>
          <th>pageId</th>
          <th>pageTitle</th>
          <th>componentType</th>
          <th>componentPath</th>
          <th>property</th>
          {langs.map(lang => (
            <th>{lang}</th>
          ))}
        </thead>
        <tbody>
          {componentsTranslations.map(rowItem => (
            <tr>
              <td>{rowItem.pageId}</td>
              <td>{rowItem.pageTitle}</td>
              <td>{rowItem.componentType}</td>
              <td>{rowItem.componentPath}</td>
              <td>{rowItem.property}</td>
              {langs.map(lang => (
                <td>{rowItem.translations[lang]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && !componentsTranslations.length && <Loading />}
    </>
  );
};
