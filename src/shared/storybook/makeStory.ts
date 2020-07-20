import { EnumArrayEntry, enumArrayToObject } from "../../utils/enum";
import { modes, positions, sizes } from "../types";
import { getPreview } from "./stories";

export type ArgType = { [key: string]: unknown };

export type Config<T> = {
  args?: T;
  argTypes?: ArgType;
  builder: (args: T) => string;
  preview?: () => string;
};

export type ArgSelectType = {
  [key: string]: {
    control: {
      type: string;
      [option: string]: unknown;
    };
  };
};

export const getSelectArgType = (
  name: string,
  entries: EnumArrayEntry[]
): ArgSelectType => ({
  [name]: { control: { type: "select", options: enumArrayToObject(entries) } },
});
export const getModeArgType = (): ArgSelectType =>
  getSelectArgType("mode", modes);
export const getSizeArgType = (): ArgSelectType =>
  getSelectArgType("size", sizes);
export const getPositionArgType = (): ArgSelectType =>
  getSelectArgType("position", positions);

const getComputedArgType = <T>(args: T): ArgType => {
  return Object.entries(args || {})
    .map(([name, value]): ArgSelectType | null => {
      if (name === "mode" && typeof value === "number") {
        return getModeArgType();
      }
      if (name === "size" && typeof value === "number") {
        return getSizeArgType();
      }
      if (name === "position" && typeof value === "number") {
        return getPositionArgType();
      }
      return null;
    })
    .filter((value) => value !== null)
    .reduce<ArgType>((acc, value) => ({ ...acc, ...value }), {});
};

export const makeStory = <T>(config: Config<T>): ((args: T) => string) => {
  const fn = (args: T) => config.builder(args);
  fn.args = { ...config.args } as T;
  fn.argTypes = {
    ...getComputedArgType<T>(fn.args),
    ...config.argTypes,
  };
  fn.parameters = {
    controls: { hideNoControlsWarning: true },
    ...getPreview(
      config.preview === undefined ? fn(fn.args) : config.preview()
    ),
  };

  return fn;
};
