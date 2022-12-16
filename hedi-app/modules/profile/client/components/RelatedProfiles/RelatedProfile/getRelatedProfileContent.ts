import { IBusinessProfile } from "../../../../types/IBusinessProfile";
import {
  IAddress,
  IEmail,
  IWebsite,
  IPhone,
} from "../../../../types/dataTypes";

export function getRelatedProfileContent(props: IBusinessProfile) {
  const { addresses, emails, websites, phones } = props;
  const content = {
    address: parseAddressLine(addresses),
    email: parseEmails(emails),
    phone: parsePhones(phones),
    website: parseWebsites(websites),
  };
  return content;
}
export function parseAddressLine(addresses?: IAddress[]): string | undefined {
  if (!addresses) return addresses;
  else {
    const addressMap = new Set(addresses.map(a => a.city));
    return Array.from(addressMap).join(" | ");
  }
}
export function parseEmails(contacts?: IEmail[]): string | undefined {
  if (!contacts) return contacts;
  else {
    const contactMap = new Set(contacts.map(a => a.email));
    return Array.from(contactMap).join(" | ");
  }
}

export function parseWebsites(contacts?: IWebsite[]): string | undefined {
  if (!contacts) return contacts;
  else {
    const contactMap = new Set(contacts.map(a => a.website));
    return Array.from(contactMap).join(" | ");
  }
}

export function parsePhones(contacts?: IPhone[]): string | undefined {
  if (!contacts) return contacts;
  else {
    const contactMap = new Set(contacts.map(a => a.phone));
    return Array.from(contactMap).join(" | ");
  }
}
