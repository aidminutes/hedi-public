import { IArticleEntry } from "@/modules/editorial/article/types/IArticleEntry";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types/IGlossaryTerm";
import { IBusinessProfileEntry } from "@/modules/profile/types/IBusinessProfileEntry";

export type IEntry = IArticleEntry | IGlossaryTerm | IBusinessProfileEntry;
