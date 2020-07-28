import { Components } from "../../../components";
import {
  ComponentProps,
  getElement,
  makeModeStory,
  makeSizeStory,
  makeStory,
  Props,
} from "../../../shared/storybook";
import { Mode, Size } from "../../../shared/types";

const component = "p6-tag";

export default {
  title: "Atoms/Tag",
  component,
};

const componentProps: ComponentProps = ["mode", "size"];

const getStoryField = (
  name: string,
  props?: Props<Components.P6Tag>
): HTMLElement => getElement(component, name, props);

export const Default = makeStory<{
  size: Size;
  mode: Mode;
  label: string;
}>({
  componentProps,
  args: {
    size: Size.normal,
    mode: Mode.default,
    label: "Tag",
  },
  builder: ({ label, ...args }): HTMLElement =>
    getStoryField(label, { ...args }),
});

export const Sizes = makeSizeStory({
  componentProps,
  builder: ({ key, value }) =>
    getStoryField(key, {
      size: value,
    }),
});

export const Modes = makeModeStory({
  componentProps,
  builder: ({ key, value }) =>
    getStoryField(key, {
      mode: value,
    }),
});
