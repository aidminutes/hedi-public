export function removeHTMLTags(str: string | undefined) {
  if (str === null || str === "" || str === undefined) return str;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
}
