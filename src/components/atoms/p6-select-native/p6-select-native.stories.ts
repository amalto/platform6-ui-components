/* eslint-disable import/no-extraneous-dependencies */
/* eslint-enable import/no-extraneous-dependencies */
import { makeStory } from "../../../shared/storybook/makeStory";
import {
  getComponent,
  getForm,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getInput = (options: string, props?: Prop): string => {
  return getComponent("p6-select-native", options, {
    name: "language",
    ...props,
  });
};

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
    getInput(
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
    getInput(
      `${getOption("", "Placeholder")}${getOption(
        "value",
        "Selected value",
        true
      )}`
    ),
});

export const DisabledStory = makeStory({
  builder: (): string =>
    getInput(
      `${getOption("", "Placeholder")}${getOption("value", "Display")}`,
      { disabled: true }
    ),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ key, value }) =>
      getInput(`${getOption("", "Placeholder")}${getOption("value", key)}`, {
        size: value,
      })
    ),
});

export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ key, value }) =>
      getInput(`${getOption("", "Placeholder")}${getOption("value", key)}`, {
        mode: value,
      })
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
      getInput(
        `
        ${getOption("", "Select language")}
        <optgroup label="Europe">
          ${getOption("fr", "Français")}
          ${getOption("en", "English")}
        </optgroup>`
      )
    ),
});
