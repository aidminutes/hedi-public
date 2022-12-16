import { Location } from "../../../../types";
import L, { PointTuple } from "leaflet";
import { useState, useEffect } from "react";

export function useMarker(locations: Location[]) {
  const [marker, setMarker] = useState(transformMarkerData(locations));

  useEffect(() => {
    setMarker(transformMarkerData(locations));
  }, [locations]);

  return { marker };
}

function transformMarkerData(data: Location[]) {
  return data.map(location => {
    return {
      position: location.latLong,
      icon: getIcon(location.profession),
      key: location.label,
    };
  });
}

function getIcon(profession?: "Hebamme") {
  let url = process.env.NEXT_PUBLIC_MAP_MARKER_ICON;
  let iconSize: PointTuple = [25, 41];
  if (profession && profession === "Hebamme") {
    url = "/dummy/images/hebamme.png";
    iconSize = [32, 32];
  }
  return new L.Icon({
    //TODO to move thhe image to durpal
    iconUrl: url,
    iconSize: iconSize,
    iconAnchor: [13, 0],
  });
}
