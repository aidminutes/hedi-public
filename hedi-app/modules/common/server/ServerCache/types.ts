export interface IServerCache {
  initialized: boolean;
  lastUpdatedTS: number;
  data: unknown;
}
