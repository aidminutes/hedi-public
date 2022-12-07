import { Parser } from "htmlparser2";
import { AssertServerSide } from "@/modules/common/utils";

import { HTMLProps, IParserElementInfo } from "./types";
import { defaultTransform } from "./defaultTransform";
import { attributesToProps } from "./utils";

export const BasicHTML = ({ data, callbacks }: HTMLProps) => {
  if (!data) return null;

  const root: IParserElementInfo = {
    name: "root",
    start: 0,
    end: data.length + 1,
    children: [],
    transform: (html, i) =>
      i.children.map(info =>
        info.transform(html, info, attributesToProps(info.attributes))
      ),
  };
  const stack = [root];
  const parser = new Parser({
    onopentag(name, attributes) {
      stack.unshift({
        name,
        start: parser.startIndex,
        end: -1,
        children: [],
        transform: (html, info, props) => defaultTransform(html, info, props),
        attributes,
      });
    },
    ontext(text) {
      stack[0].children.push({
        name: "innerText",
        start: parser.startIndex,
        end: parser.endIndex ? parser.endIndex + 1 : -1,
        children: [],
        transform: () => {
          if (AssertServerSide()) return text;
          else {
            const p = document.createElement("p");
            p.innerHTML = text;
            return p.textContent;
          }
        },
      });
    },
    onclosetag(name) {
      const parserInfo = stack.shift();

      if (parserInfo) {
        if (parserInfo.name !== name) throw Error(name + " tag not closed");

        parserInfo.end = parser.endIndex ? parser.endIndex + 1 : -1;

        if (callbacks && callbacks[parserInfo.name]) {
          parserInfo.transform = callbacks[parserInfo.name];
          parserInfo.needsTransform = true;
        }

        if (parserInfo.needsTransform) stack[0].needsTransform = true;

        stack[0].children.push(parserInfo);
      }
    },
  });
  parser.write(data);
  parser.end();
  return root.transform(data, root) as JSX.Element;
};
