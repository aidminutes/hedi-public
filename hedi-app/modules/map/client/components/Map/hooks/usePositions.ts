import { LatLngBounds, latLngBounds, LatLngTuple } from "leaflet";
import { Location } from "../../../../types";

import { useState, useMemo, useEffect } from "react";

export function usePositions(locations: Location[]) {
  const [positions, setPositions] = useState(
    locations.map(location => location.latLong)
  );
  const [mapBounds, setMapBounds] = useState<LatLngBounds>(
    getBounds(positions)
  );
  const firstPosition = positions[0];

  useEffect(() => {
    setPositions(locations.map(location => location.latLong));
  }, [locations]);
  useEffect(() => {
    setMapBounds(getBounds(positions));
  }, [locations]);

  return { mapBounds, firstPosition, positions };
}

function getBounds(pos: LatLngTuple[]) {
  // @ts-ignore
  const bounds = latLngBounds();
  pos.forEach(position => bounds.extend(position));
  return bounds.pad(0.1);
}
