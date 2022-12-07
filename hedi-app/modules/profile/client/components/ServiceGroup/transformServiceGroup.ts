import { IServiceGroupProps } from "./IServiceGroupProps";

export function transformServiceGroup(props: IServiceGroupProps) {
  const { headline, services, tagType, headlineType = "h5" } = props;

  const { labelText } = headline;

  return { headline: labelText as String, services, tagType, headlineType };
}
