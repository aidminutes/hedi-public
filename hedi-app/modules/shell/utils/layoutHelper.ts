import {
  findHeadlineLabel,
  findImageInstance,
  getImageInstance,
  IComponent,
} from "@/modules/components/types";

export function findLayoutPosterImage(
  components: IComponent[],
  id: string = "poster"
) {
  const poster = findImageInstance(components, id);
  if (!poster) return null;

  const posterIndex = components.indexOf(poster);
  if (posterIndex >= 0) components.splice(posterIndex, 1);

  return poster;
}

export function getLayoutPosterImage(
  components: IComponent[],
  id: string = "poster"
) {
  const poster = getImageInstance(components, id, {
    label: "",
    route: "",
    width: 1,
    height: 1,
  });
  const posterIndex = components.indexOf(poster);
  if (posterIndex >= 0) components.splice(posterIndex, 1);

  return poster;
}

export function getLayoutPageHeadline(components: IComponent[], label: string) {
  const headline = findHeadlineLabel(components);
  if (headline) components.splice(components.indexOf(headline), 1);

  return headline?.text ?? label;
}
