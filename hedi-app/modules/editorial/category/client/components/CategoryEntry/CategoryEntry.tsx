// import Image from "next/image";
import Link from "next/link";
import { Image } from "@/modules/components";
import { AspectRatio } from "carbon-components-react";
import {
  transformCategoryEntry,
  ICategoryEntryProps,
} from "./transformCategoryEntry";

export const CategoryEntry = (props: ICategoryEntryProps): JSX.Element => {
  const { route, image, label } = transformCategoryEntry(props);
  return (
    <div className="hedi--category-entry">
      <Link href={route}>
        <a>
          {image && (
            <div className="hedi--category-entry__image-wrap">
              <AspectRatio ratio="4x3">
                <Image {...image} />
              </AspectRatio>
            </div>
          )}
          <div className="hedi--category-entry__text-wrap">
            <AspectRatio ratio="2x1">
              <h4
                dangerouslySetInnerHTML={{
                  __html: label,
                }}></h4>
            </AspectRatio>
          </div>
        </a>
      </Link>
    </div>
  );
};
