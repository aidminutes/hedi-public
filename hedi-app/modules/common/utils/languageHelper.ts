export function getAlphabetsByLanguage(languageCode: string) {
  let alphabetArray = [];
  const latinAlphabetArray = getAlphabetArray([[0x41, 0x5a]]);
  alphabetArray.push(latinAlphabetArray);
  switch (languageCode) {
    case "uk":
      alphabetArray.push(createUkAlphabet());
      break;
    case "ar":
      alphabetArray.push(createArAlphabet());
      break;
    case "fa":
      alphabetArray.push(createFaAlphabet());
      break;
  }
  return alphabetArray;
}

//To handle the words of languages that starts with unique phonic character
export function getLatinEquivalent(character: string) {
  let latin_map = new Map([
    ["Ä", "A"], // LATIN equivalent for deutsche A umlaut letter
    ["Ö", "O"], // LATIN equivalent O for deutsche O umlaut letter
    ["Ü", "U"], // LATIN equivalent U for deutsche u umlaut letter
  ]);
  return latin_map.get(character) || character;
}

function getAlphabetArray(charCodes: (number | [number, number])[]) {
  const alphabetArray = [];
  for (let entry of charCodes) {
    if (Array.isArray(entry))
      for (let index = entry[0]; index <= entry[1]; index++)
        alphabetArray.push(String.fromCharCode(index));
    else alphabetArray.push(String.fromCharCode(entry));
  }
  return alphabetArray;
}

function createUkAlphabet() {
  return getAlphabetArray([
    [0x0410, 0x0413],
    0x0403,
    [0x0414, 0x0415],
    0x0404,
    [0x0416, 0x0418],
    [0x0406, 0x0407],
    [0x0419, 0x0429],
    0x042c,
    0x042e,
    0x042f,
  ]);
}

function createFaAlphabet() {
  return getAlphabetArray([
    0x622,
    0x627,
    0x628,
    0x67e,
    0x62a,
    0x62b,
    0x62c,
    0x686,
    [0x62d, 0x632],
    0x698,
    [0x633, 0x63a],
    0x641,
    0x642,
    0x6a9,
    0x6af,
    0x644,
    0x645,
    0x646,
    0x648,
    0x647,
    0x6cc,
  ]);
}

function createArAlphabet() {
  return getAlphabetArray([[0xfe8d, 0xfeef]]);
}
