export const partialHighlight = (
  highlightedText: string,
  searchedText: string
) => {
  const searchTerms = searchedText
    .split(" ")
    .filter(part => part)
    .sort((a, b) => b.length - a.length);
  return highlightedText.replace(/<mark>(.*?)<\/mark>/g, (marked, tagged) => {
    for (let i = 0; i < searchTerms.length; i++) {
      const term = searchTerms[i];
      const pos = tagged.toLowerCase().indexOf(term.toLowerCase());
      if (pos != -1) {
        return (
          tagged.substr(0, pos) +
          "<mark>" +
          tagged.substr(pos, term.length) +
          "</mark>" +
          tagged.substr(pos + term.length)
        );
      }
    }
    return marked;
  });
};
