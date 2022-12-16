import React, { ReactNode, useState } from "react";
import cx from "classnames";
import { Link } from "@/modules/components";
import { ChevronDown32, ChevronUp32 } from "@carbon/icons-react";

export interface HediCardProps {
  title: ReactNode;
  label?: ReactNode;
  subtitle?: ReactNode;
  image?: ReactNode;
  href?: string;
  target?: string;
  renderLabelIcon?: () => ReactNode;
  renderSubtitleIcon?: () => ReactNode;
  renderInteractionArea?: () => ReactNode;
  renderStatus?: () => ReactNode;
  renderDetailsArea?: () => ReactNode;
  className?: string;
  labelClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  isExpandable?: boolean;
}

export const HediCard: React.FC<HediCardProps> = ({
  title,
  label,
  subtitle,
  image,
  href,
  target,
  renderLabelIcon,
  renderSubtitleIcon,
  renderInteractionArea,
  renderStatus,
  renderDetailsArea,
  className,
  labelClassName,
  titleClassName,
  subtitleClassName,
  isExpandable,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  target = target ?? "";
  return (
    <div className={cx("hedi--hedi-card", className)}>
      <div className="hedi--hedi-card__base">
        {image && (
          <div className="hedi--hedi-card__base__img-container">{image}</div>
        )}
        <div className="hedi--hedi-card__base__text">
          {label && (
            <div
              className={cx(
                "hedi--hedi-card__base__text__label",
                labelClassName
              )}>
              {renderLabelIcon && (
                <span className="hedi--hedi-card__base__text__icon-prefix">
                  {renderLabelIcon()}
                </span>
              )}
              {label}
            </div>
          )}
          {href ? (
            <Link
              className={cx(
                "hedi--hedi-card__base__text__title-link",
                titleClassName
              )}
              href={href}
              target={target}
              labelText={title as string}>
              {title}
            </Link>
          ) : (
            <div
              className={cx(
                "hedi--hedi-card__base__text__title",
                titleClassName
              )}>
              {title}
            </div>
          )}
          {subtitle && (
            <div
              className={cx(
                "hedi--hedi-card__base__text__subtitle",
                subtitleClassName
              )}>
              {renderSubtitleIcon && (
                <span className="hedi--hedi-card__base__text__icon-prefix">
                  {renderSubtitleIcon()}
                </span>
              )}
              {subtitle}
            </div>
          )}
        </div>
        {renderStatus && (
          <div className="hedi--hedi-card__base__status">{renderStatus()}</div>
        )}
        {renderInteractionArea && (
          <div className="hedi--hedi-card__base__interaction-area">
            {renderInteractionArea()}
          </div>
        )}
        {!!isExpandable && (
          <div className="hedi--hedi-card__base__expander">
            {" "}
            {isExpanded ? (
              <ChevronUp32 onClick={() => setIsExpanded(false)} />
            ) : (
              <ChevronDown32 onClick={() => setIsExpanded(true)} />
            )}{" "}
          </div>
        )}
      </div>
      {isExpandable && !isExpanded ? null : (
        <>
          {renderDetailsArea && (
            <>
              <div className={`hedi--hedi-card__details`}>
                {renderDetailsArea()}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
