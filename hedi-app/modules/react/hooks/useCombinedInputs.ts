import { ChangeEvent, useEffect, useState } from "react";
import { setProperty } from "@/modules/common/utils";

export interface IInputState<T> {
  value: T;
  onChange: (e: any) => void;
}

type IElementValueFn<T> = null | undefined | ((e: any) => T[keyof T]);

export type IConverterMap<T> = { [K in keyof T]?: IElementValueFn<T> };

export type IInputStateMap<T> = {
  [K in keyof T]-?: IInputState<T[K]>;
};

export function useCombinedInputs<T>(
  converters: IConverterMap<T>,
  initial: T,
  onChange?: (data: T) => void
) {
  const [state, setState] = useState<T>(initial);

  useEffect(() => {
    setState(initial);
  }, [initial]);

  const inputStateMap = {} as IInputStateMap<T>;
  for (const [key, func] of Object.entries<IElementValueFn<T>>(converters)) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const value = func ? func(e) : e.target?.value;
      setState(p => {
        const newState = { ...p, [key]: value };
        if (onChange) onChange(newState);
        return newState;
      });
    };
    setProperty(inputStateMap, key as keyof T, {
      value: state[key as keyof T],
      onChange: handleChange,
    });
  }

  return { ...inputStateMap, state };
}
