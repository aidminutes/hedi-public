export interface ISearchInputParams {
  plz: string;
  date: string; //voraussichtliche Geburtsdatum
  cares: Array<string>; // Betreuungsarten
  latlon?: string; // pregnancyLatLong
}
