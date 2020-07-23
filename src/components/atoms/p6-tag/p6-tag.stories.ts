import { Components } from "../../../components";
import {
  getElement,
  makeStory,
  ModeStoryMaker,
  Props,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const component = "p6-tag";

export default {
  title: "Atoms/Tag",
  component,
};

const getStoryField = (
  name: string,
  props?: Props<Components.P6Tag>
): HTMLElement => getElement(component, name, props);

export const Default = makeStory<{
  size: Size;
  mode: Mode;
  label: string;
}>({
  args: {
    size: Size.normal,
    mode: Mode.default,
    label: "Tag",
  },
  builder: ({ label, ...args }): HTMLElement =>
    getStoryField(label, { ...args }),
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
