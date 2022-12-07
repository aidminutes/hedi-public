import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from "carbon-components-react";
import { IConsultationHour } from "../../../types/dataTypes";
import { transformConsultationHours } from ".";
import { HeadlineSeperator } from "@/modules/common/client/components";
import { RecentlyViewed24 } from "@carbon/icons-react";

export type IConsultationHoursProps = IConsultationHours &
  IConsultationHoursDefinition;

export interface IConsultationHours {
  consultationHours: IConsultationHour[];
}

export interface IConsultationHoursDefinition {
  headline?: string;
}

export const ConsultationHours = ({
  headline,
  consultationHours,
}: IConsultationHoursProps) => {
  const days = transformConsultationHours(consultationHours);
  return (
    <div className="hedi--consultation-hours-wrapper">
      <div className="hedi--profile__headline--wrap">
        <span className="mobile-only hedi--profile__headline--icon">
          <RecentlyViewed24 />
        </span>
        <h3>{headline}</h3>
      </div>
      <HeadlineSeperator />
      <StructuredListWrapper className="hedi--structured-list">
        <StructuredListHead></StructuredListHead>
        <StructuredListBody>
          {days.map((day, index) => (
            <StructuredListRow tabIndex={index} key={index}>
              {day && (
                <>
                  <StructuredListCell>{day.day}</StructuredListCell>
                  <StructuredListCell>{day.times}</StructuredListCell>
                  <StructuredListCell>{day.availability}</StructuredListCell>
                </>
              )}
            </StructuredListRow>
          ))}
        </StructuredListBody>
      </StructuredListWrapper>
    </div>
  );
};
