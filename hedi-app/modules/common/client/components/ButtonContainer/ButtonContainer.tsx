import React from "react";

export const ButtonContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="hedi--button-container">{children}</div>;
};
