import { IEntityTranslated } from "@/modules/model";

export interface IGlossaryTerm extends IEntityTranslated {
  body: string;
  germanTerm?: string;
}

export function isIGlossaryTerm(obj: any): obj is IGlossaryTerm {
  return obj && obj.type === "GlossaryTerm";
}
