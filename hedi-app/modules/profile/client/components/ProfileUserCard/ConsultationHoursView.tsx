import { IConsultationHour } from "@/modules/profile/types";

export const ConsultationHoursView = ({
  elements,
}: {
  elements: IConsultationHour[];
}) => {
  return (
    <>
      {elements.map((element, index) => (
        <div className="hedi--profile__info-item" key={index}>
          <p className="hedi--profile__info-item-label">
            {element.weekday.label}
          </p>
          <p>
            {element.startTime} - {element.endTime} |{" "}
            {element.availability.label}
          </p>
        </div>
      ))}
    </>
  );
};
