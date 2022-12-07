import {
  generateArgs,
  generateMultiform,
  getAliasFieldName,
  getArgsFieldName,
  isAliasKey,
  isArgsKey,
  isInlineFragmentKey,
  isMultiformKey,
} from "./decorators";
import { GQObject, GQType } from "./types";

interface GQObjectInfo {
  fragment?: string;
  fields: Record<string, GQType>;
  fieldArgs: Record<string, any>;
  fieldAlias: Record<string, string>;
  multiform: GQType[];
}

function extractDecorators(obj: GQObject) {
  const info: GQObjectInfo = {
    fragment: undefined,
    fields: {},
    fieldArgs: {},
    fieldAlias: {},
    multiform: [],
  };
  for (const [key, value] of Object.entries(obj)) {
    if (isInlineFragmentKey(key)) {
      info.fragment = value as string;
    } else if (isArgsKey(key)) {
      const fieldName = getArgsFieldName(key);
      info.fieldArgs[fieldName] = value;
    } else if (isAliasKey(key)) {
      const fieldName = getAliasFieldName(key);
      info.fieldAlias[fieldName] = value as string;
    } else if (isMultiformKey(key)) {
      if (Array.isArray(value)) info.multiform.push(...value);
      else info.multiform.push(value);
    } else {
      info.fields[key] = value;
    }
  }
  return info;
}

/**
 * Generates a gql query fields from an object
 * @param object
 *
 * @example
 * queryFields({foo: "", bar: 0}) => 'foo bar'
 */
export function queryFields(object: GQObject): string {
  const info = extractDecorators(object);
  const text = Object.entries(info.fields).reduce((acc, [k, v]) => {
    let field = `${k}`;
    if (info.fieldAlias[k]) field += `:${info.fieldAlias[k]}`;
    if (info.fieldArgs[k]) field += `(${generateArgs(info.fieldArgs[k])})`;
    acc += `${field} ${queryObject(v)}`;
    return acc;
  }, "");
  let multiformText = "";
  if (info.multiform) {
    multiformText = generateMultiform(info.multiform);
  }
  return info.fragment
    ? `... on ${info.fragment} { 
${text} ${multiformText}}
`
    : text + " " + multiformText;
}

function isGQObject(obj: GQType): obj is GQObject {
  return (
    !!obj &&
    obj.constructor === Object && // isLiteralObject
    Object.keys(obj).length > 0
  );
}

/**
 * Generates a gql type query string from an object
 * @param object
 *
 * @example
 * queryObject({foo: "", bar: 0}) => '{ foo bar }'
 */
export function queryObject(object: GQType): string {
  let result = "";
  if (Array.isArray(object)) {
    result += object.map(queryObject);
  } else if (isGQObject(object)) {
    result += `{
${queryFields(object)}} 
`;
  }
  return result;
}

/**
 * Convenience function for creating queries with syntax coloring due to 'gql' tag naming
 *
 * @example
 * gql`query MyQuery($input: String) { ${GQueryObject} ${GQueryOtherObject} }`
 */
export const gql = (chunks: TemplateStringsArray, ...types: GQType[]) =>
  types.reduce<string>(
    (acc, val, i) => (acc += stringify(val) + chunks[i + 1]),
    chunks[0]
  );

const stringify = (type: GQType): string =>
  Array.isArray(type)
    ? type.map(item => stringify(item)).join("")
    : isGQObject(type)
    ? queryFields(type)
    : queryObject(type);
