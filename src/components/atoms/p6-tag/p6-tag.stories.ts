import { Components } from "../../../components";
import {
  getElement,
  makeModeStory,
  makeSizeStory,
  makeStory,
  Props,
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

export const Sizes = makeSizeStory(({ key, value }) =>
  getStoryField(key, {
    size: value,
  })
);

export const Modes = makeModeStory(({ key, value }) =>
  getStoryField(key, {
    mode: value,
  })
);
