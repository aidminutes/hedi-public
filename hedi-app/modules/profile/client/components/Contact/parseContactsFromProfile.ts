import { IProfile, IBusinessProfile } from "@/modules/profile/types";
import { IContact } from ".";

export const parseContactsFromProfile = (
  profile: IProfile | IBusinessProfile
): IContact[] => {
  const contacts: IContact[] = [];
  profile.addresses.forEach(data => {
    const id = contacts.findIndex(
      c => c && c.dataKind.index === data.dataKind.index
    );
    if (id < 0) contacts.push({ dataKind: data.dataKind, address: data });
    else contacts[id].address = data;
  });

  profile.phones.forEach(data => {
    const id = contacts.findIndex(
      c => c.dataKind.index === data.dataKind.index
    );
    if (id < 0) contacts.push({ dataKind: data.dataKind, phone: data });
    else contacts[id].phone = data;
  });

  profile.emails.forEach(data => {
    const id = contacts.findIndex(
      c => c.dataKind.index === data.dataKind.index
    );
    if (id < 0) contacts.push({ dataKind: data.dataKind, email: data });
    else contacts[id].email = data;
  });

  if ("websites" in profile) {
    profile.websites.forEach(data => {
      const id = contacts.findIndex(
        c => c.dataKind.index === data.dataKind.index
      );
      if (id < 0) contacts.push({ dataKind: data.dataKind, website: data });
      else contacts[id].website = data;
    });
  }

  const sorted = contacts.sort((a, b) =>
    a.dataKind.route.localeCompare(b.dataKind.route)
  );

  return sorted;
};
