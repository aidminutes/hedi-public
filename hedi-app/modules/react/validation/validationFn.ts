export interface IValidationFunction {
  name: string;
  fn: (T: any) => boolean;
}
// TODO add automatically if input is required from cms
export const requiredValidationFn = <T>(): IValidationFunction => {
  return {
    name: "requiredValidationFn",
    fn: (value: T) => !!value,
  };
};
export const minLengthValidationFn = (
  minLength: number
): IValidationFunction => {
  return {
    name: "minLengthValidationFn",
    fn: (value: string) => value.length >= minLength,
  };
};
export const maxLengthValidationFn = (
  maxLength: number
): IValidationFunction => {
  return {
    name: "maxLengthValidationFn",
    fn: (value: string) => value.length <= maxLength,
  };
};

export const regexValidationFn = (regex: RegExp): IValidationFunction => {
  return {
    name: "regexValidationFn",
    fn: (value: string) => regex.test(value),
  };
};
