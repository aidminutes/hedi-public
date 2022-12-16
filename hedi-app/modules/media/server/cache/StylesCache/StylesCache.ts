import { ImageStylesCache } from "./ImageStylesCache";
import { IImage } from "../../../types";

export namespace StylesCache {
  export function isInitialized() {
    return ImageStylesCache.isInitialized();
  }

  export async function assertValid(interval: number = 10) {
    return ImageStylesCache.assertValid(interval);
  }

  function styles() {
    return ImageStylesCache.get();
  }

  function changeStyleRoute(route: string, styleName: string) {
    if (!route.includes("/image/")) return route;
    for (const name in styles()) {
      if (route.includes(`/image/${name}/`)) {
        return route.replace(`/image/${name}/`, `/image/${styleName}/`);
      }
    }
    return route.replace("/image/", `/image/${styleName}/`);
  }

  export function swap<T extends Pick<IImage, "route" | "width" | "height">>(
    image: T | undefined,
    styleName: string
  ) {
    if (!image) return image;
    if (!isInitialized())
      console.warn("Trying to swap without initialized image styles");

    if (!!styles() && styleName in styles()) {
      const style = styles()[styleName];

      image.width = style.width;
      image.height = style.height;
      image.route = changeStyleRoute(image.route, styleName);
    }
    return image;
  }

  export function swapInEntities<T extends { image?: IImage }>(
    entities: T[],
    styleName: string
  ) {
    for (let entity of entities) entity.image = swap(entity.image, styleName);

    return entities;
  }
}
