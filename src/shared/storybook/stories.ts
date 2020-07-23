/* eslint-disable import/no-extraneous-dependencies */
import { TemplateResult } from "lit-html";
/* eslint-enable import/no-extraneous-dependencies */
import { EnumArrayEntry, enumArrayToObject } from "../../utils/enum";
import { Mode, modes, Position, positions, Size, sizes } from "../types";

// --- Types
export type Props<T> = Partial<T & HTMLElement>;
export type ArgType = { [key: string]: unknown };
export type Preview = { docs: { source: { code: string } } };
export type BuilderOutput = string | HTMLElement | TemplateResult;
export type Config<T> = {
  args?: T;
  argTypes?: ArgType;
  builder: (args: T) => BuilderOutput;
  preview?: (args: T) => string | HTMLElement | HTMLElement[];
};
export type ArgSelectType = {
  [key: string]: {
    control: {
      type: string;
      [option: string]: unknown;
    };
  };
};
export type StringSelectArgType = { [key: string]: string };

export type StoryMakerFn<T> = (value: EnumArrayEntry<T>) => HTMLElement;

// --- Component helper
const htmlElementToArray = <T>(children: T | T[]): T[] =>
  Array.isArray(children) ? children : [children];

export function getElement<
  K extends keyof HTMLElementTagNameMap,
  T extends HTMLElementTagNameMap[K],
  KK extends keyof T
>(
  component: K,
  children: string | HTMLElement | HTMLElement[],
  props?: Partial<T>
): T {
  const element: T = (document.createElement(component) as unknown) as T;

  if (props !== undefined) {
    Object.entries(props)
      .map(([key, value]): { key: KK; value: T[KK] } => {
        return {
          key: (key as unknown) as KK,
          value,
        };
      })
      .forEach((kv) => {
        element[kv.key] = kv.value;
      });
  }
  if (typeof children === "string") {
    element.innerHTML = children;
  } else {
    htmlElementToArray(children).forEach((child) => element.appendChild(child));
  }
  return element;
}

// String utils
export const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function isTemplateResult(element: any): element is TemplateResult {
  return "processor" in element && "strings" in element;
}

// --- Arg type helpers
export const getSelectArgType = <T>(
  name: string,
  entries: EnumArrayEntry<T>[]
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
  getSelectArgType<StringSelectArgType>("lang", [
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
export function makeStory<T>(config: Config<T>): (args: T) => BuilderOutput {
  const fn = (args: T) => config.builder(args);
  fn.args = { ...config.args } as T;

  fn.argTypes = {
    ...getComputedArgType<T>(fn.args),
    ...config.argTypes,
  };

  const buildPreview = (): string => {
    const preview =
      config.preview !== undefined ? config.preview(fn.args) : fn(fn.args);
    if (typeof preview === "string") {
      return preview;
    }
    if (isTemplateResult(preview)) {
      return preview.getHTML();
    }
    return htmlElementToArray(preview)
      .map((e) => e.outerHTML)
      .join("");
  };

  fn.parameters = {
    controls: { hideNoControlsWarning: true },
    ...getPreview(buildPreview()),
  };

  return fn;
}

// --- Story generator
const makeEnumStory = <T>(
  entries: EnumArrayEntry<T>[],
  maker: StoryMakerFn<T>
): ((args: T) => BuilderOutput) =>
  makeStory<T>({
    builder: (): HTMLElement =>
      getElement(
        "div",
        entries.map((entry) => maker(entry))
      ),
  });
export const makeSizeStory = (
  maker: StoryMakerFn<typeof Size>
): ((args: typeof Size) => BuilderOutput) => makeEnumStory(sizes, maker);
export const makeModeStory = (
  maker: StoryMakerFn<typeof Mode>
): ((args: typeof Mode) => BuilderOutput) => makeEnumStory(modes, maker);
export const makePositionStory = (
  maker: StoryMakerFn<typeof Position>
): ((args: typeof Position) => BuilderOutput) =>
  makeEnumStory(positions, maker);

// --- Form helper

export const getForm = (
  fields: HTMLElement | HTMLElement[],
  withActions = true
): HTMLElement => {
  const children = htmlElementToArray(fields);
  if (withActions) {
    children.push(
      getElement(
        "div",
        getElement(
          "div",
          [
            getElement("p6-button", "Submit", {
              mode: Mode.primary,
              type: "submit",
            }),
            getElement("p6-button", "Reset", {
              mode: Mode.danger,
              type: "reset",
            }),
          ],
          { className: "control" }
        ),
        {
          className: "field",
        }
      )
    );
  }
  return getElement("p6-form", children);
};
