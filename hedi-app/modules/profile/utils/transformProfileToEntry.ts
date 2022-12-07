import {
  IBusinessProfile,
  IProfile,
  IProfileEntry,
  isIBusinessProfile,
} from "../types";
import { IDataKind } from "../types/taxonomyTypes";

export function selectPrimaryData<T extends { dataKind: IDataKind }>(
  set: T[]
): T | undefined {
  let match: T | undefined = undefined;
  let weight = 1000;
  set?.forEach(item => {
    if (item.dataKind.index < weight) {
      weight = item.dataKind.index;
      match = item;
    }
  });
  return match;
}

export function transformProfileToEntry(
  profile: IProfile | IBusinessProfile
): IProfileEntry {
  const {
    type,
    route,
    label,
    lang,
    translations,
    image,
    addresses,
    phones,
    emails,
  } = profile;

  const profileEntry = {
    type,
    route,
    label,
    lang,
    translations,
  } as IProfileEntry;

  // NOTE undefined properties must not be set as [key]:undefined due to nextjs prerendering
  if (image) profileEntry.image = image;

  const address = selectPrimaryData(addresses);
  if (address) profileEntry.address = address;

  const phone = selectPrimaryData(phones);
  if (phone) profileEntry.phone = phone;

  const email = selectPrimaryData(emails);
  if (email) profileEntry.email = email;

  if (isIBusinessProfile(profile)) {
    const { websites, profession, services } = profile;
    const website = websites ? selectPrimaryData(websites) : undefined;
    if (website) profileEntry.website = website;
    if (profession) profileEntry.profession = profession;
    if (services) profileEntry.services = services;
  }

  return profileEntry;
}
