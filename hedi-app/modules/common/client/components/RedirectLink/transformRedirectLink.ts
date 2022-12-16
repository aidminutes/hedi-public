import { ILinkComponent } from "@/modules/components";
export interface IRedirectLink {
  href: string;
  text: string;
  linkedText: string;
  className?: string;
}

export function transformRedirectLink(props: IRedirectLink) {
  const { href, text, linkedText, className } = props;

  let elements: string[] | null = null;

  if (!text.includes(linkedText)) {
    console.warn("The given text does not contain the word " + linkedText);
  } else {
    elements = text.split(linkedText);
  }

  return { elements, linkedText, href, className };
}
