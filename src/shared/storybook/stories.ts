import { EnumArrayEntry, enumArrayToObject } from "../../utils/enum";
import { modes, positions, sizes } from "../types";

// --- Types
export type Prop = { [key: string]: string | boolean | number };
export type ArgType = { [key: string]: unknown };
export type Preview = { docs: { source: { code: string } } };
export type Config<T> = {
  args?: T;
  argTypes?: ArgType;
  builder: (args: T) => string;
  preview?: (args: T) => string;
};
export type ArgSelectType = {
  [key: string]: {
    control: {
      type: string;
      [option: string]: unknown;
    };
  };
};
export type StoryMakerFn = (value: EnumArrayEntry) => string;

// --- Arg type helpers
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
export const getLanguageArgType = (): ArgSelectType =>
  getSelectArgType("lang", [
    { key: "Français", value: "fr" },
    { key: "English", value: "en" },
    { key: "not supported", value: "unknown" },
  ]);
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
      if (name === "lang" && typeof value === "string") {
        return getLanguageArgType();
      }
      return null;
    })
    .filter((value) => value !== null)
    .reduce<ArgType>((acc, value) => ({ ...acc, ...value }), {});
};

// --- Preview
const getPreview = (code: string): Preview => {
  return {
    docs: { source: { code } },
  };
};

// --- Story maker
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
      config.preview === undefined ? fn(fn.args) : config.preview(fn.args)
    ),
  };

  return fn;
};

// --- Story generator
const EnumStoryMaker = (
  entries: EnumArrayEntry[],
  maker: StoryMakerFn
): string => entries.map((entry) => maker(entry)).join("\n");

export const SizeStoryMaker = (maker: StoryMakerFn): string =>
  EnumStoryMaker(sizes, maker);
export const ModeStoryMaker = (maker: StoryMakerFn): string =>
  EnumStoryMaker(modes, maker);
export const PositionStoryMaker = (maker: StoryMakerFn): string =>
  EnumStoryMaker(positions, maker);

// --- Form helper
const getFormActions = (show: boolean): string => {
  if (show) {
    return `
      <div class="field">
        <div class="control">
          <p6-button class="button is-link">Submit</p6-button>
          <p6-button class="button is-link" type="reset">Reset</p6-button>
        </div>
      </div>
    `;
  }
  return "";
};

export const getForm = (fields: string, withActions = true): string => {
  return `
    <p6-form>
      ${fields}
      ${getFormActions(withActions)}
    </p6-form>
    `;
};

// --- Component helper
const getAttrsAndProps = (props: Prop = {}): string => {
  const allPropertiesAndAttributes = Object.entries(props || {})
    .map(([name, value]) => {
      if (value === true) {
        return `${name}`;
      }
      if (typeof value === "string" || typeof value === "number") {
        return `${name}=${JSON.stringify(String(value))}`;
      }
      if (typeof value === "object") {
        return `${name}="${JSON.stringify(value)}"`;
      }
      return null;
    })
    .filter((a) => a != null);

  return allPropertiesAndAttributes.length > 0
    ? ` ${allPropertiesAndAttributes.join(" ")}`
    : "";
};

export const getComponent = (
  component: string,
  child: string | string[],
  props?: Prop
): string => {
  return `<${component}${getAttrsAndProps(props)}>${Array.from(child).join(
    ""
  )}</${component}>`;
};

// String utils
export const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);
