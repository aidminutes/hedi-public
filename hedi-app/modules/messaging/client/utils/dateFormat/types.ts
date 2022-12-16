export type FormatDateRelativeParams = IFormatDateRelativeContent &
  IFormatDateRelativeDefinition &
  IFormatDateRelativeConfig;

export interface IFormatDateRelativeContent {
  date?: Date | null;
  locale?: string;
}

export interface IFormatDateRelativeDefinition {
  momentsAgoText: string;
  todayText: string;
  yesterdayText: string;
}

export interface IFormatDateRelativeConfig {
  hideTime?: boolean;
  alwaysShowTime?: boolean;
}
