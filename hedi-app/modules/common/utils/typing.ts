export function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
  obj[key] = value;
}

export function omitUndefined<T extends object>(obj: T): T {
  if (!obj || obj.constructor !== Object) return obj;
  return Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => [k, omitUndefined(v)])
      .filter(([k, v]) => v !== undefined)
  ) as T;
}

/** Constructs a type with the set of properties `K` of `T` set to optional. */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Constructs a type with the set of properties `K` of `T` set to required. */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
