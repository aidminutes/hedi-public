export interface ISeperator {
  style?: "dotted" | "groove" | "double" | "dashed";
  color?: "blue" | "green" | "orange" | "pink" | "purple" | "gray";
  type?: "xs" | "s" | "m" | "l";
}

export function transformSeperator(props: ISeperator) {
  const { style, color, type } = props;

  const initialClassName = "hedi--separator";
  let seperatorClassName = initialClassName;

  // TODO abstraktere funktion machen
  if (style) {
    seperatorClassName = `${seperatorClassName} ${initialClassName}__${style}`;
  }
  if (color) {
    seperatorClassName = `${seperatorClassName} ${initialClassName}__${color}`;
  }
  if (type) {
    seperatorClassName = `${seperatorClassName} ${initialClassName}__${type}`;
  }

  return { seperatorClassName };
}
