import { IProfileTaxonomy } from "@/modules/profile/types/taxonomyTypes/IProfileTaxonomy";
import { Service } from "./Service";

interface IServiceList {
  services?: IProfileTaxonomy[];
  headline?: String;
  headlineType?: "h3" | "h5";
}

export const ServicesList = ({
  services,
  headline,
  headlineType,
}: IServiceList): JSX.Element => {
  const headlineElement =
    headlineType === "h3" ? <h3>{headline}</h3> : <h5>{headline}</h5>;

  return (
    <>
      {headline ? headlineElement : null}

      {services && services?.length > 0
        ? services.map(service => <Service key={service.route} {...service} />)
        : null}
    </>
  );
};
