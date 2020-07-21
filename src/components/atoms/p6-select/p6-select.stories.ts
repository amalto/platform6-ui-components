import {
  getComponent,
  getForm,
  makeStory,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getStoryField = (options: string[], props?: Prop): string =>
  getComponent("p6-select", options, {
    name: "language",
    ...props,
  });

const getOption = (value: string, display: string, props?: Prop): string => {
  return getComponent("option", display, { value, ...props });
};

export const DefaultStory = makeStory<{
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
  builder: (args): string =>
    getStoryField(
      [
        getOption("no", "Not selected"),
        getOption("yes", "Selected", { selected: true }),
        getOption("never", "Disabled", { disabled: true }),
      ],
      args
    ),
});

export const SelectedStory = makeStory({
  builder: (): string =>
    getStoryField([
      getOption("no", "Unselected value"),
      getOption("yes", "Selected value", { selected: true }),
    ]),
});

export const MultipleSelectedStory = makeStory({
  builder: (): string =>
    getStoryField(
      [
        getOption("one", "One", { selected: true }),
        getOption("two", "Two", { selected: true }),
        getOption("three", "Three"),
      ],
      { multiple: true }
    ),
});

export const DisabledStory = makeStory({
  builder: (): string =>
    getStoryField([getOption("value", "Display")], { disabled: true }),
});

export const CustomPlaceholderStory = makeStory<{ placeholder: string }>({
  args: {
    placeholder: "Custom placeholder",
  },
  builder: ({ placeholder }): string =>
    getStoryField([getOption("value", "Display")], { placeholder }),
});

export const PlaceholderStory = makeStory({
  builder: (): string =>
    getStoryField([
      getOption("", "This is the placeholder"),
      getOption("one", "One"),
      getOption("two", "Two"),
      getOption("three", "Three"),
    ]),
});

export const WithoutSearchStory = makeStory<{ searchEnabled: boolean }>({
  args: {
    searchEnabled: false,
  },
  builder: (args): string =>
    getStoryField(
      [
        getOption("one", "One"),
        getOption("two", "Two"),
        getOption("three", "Three"),
      ],
      args
    ),
});

export const LanguageStory = makeStory<{ lang: string }>({
  args: {
    lang: "en",
  },
  builder: (args): string =>
    getStoryField(
      [
        getOption("one", "One"),
        getOption("two", "Two"),
        getOption("three", "Three"),
      ],
      args
    ),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ key, value }) =>
      getStoryField([getOption(`${value}`, key)], {
        size: value,
      })
    ),
});

export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ key, value }) =>
      getStoryField([getOption(`${value}`, key)], {
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
      getStoryField([
        getOption("", "Select language"),
        getComponent(
          "optgroup",
          [getOption("fr", "Français"), getOption("en", "English")],
          { label: "Europe" }
        ),
      ])
    ),
});
