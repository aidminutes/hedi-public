import { ILinkComponent, Link } from "@/modules/components";
import React from "react";
import { IRedirectLink, transformRedirectLink } from "./transformRedirectLink";

export const RedirectLink = (props: IRedirectLink) => {
  const { elements, linkedText, href, className } = transformRedirectLink(
    props
  );
  if (!elements) return null;
  return (
    <p className={className}>
      {elements[0]}
      <a href={href}>{linkedText}</a>
      {elements[1]}
    </p>
  );
};
