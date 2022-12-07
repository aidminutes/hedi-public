import React from "react";
import { Link } from "carbon-components-react";
import { IFooterProps } from "./types";
import { LogoFacebook24, LogoTwitter24 } from "@carbon/icons-react";

export const Footer = (props: IFooterProps) => {
  const { components } = props;
  return (
    <footer aria-label="footer" className="hedi--footer">
      <div className="hedi--footer__social-icons">
        <a
          rel="external"
          href="https://www.facebook.com/HalloHedi"
          target="_blank">
          <LogoFacebook24 />
        </a>
        <a rel="external" href="https://twitter.com/HediApp" target="_blank">
          <LogoTwitter24 />
        </a>
      </div>
      <nav className="hedi--footer__nav">
        <ul aria-label="Footer Navigation" className="hedi--footer__menu-bar">
          {components.map((menu, i: number) =>
            menu.href ? (
              <li key={menu.labelText}>
                <Link
                  href={
                    menu.usage === "generalTerms"
                      ? "/aidminutes_agb_hedi.pdf"
                      : menu.href
                  }
                  title={menu.labelText}
                  tabIndex={i}
                  target={menu.usage === "generalTerms" ? "_blank" : "_self"}
                  className="hedi--footer__menu-item">
                  {menu.labelText}
                </Link>
              </li>
            ) : (
              <li key={menu.labelText}>
                <span className="hedi--footer__menu-item--version-number">
                  {menu.labelText}
                </span>
              </li>
            )
          )}
        </ul>
      </nav>
    </footer>
  );
};
