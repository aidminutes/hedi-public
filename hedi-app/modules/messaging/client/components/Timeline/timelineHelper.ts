// Get last visible message before pagination
export const getFirstVisibleElementData = (scrollEvent: any) => {
  const topOfContainer = scrollEvent.target.getBoundingClientRect().top;
  let res = null;
  Array.from(scrollEvent.target.childNodes).some((child: any, index) => {
    const childTop = child.getBoundingClientRect().top;
    if (childTop > topOfContainer) {
      res = {
        firstVisibleId: child.id,
        topOffset: childTop,
      };
      return true;
    } else {
      return false;
    }
  });
  return res;
};
