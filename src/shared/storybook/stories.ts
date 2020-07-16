import {
  EnumArrayEntry,
  enumArrayToObject,
  EnumObject,
} from "../../utils/enum";
import { Mode, modes, Position, positions, Size, sizes } from "../types";
import {
  getBooleanKnob,
  getNumberKnob,
  getSelectKnob,
  getTextKnob,
} from "./knobs";

export type Prop = { [key: string]: string | boolean | number };
export type Preview = { docs: { source: { code: string } } };

const sizesForSelect: EnumObject = enumArrayToObject(sizes);
const modesForSelect = enumArrayToObject(modes);
const positionsForSelect = enumArrayToObject(positions);

export const getTextProp = (key: string, label: string, value = ""): Prop => ({
  [key]: getTextKnob(label, value),
});

export const getBooleanProp = (
  key: string,
  label: string,
  value?: boolean
): Prop => ({
  [key]: getBooleanKnob(label, value),
});

export const getNumberProp = (
  key: string,
  label: string,
  value?: number
): Prop => ({
  [key]: getNumberKnob(label, value),
});

export const getSelectProp = (
  key: string,
  label: string,
  options: string[],
  value = ""
): Prop => ({
  [key]: getSelectKnob(label, options, value),
});

export const getModeProp = (value: Mode = Mode.default): Prop => ({
  mode: getSelectKnob("Mode", modesForSelect, value),
});
export const getSizeProp = (value: Size = Size.normal): Prop => ({
  size: getSelectKnob("Size", sizesForSelect, value),
});
export const getPositionProp = (value: Position = Position.top): Prop => ({
  position: getSelectKnob("Position", positionsForSelect, value),
});

export const getDisabledProp = (value = false): Prop =>
  getBooleanProp("disabled", "Disabled", value);
export const getRequiredProp = (value = false): Prop =>
  getBooleanProp("required", "Required", value);
export const getReadOnlyProp = (value = false): Prop =>
  getBooleanProp("readOnly", "Read only", value);

const getFormActions = (show: boolean): string => {
  if (show) {
    return `
      <div class="field">
        <div class="control">
          <p6-button class="button is-link" size="${Size.small}">Submit</p6-button>
          <p6-button class="button is-link" size="${Size.small}" type="reset">Reset</p6-button>
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
  return `
<${component}${getAttrsAndProps(props)}>
    ${Array.from(child).join("")}
</${component}>`;
};

export const getPreview = (code: string): Preview => {
  return {
    docs: { source: { code } },
  };
};

export type StoryMakerFn = (value: EnumArrayEntry) => string;
const EnumStoryMaker = (
  entries: EnumArrayEntry[],
  maker: StoryMakerFn
): string => entries.map((entry) => maker(entry)).join("");

export const SizeStoryMaker = (maker: StoryMakerFn): string =>
  EnumStoryMaker(sizes, maker);
export const ModeStoryMaker = (maker: StoryMakerFn): string =>
  EnumStoryMaker(modes, maker);

export const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

export type MakerFn = (props: Prop) => string;

export type StoryConf = {
  componentName: string;
  items: string | MakerFn;
  prop?: Prop;
  previewProp?: Prop;
  preview?: string | MakerFn;
};

export const makeStory = ({
  items,
  prop = {},
  previewProp = {},
  preview,
}: StoryConf): (() => string) => {
  const story = (): string => (typeof items === "string" ? items : items(prop));
  if (preview !== undefined) {
    story.parameters = getPreview(
      typeof preview === "string"
        ? preview
        : preview({ ...prop, ...previewProp })
    );
  }
  return story;
};
