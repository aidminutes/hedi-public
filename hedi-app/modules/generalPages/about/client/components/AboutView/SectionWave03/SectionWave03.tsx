import React from "react";

export interface SectionWave03Props {
  className?: string;
}

export const SectionWave03: React.FC<SectionWave03Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 829.23 42.34"
      preserveAspectRatio="none"
      className={className}>
      <path
        fill="currentColor"
        className="cls-1"
        d="M0,27.63V0H829.23V29.51s-157.61-19-437.74-21C47,6.05,0,27.63,0,27.63Z"
      />
    </svg>
  );
};
