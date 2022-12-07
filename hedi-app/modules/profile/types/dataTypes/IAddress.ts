import { IDataKind, IDataVisibility } from "../taxonomyTypes";

export interface IAddress {
  dataKind: IDataKind;
  dataVisibility: IDataVisibility;
  city: string;
  postalCode: string;
  latLong: string;
  latLongApprox: string;
  detailsVisibility: IDataVisibility;
  street?: string;
  streetNumber?: string;
  additionalInfo?: string;
}

export interface IAddressInput {
  dataKind: number;
  dataVisibility: number;
  city: string;
  postalCode: string;
  detailsVisibility: number;
  street?: string;
  streetNumber?: string;
  additionalInfo?: string;
}

export const AddressInputDefault: IAddressInput = {
  dataKind: 0,
  city: "",
  postalCode: "",
  dataVisibility: 0,
  detailsVisibility: 0,
};

export function addressToInput(address: IAddress): IAddressInput {
  const {
    dataKind,
    dataVisibility,
    city,
    postalCode,
    detailsVisibility,
    street,
    streetNumber,
    additionalInfo,
  } = address;
  return {
    dataKind: dataKind.index,
    dataVisibility: dataVisibility.index,
    city,
    postalCode,
    detailsVisibility: detailsVisibility.index,
    street,
    streetNumber,
    additionalInfo,
  };
}
