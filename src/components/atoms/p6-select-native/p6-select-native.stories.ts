/* eslint-disable import/no-extraneous-dependencies */
/* eslint-enable import/no-extraneous-dependencies */
import {
  getBooleanProp,
  getComponent,
  getDisabledProp,
  getForm,
  getPreview,
  getReadOnlyProp,
  getRequiredProp,
  getSizeProp,
  ModeStoryMaker,
  Preview,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";

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

export const DefaultStory = (): string =>
  getForm(
    getInput(
      `
        ${getOption("", "Select language")}
        <optgroup label="Europe">
          ${getOption("fr", "Français")}
          ${getOption("en", "English")}
        </optgroup>`,
      {
        ...getDisabledProp(),
        ...getReadOnlyProp(),
        ...getRequiredProp(),
        ...getBooleanProp("fullWidth", "Full width"),
        ...getBooleanProp("multiple", "Multiple"),
        ...getSizeProp(),
      }
    )
  );

export const SelectedStory = (): string =>
  getInput(
    `${getOption("", "Placeholder")}${getOption(
      "value",
      "Selected value",
      true
    )}`
  );

export const DisabledStory = (): string =>
  getInput(`${getOption("", "Placeholder")}${getOption("value", "Display")}`, {
    disabled: true,
  });

export const SizeStory = (): string =>
  SizeStoryMaker(({ key, value }) =>
    getInput(getOption(key, key), { size: value })
  );

export const ModeStory = (): string =>
  ModeStoryMaker(({ key, value }) =>
    getInput(getOption(key, key), { mode: value })
  );

export const Previews = {
  Default: (props: Prop | undefined): Preview =>
    getPreview(getInput(getOption("key", "Value"), props)),
  Selected: getPreview(getInput(getOption("key", "Value", true))),
};
