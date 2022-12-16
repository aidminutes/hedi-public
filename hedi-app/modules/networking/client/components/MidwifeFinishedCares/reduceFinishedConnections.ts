import { IMidwifeCareConnection } from "@/modules/networking/types";

export type MidwifeFinishedCareConnectionMap = {
  [year: string]: IMidwifeCareConnection[];
};

export function reduceFinishedConnections(
  finishedConnections: IMidwifeCareConnection[]
) {
  const initial: MidwifeFinishedCareConnectionMap = {};
  const activeConnectionsMap = finishedConnections.reduce(
    (
      result: MidwifeFinishedCareConnectionMap,
      currentConnection: IMidwifeCareConnection
    ) => {
      const { expectedDeliveryDate } = currentConnection.sender.pregnancy;
      const year = new Date(expectedDeliveryDate).getFullYear();
      const connectionsForYear = result[year];

      return {
        ...result,
        [year]: [
          ...(connectionsForYear ? connectionsForYear : []),
          currentConnection,
        ],
      };
    },
    initial
  );

  const allYears = Object.keys(activeConnectionsMap).sort((a, b) =>
    a > b ? 1 : -1
  );

  return { activeConnectionsMap, allYears };
}
