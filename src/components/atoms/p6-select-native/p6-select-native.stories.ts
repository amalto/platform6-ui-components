import {
  getComponent,
  getForm,
  makeStory,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getStoryField = (options: string, props?: Prop): string =>
  getComponent("p6-select-native", options, {
    name: "language",
    ...props,
  });

const getOption = (
  value: string,
  display: string,
  selected = false
): string => {
  return `<option value="${value}" ${
    selected ? "selected" : ""
  }>${display}</option>`;
};

export const DefaultStory = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  fullWidth: boolean;
  multiple: boolean;
  size: Size;
  mode: Mode;
}>({
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    fullWidth: false,
    multiple: false,
    size: Size.normal,
    mode: Mode.default,
  },
  builder: (args): string =>
    getStoryField(
      `
        ${getOption("", "Select language")}
        <optgroup label="Europe">
          ${getOption("fr", "Français")}
          ${getOption("en", "English")}
        </optgroup>`,
      args
    ),
});

export const SelectedStory = makeStory({
  builder: (): string =>
    getStoryField(
      `${getOption("", "Placeholder")}${getOption(
        "value",
        "Selected value",
        true
      )}`
    ),
});

export const DisabledStory = makeStory({
  builder: (): string =>
    getStoryField(
      `${getOption("", "Placeholder")}${getOption("value", "Display")}`,
      { disabled: true }
    ),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ key, value }) =>
      getStoryField(
        `${getOption("", "Placeholder")}${getOption("value", key)}`,
        {
          size: value,
        }
      )
    ),
});

export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ key, value }) =>
      getStoryField(
        `${getOption("", "Placeholder")}${getOption("value", key)}`,
        {
          mode: value,
        }
      )
    ),
});

export const FormStory = makeStory<{
  required: boolean;
}>({
  args: {
    required: false,
  },
  builder: (): string =>
    getForm(
      getStoryField(
        `
        ${getOption("", "Select language")}
        <optgroup label="Europe">
          ${getOption("fr", "Français")}
          ${getOption("en", "English")}
        </optgroup>`
      )
    ),
});
