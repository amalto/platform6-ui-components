import { Components } from "../../../components";
import {
  getElement,
  makeStory,
  ModeStoryMaker,
  Props,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const component = "p6-checkbox";

export default {
  title: "Atoms/Checkbox",
  component,
};

const getStoryField = (
  text: string,
  props?: Props<Components.P6Checkbox>
): HTMLElement => {
  return getElement(component, text, props);
};

// Default
export const Default = makeStory<{
  text: string;
  mode: Mode;
  size: Size;
  checked: boolean;
  disabled: boolean;
}>({
  args: {
    text: "Click me",
    mode: Mode.default,
    size: Size.normal,
    checked: false,
    disabled: false,
  },
  builder: ({ text, ...props }): HTMLElement =>
    getStoryField(text, { ...props }),
});

export const Sizes = makeStory({
  builder: (): HTMLElement =>
    SizeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        size: value,
        checked: true,
      })
    ),
});

export const Modes = makeStory({
  builder: (): HTMLElement =>
    ModeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        mode: value,
        checked: true,
      })
    ),
});

export const Disabled = makeStory({
  builder: (): HTMLElement =>
    getStoryField("Disabled", {
      disabled: true,
    }),
});
