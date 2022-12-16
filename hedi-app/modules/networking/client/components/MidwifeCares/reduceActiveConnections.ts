import { IMidwifeCareConnection } from "@/modules/networking/types";

export type MidwifeCareConnectionMap = {
  [year: string]: { [month: string]: IMidwifeCareConnection[] };
};

export function reduceActiveConnections(
  activeConnections: IMidwifeCareConnection[]
) {
  const initial: MidwifeCareConnectionMap = {};
  const activeConnectionsMap = activeConnections.reduce(
    (
      result: MidwifeCareConnectionMap,
      currentConnection: IMidwifeCareConnection
    ) => {
      const { expectedDeliveryDate } = currentConnection.sender.pregnancy;
      const year = new Date(expectedDeliveryDate).getFullYear();
      const month = new Date(expectedDeliveryDate).getMonth();
      const connectionsForYear = result[year];
      const connectionsForMonth = result[year]?.[month];

      return {
        ...result,
        [year]: {
          ...(connectionsForYear ? connectionsForYear : {}),
          [month]: [
            ...(connectionsForMonth ? connectionsForMonth : []),
            currentConnection,
          ],
        },
      };
    },
    initial
  );

  const allYears = Object.keys(activeConnectionsMap).sort((a, b) =>
    a > b ? 1 : -1
  );

  return { activeConnectionsMap, allYears };
}
