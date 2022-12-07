import { IComponent, ISelectComponent, isSelect } from "@/modules/components";
import { IServiceSelectProps } from "./ServiceSelect";

interface IServiceSelectComponent extends ISelectComponent {
  professions: string[];
}

const isServiceSelect = (obj: IComponent): obj is IServiceSelectComponent =>
  isSelect(obj) && "professions" in obj;

const filterSelects = (
  components: IComponent[],
  professionFilter?: string
): ISelectComponent[] => {
  if (!professionFilter) return [];
  else {
    const professionGroup = professionFilter.match(/(.+?)(-\d)*$/)?.[1] ?? "#";
    return components
      .filter(isServiceSelect)
      .filter(c => c.professions.find(p => p.startsWith(professionGroup)));
  }
};

const groupSelected = (selects: ISelectComponent[], selected: string[]) => {
  return selects.map(s => {
    const values = s.items
      .filter(i => selected.includes(i.route))
      .map(i => i.route);
    return { selected: values, ...s } as IServiceSelectProps;
  });
};

export const filterAndGroup = (
  selected: string[],
  components: IComponent[],
  professionFilter?: string
) => groupSelected(filterSelects(components, professionFilter), selected);
