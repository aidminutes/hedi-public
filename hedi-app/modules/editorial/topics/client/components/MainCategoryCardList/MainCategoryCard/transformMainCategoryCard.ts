import { isEven } from "@/modules/common/utils";

const smallerColumProps = { lg: 5, md: 3, sm: 1 };
const biggerColumProps = { lg: 11, md: 5, sm: 3 };

export function transformMainCategoryCard(index: number) {
  const rowIsEven = isEven(index);

  const firstColumnProps = isEven(index) ? biggerColumProps : smallerColumProps;
  const secondColumnProps = isEven(index)
    ? smallerColumProps
    : biggerColumProps;

  // const imgData = {alt: image?.alt, }

  return {
    rowIsEven,
    firstColumnProps,
    secondColumnProps,
  };
}
