import { ISelectComponent } from "@/modules/components";

export type CareType = "prenatalCare" | "deliveryCare" | "postpartumCare";

export interface ICareType {
  // TODO should be an cms entity
  route: CareType; // TODO check the value of route if it's like /profilecaretype/prenatalcare
  label: string;
}

export const getCareTypes = (selectComponent: ISelectComponent) =>
  selectComponent.items.map(
    item => ({ label: item.label, route: item.route } as ICareType)
  );
