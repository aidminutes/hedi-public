import Head from "next/head";
import { Map } from "@/modules/map/client";
import { Location } from "@/modules/map/types";
import { useState } from "react";
import { LatLngTuple } from "leaflet";

export default function MapPlayground() {
  const umg = {
    label: "UMG",
    latLong: stringToLatLangTuple("51.536783,9.925897"),
  } as Location;
  const kiel = {
    label: "aidminutes Kiel",
    latLong: stringToLatLangTuple("54.337130,10.144460"),
  } as Location;
  const hamburg = {
    label: "aidminutes Hamburg",
    latLong: stringToLatLangTuple("53.56565, 9.97813"),
    profession: "Hebamme",
  } as Location;
  const buchholz = {
    label: "aidminutes Buchholz",
    latLong: stringToLatLangTuple("53.317697, 9.869485"),
  } as Location;
  const [locations, setLocations] = useState([hamburg]);

  const handleClick = (loc: any) => {
    if (!!locations.find(locactionn => locactionn.label === loc.label)) {
      const newValues = locations.filter(
        location => location.label !== loc.label
      );
      setLocations(newValues);
      return;
    }
    setLocations(prev => [...prev, loc]);
  };

  return (
    <div>
      <Head>
        <title>Map</title>
      </Head>
      <h1>KARTE</h1>
      <div>
        <input id="kiel" type="checkbox" onClick={() => handleClick(kiel)} />
        <label htmlFor="kiel">Kiel</label>
      </div>
      <div>
        <input
          id="buchholz"
          type="checkbox"
          onClick={() => handleClick(buchholz)}
        />
        <label htmlFor="buchholz">Buchholz</label>
      </div>
      <div>
        <input id="umg" type="checkbox" onClick={() => handleClick(umg)} />
        <label htmlFor="umg">UMG</label>
      </div>
      <Map locations={locations} />
    </div>
  );
}

function stringToLatLangTuple(value: string): LatLngTuple {
  const values = value.split(",");
  return [parseFloat(values[0]), parseFloat(values[1])] as LatLngTuple;
}
