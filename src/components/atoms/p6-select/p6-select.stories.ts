import { Components } from "../../../components";
import {
  getElement,
  getForm,
  makeStory,
  Props,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const component = "p6-select";

export default {
  title: "Atoms/Select",
  component,
};

const getStoryField = (
  options: HTMLElement[],
  props?: Props<Components.P6Select>
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
  return getElement("option", display, { value, ...props });
};

export const Default = makeStory<{
  lang: string;
  disabled: boolean;
  multiple: boolean;
  searchEnabled: boolean;
  shouldSort: boolean;
  required: boolean;
  readOnly: boolean;
  placeholder: string;
  size: Size;
  mode: Mode;
}>({
  args: {
    lang: "en",
    disabled: false,
    multiple: false,
    searchEnabled: true,
    shouldSort: true,
    required: false,
    readOnly: false,
    placeholder: "This is a placeholder",
    size: Size.normal,
    mode: Mode.default,
  },
  builder: (args): HTMLElement =>
    getStoryField(
      [
        getOption("no", "Not selected"),
        getOption("yes", "Selected", { selected: true }),
        getOption("never", "Disabled", { disabled: true }),
      ],
      args
    ),
});

export const Selected = makeStory({
  builder: (): HTMLElement =>
    getStoryField([
      getOption("no", "Unselected value"),
      getOption("yes", "Selected value", { selected: true }),
    ]),
});

export const MultipleSelected = makeStory({
  builder: (): HTMLElement =>
    getStoryField(
      [
        getOption("one", "One", { selected: true }),
        getOption("two", "Two", { selected: true }),
        getOption("three", "Three"),
      ],
      { multiple: true }
    ),
});

export const Disabled = makeStory({
  builder: (): HTMLElement =>
    getStoryField([getOption("value", "Display")], { disabled: true }),
});

export const CustomPlaceholder = makeStory<{ placeholder: string }>({
  args: {
    placeholder: "Custom placeholder",
  },
  builder: ({ placeholder }): HTMLElement =>
    getStoryField([getOption("value", "Display")], { placeholder }),
});

export const Placeholder = makeStory({
  builder: (): HTMLElement =>
    getStoryField([
      getOption("", "This is the placeholder"),
      getOption("one", "One"),
      getOption("two", "Two"),
      getOption("three", "Three"),
    ]),
});

export const WithoutSearch = makeStory<{ searchEnabled: boolean }>({
  args: {
    searchEnabled: false,
  },
  builder: (args): HTMLElement =>
    getStoryField(
      [
        getOption("one", "One"),
        getOption("two", "Two"),
        getOption("three", "Three"),
      ],
      args
    ),
});

export const Language = makeStory<{ lang: string }>({
  args: {
    lang: "en",
  },
  builder: (args): HTMLElement =>
    getStoryField(
      [
        getOption("one", "One"),
        getOption("two", "Two"),
        getOption("three", "Three"),
      ],
      args
    ),
});

export const Sizes = makeStory({
  builder: (): HTMLElement =>
    SizeStoryMaker(({ key, value }) =>
      getStoryField([getOption(`${value}`, key)], {
        size: value,
      })
    ),
});

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
