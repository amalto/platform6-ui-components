import { Components } from "../../../components";
import {
  getElement,
  makeStory,
  ModeStoryMaker,
  Props,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const component = "p6-language";

export default {
  title: "Molecules/Language",
  component,
};

const getStoryField = (props?: Props<Components.P6Language>): HTMLElement =>
  getElement(component, [], { name: "language", ...props });

export const Default = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  size: Size;
  mode: Mode;
  fullWidth: boolean;
  value: string;
}>({
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    size: Size.normal,
    mode: Mode.default,
    fullWidth: false,
    value: "fr",
  },
  builder: (args): HTMLElement => getStoryField(args),
});

export const SelectedValue = makeStory<{
  value: string;
}>({
  args: {
    value: "fr",
  },
  builder: (args): HTMLElement => getStoryField(args),
});

export const Disabled = makeStory<{
  disabled: boolean;
}>({
  args: {
    disabled: false,
  },
  builder: (args): HTMLElement => getStoryField(args),
});

export const Sizes = makeStory({
  builder: (): HTMLElement =>
    SizeStoryMaker(({ value }) =>
      getStoryField({
        size: value,
      })
    ),
});

export const Modes = makeStory({
  builder: (): HTMLElement =>
    ModeStoryMaker(({ value }) =>
      getStoryField({
        mode: value,
      })
    ),
});
