import { Components } from "../../../components";
import {
  getElement,
  getForm,
  makeModeStory,
  makeSizeStory,
  makeStory,
  Props,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const component = "p6-select-native";

export default {
  title: "Atoms/Select native",
  component,
};

const getStoryField = (
  options: HTMLElement[],
  props?: Props<Components.P6SelectNative>
): HTMLElement =>
  getElement(component, options, {
    name: "language",
    ...props,
  });

const getOption = (
  value: string,
  display: string,
  props?: Props<HTMLOptionElement>
): HTMLElement => {
  return getElement("option", display, {
    value,
    ...props,
  });
};

export const Default = makeStory<{
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
  builder: (args): HTMLElement =>
    getStoryField(
      [
        getOption("", "Select language"),
        getElement(
          "optgroup",
          [getOption("fr", "Français"), getOption("en", "English")],
          { label: "Europe" }
        ),
      ],
      args
    ),
});

export const Selected = makeStory({
  builder: (): HTMLElement =>
    getStoryField([
      getOption("", "Placeholder"),
      getOption("value", "Selected value", { selected: true }),
    ]),
});

export const Disabled = makeStory({
  builder: (): HTMLElement =>
    getStoryField(
      [getOption("", "Placeholder"), getOption("value", "Display")],
      { disabled: true }
    ),
});

export const Sizes = makeSizeStory(({ key, value }) =>
  getStoryField([getOption("", "Placeholder"), getOption("value", key)], {
    size: value,
  })
);

export const Modes = makeModeStory(({ key, value }) =>
  getStoryField([getOption("", "Placeholder"), getOption("value", key)], {
    mode: value,
  })
);

export const Form = makeStory<{
  required: boolean;
}>({
  args: {
    required: false,
  },
  builder: (): HTMLElement =>
    getForm(
      getStoryField([
        getOption("", "Select language"),
        getElement(
          "optgroup",
          [getOption("fr", "Français"), getOption("en", "English")],
          { label: "Europe" }
        ),
      ])
    ),
});
