import { AssertClientSide } from "@/modules/common/utils";

export const useGlossaryUrlHashTerm = () => {
  let glossaryUrlTerm: string | undefined = undefined;
  if (AssertClientSide()) {
    const hashText = window.location.hash.substring(1);
    const isHashTextEncoded = decodeURIComponent(hashText) != hashText;
    glossaryUrlTerm = isHashTextEncoded
      ? decodeURIComponent(hashText)
      : hashText;
  }

  return {
    glossaryUrlTerm,
  };
};
