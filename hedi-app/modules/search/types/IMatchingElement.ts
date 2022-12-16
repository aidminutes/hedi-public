export interface IMatchingElement<T> {
  value: T;
  matchStatus: boolean;
  foundInProfile?: boolean;
}
