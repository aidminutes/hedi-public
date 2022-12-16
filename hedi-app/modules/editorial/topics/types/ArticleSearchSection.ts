import { IButtonComponent, IImageComponent } from "@/modules/components/types";

export interface ArticleSearchSectionProps {
  button: IButtonComponent;
  placeholderText?: string;
  headline?: string;
  image?: IImageComponent;
}
