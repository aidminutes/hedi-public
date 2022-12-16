import React from "react";
import { ILabelComponent } from "@/modules/components/types";
import { BusinessProfileType, IService } from "@/modules/profile/types";
import { Label } from "@/modules/components";
import { HeadlineSeperator } from "@/modules/common/client/components";
import { UserActivity24 } from "@carbon/icons-react";

export interface IServiceDefinition {
  title: ILabelComponent;
}

export interface IServicesDefinition {
  organisation: IServiceDefinition;
  professional: IServiceDefinition;
}

export interface IServices {
  definition: IServicesDefinition;
  services: IService[];
  type: BusinessProfileType;
}

export const Services = (props: IServices) => {
  const groups = props.services.reduce<Record<string, IService[]>>(
    (acc, service) => {
      const parentLabel = service.parent?.label;
      if (parentLabel) {
        if (acc[parentLabel]) {
          acc[parentLabel].push(service);
        } else {
          acc[parentLabel] = [service];
        }
      }
      return acc;
    },
    {} as Record<string, IService[]>
  );
  const entries = Object.entries(groups);
  const serviceHeadline =
    props.type === "Organisation"
      ? props.definition.organisation.title
      : props.definition.professional.title;

  return (
    <div>
      <div className="hedi--profile__headline--wrap">
        <span className="mobile-only hedi--profile__headline--icon">
          <UserActivity24 />
        </span>
        <Label {...serviceHeadline} />
      </div>
      <HeadlineSeperator />
      <ul className="hedi--profile__services--list">
        {entries.map(entry => (
          <>
            <li
              className="hedi--profile__services--list__parent"
              key={entry[0]}>
              {entry[0]}
            </li>
            <ul
              className="hedi--profile__services--sublist"
              key={`${entry[0]}-2`}>
              {entry[1].map(subentry => (
                <li>{subentry.label}</li>
              ))}
            </ul>
          </>
        ))}
      </ul>
    </div>
  );
};
