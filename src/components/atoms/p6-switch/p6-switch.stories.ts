import { Components } from "../../../components";
import {
  getElement,
  makeStory,
  ModeStoryMaker,
  Props,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const component = "p6-switch";

export default {
  title: "Atoms/Switch",
  component,
};

const getStoryField = (
  label: string,
  props?: Props<Components.P6Switch>
): HTMLElement => getElement(component, label, props);

export const Default = makeStory<{
  disabled: boolean;
  size: Size;
  mode: Mode;
  label: string;
}>({
  args: {
    disabled: false,
    size: Size.normal,
    mode: Mode.default,
    label: "Switch label",
  },
  builder: ({ label, ...args }): HTMLElement =>
    getStoryField(label, { ...args }),
});

export const Disabled = makeStory({
  builder: (): HTMLElement => getStoryField("Label", { disabled: true }),
});

export const Enabled = makeStory({
  builder: (): HTMLElement => getStoryField("Label", { disabled: false }),
});

export const Sizes = makeStory({
  builder: (): HTMLElement =>
    SizeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        size: value,
      })
    ),
});

export const Modes = makeStory({
  builder: (): HTMLElement =>
    ModeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        mode: value,
      })
    ),
});
