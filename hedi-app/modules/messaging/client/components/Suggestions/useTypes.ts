import { ICountedTag } from "@/modules/common/client/components/CountedTag/useCountedTag";
import { IWithType } from "@/modules/model";
import { useEffect, useState } from "react";
import { ISuggestionEntryDefinition } from "../SuggestionEntry";

export function useTypes<T extends IWithType>(
  activeElements: T[],
  searchIsActive: Boolean,
  suggestionEntryDefinition: ISuggestionEntryDefinition
) {
  const [types, setTypes] = useState<string[]>([]);

  const [typeCounts, setTypeCounts] = useState<TypeCount[] | null>(null);
  const [activeTypes, setActiveTypes] = useState<string[]>(types);

  const [typeFilteredElements, setTypeFilteredElements] = useState<T[] | null>(
    activeElements
  );

  useEffect(() => {
    setTypeCounts(activeElements ? getTypesAndCounts(activeElements) : null);
  }, [activeElements]);

  useEffect(() => {
    if (searchIsActive && activeElements)
      setTypeFilteredElements(
        getTypeFilteredElements(activeElements, activeTypes)
      );
    if (!searchIsActive) setTypeFilteredElements([]);
  }, [activeTypes, activeElements, searchIsActive]);

  useEffect(() => {
    if (searchIsActive && activeElements)
      setActiveTypes(getTypes(activeElements));
  }, [searchIsActive, activeElements]);

  const addToActiveTypes = (type: string) => {
    setActiveTypes(prev => [...prev, type]);
  };
  const reduceActiveTypes = (type: string) => {
    const filteredTypes = activeTypes.filter(t => t !== type);
    setActiveTypes(filteredTypes);
  };

  const handleTypeSelection = (state: boolean, label: string) => {
    if (state === false) {
      reduceActiveTypes(label as string);
    }
    if (state === true) {
      addToActiveTypes(label as string);
    }
  };

  const resetActiveTypes = () => setActiveTypes([]);
  return {
    addToActiveTypes,
    reduceActiveTypes,
    typeCounts: generateCountedTags(typeCounts, suggestionEntryDefinition),
    types,
    activeTypes,
    typeFilteredElements,
    resetActiveTypes,
    handleTypeSelection,
  };
}

// TODO better typing
type TypeCount = {
  type: string;
  count: number;
};

const getTypesAndCounts = <T extends IWithType>(array: T[]): TypeCount[] => {
  const newArray: TypeCount[] = [];
  array.map(element => {
    if (!newArray.find(b => b.type === element.type)) {
      newArray.push({ type: element.type, count: 1 });
      return;
    }
    const index = newArray.findIndex(b => b.type === element.type);
    newArray[index].count = newArray[index].count + 1;
  });
  return newArray;
};
const getTypeFilteredElements = <T extends IWithType>(
  elements: T[],
  activeTypes: string[]
) => {
  return elements.filter(e => activeTypes.includes(e.type));
};

const getTypes = <T extends IWithType>(elements: T[]) => {
  const types: string[] = [];

  elements.forEach(element => {
    if (!types.includes(element.type)) types.push(element.type);
  });

  return types;
};

const generateCountedTags = (
  typeCount: TypeCount[] | null,
  suggestionEntryDefinition: ISuggestionEntryDefinition
): ICountedTag[] | null => {
  if (typeCount === null) return null;
  const renamed: ICountedTag[] = typeCount.map(e => ({
    elementType: e.type,
    count: e.count,
    label: getTagLabel(e.type, suggestionEntryDefinition),
  }));
  return renamed;
};

const getTagLabel = (
  type: string,
  suggestionEntryDefinition: ISuggestionEntryDefinition
) => {
  if (type === "Article")
    return suggestionEntryDefinition.articleLabel.text || "Artikel TODO";
  if (type === "GlossaryTerm")
    return suggestionEntryDefinition.glossaryLabel.text || "Glossar TODO";
  return suggestionEntryDefinition.profileLabel.text || "Profil TODO";
};
