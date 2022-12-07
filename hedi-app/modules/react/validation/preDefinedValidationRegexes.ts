export const germanLettersRegex = /^[a-z0-9äöüß\s\-\(\)]*$/i;
export const numberRegex = /^[0-9]*$/;
export const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
export const websiteRegex = /https?:\/.+/;
export const phoneRegex = /\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/;
export const validPasswordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ @#$%^&*|?{}()\\[\\]~_=!+-.//\\\\§“])(?=.{8,64})"
);

export const validWebsiteRegex = new RegExp(
  "^((https?)://)?(www.)?(?:[a-zA-Z0-9?////#=-]{1,})+(\\.(?:[a-zA-Z0-9?////#=-]{1,}))*(\\.+(?:[a-z?////#=-]{2,})$)"
);
export const validEmailRegex = new RegExp(
  "(^[\u00A0-\uD7FF\uE000-\uFFFF-\u00c4-\u00e4-\u00d6-\u00f6-\u00dc-\u00fc-\u00dfA-Za-z0-9!#$%&'*+/\\\\=?^_`{|}~]+(?:.[\u00A0-\uD7FF\uE000-\uFFFF-\u00c4-\u00e4-\u00d6-\u00f6-\u00dc-\u00fc-\u00dfA-Za-z0-9!#$%&'*+/\\\\=?^_`{|}~]+)*)@(?:(?:[\u00A0-\uD7FF\uE000-\uFFFF-\u00c4-\u00e4-\u00d6-\u00f6-\u00dc-\u00fc-\u00dfA-Za-z0-9](?:[\u00A0-\uD7FF\uE000-\uFFFF-\u00c4-\u00e4-\u00d6-\u00f6-\u00dc-\u00fc-\u00dfA-Za-z0-9]*[\u00A0-\uD7FF\uE000-\uFFFF-\u00c4-\u00e4-\u00d6-\u00f6-\u00dc-\u00fc-\u00dfA-Za-z0-9])?.)+[\u00A0-\uD7FF\uE000-\uFFFF-\u00c4-\u00e4-\u00d6-\u00f6-\u00dc-\u00fc-\u00dfA-Za-z0-9]+$)"
);
export const validPostalCodeRegex = new RegExp("^[0-9]{5}$");
