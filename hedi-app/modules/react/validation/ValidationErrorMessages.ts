import { ErrorMap } from "@/modules/model";

export const DefaultValidationErrorMessages: { [key: string]: ErrorMap } = {
  en: {
    requiredValidationFn: "required field",
    minLengthValidationFn: "minimum length of characters not met",
    maxLengthValidationFn: "maximum length of characters not met",
    regexValidationFn: "The value entered is invalid",
  },
  de: {
    requiredValidationFn: "Pflichtfeld",
    minLengthValidationFn:
      "Die Anzahl der Buchstaben ist weninger als zulässig",
    maxLengthValidationFn: "Die Anzahl der Buchstaben ist mehr als zulässig",
    regexValidationFn: "Der eingegebene Wert ist ungültig",
  },
  fa: {
    requiredValidationFn: "وارد کردن مقدار فیلد ضروری است",
    minLengthValidationFn: "تعداد کاراکترها کمتر از حد مجاز است",
    maxLengthValidationFn: "تعداد کاراکترها بیشتر از حد مجاز است",
    regexValidationFn: "مقدار وارد شده نامعتبر است",
  },
};

export const getValidationErrorText = (
  validationFunctionName: string,
  lang?: string
) => {
  return (
    DefaultValidationErrorMessages[lang ?? ""]?.[validationFunctionName] ??
    "error"
  ); // TODO: default error text
};
