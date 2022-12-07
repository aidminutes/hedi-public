import "leaflet/dist/leaflet.css";
import React, { useRef } from "react";
import {
  MapConsumer,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import { IMapProps } from "../../../types";
import { useMarker, usePositions, useLocations } from "./hooks/";
import { useState, useEffect } from "react";

export default function Map(props: IMapProps) {
  const { hasLocations, mapLocations } = useLocations(props);
  if (!hasLocations) return null;
  const { marker } = useMarker(mapLocations);
  const { firstPosition, mapBounds } = usePositions(mapLocations);
  const [center, setCenter] = useState(mapBounds);
  const markerRef = useRef(null);
  const [map, setMap] = useState<LeafletMap | null>(null);
  useEffect(() => {
    setCenter(mapBounds);
  }, [mapBounds]);

  return (
    <>
      <MapContainer
        bounds={center}
        scrollWheelZoom={false}
        center={firstPosition}
        whenCreated={m => {
          setMap(m);
        }}>
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url={process.env.NEXT_PUBLIC_MAP_OSM || ""}
        />
        <MapConsumer>
          {map => {
            map.fitBounds(marker.map(p => p.position));
            return null;
          }}
        </MapConsumer>

        {marker.map(markerValue => {
          return (
            <Marker
              {...markerValue}
              eventHandlers={{
                click: e => {
                  map?.flyTo(e.latlng, 13);
                },
              }}>
              <Popup>{markerValue.key}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
}
