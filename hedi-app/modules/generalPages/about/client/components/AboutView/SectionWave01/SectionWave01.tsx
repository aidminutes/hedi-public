import React from "react";

export interface SectionWave01Props {
  className?: string;
}

export const SectionWave01: React.FC<SectionWave01Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 829.11 40.36"
      preserveAspectRatio="none"
      className={className}>
      <path
        className="cls-1"
        fill="currentColor"
        d="M829.11,31.24C747.33,39,430,7.83,247.82,3.31,99.89-.37-.18,4.44-.18,4.44L0,40.36l829.11-.19Z"
      />
      <path className="cls-1" d="M2.55,33.38V24.45" fill="currentColor" />
    </svg>
  );
};
