import { Components } from "../../../components";
import {
  getElement,
  makeStory,
  Props,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Size } from "../../../shared/types";

const component = "p6-translation";

export default {
  title: "Molecules/Translation",
  component,
};

const getStoryField = (
  description: string,
  props?: Props<Components.P6Translation>
): HTMLElement => {
  const size = props?.size !== undefined ? props.size : Size.normal;
  return getElement(
    component,
    [
      getElement("p6-icon", [], { size, name: "home" }),
      getElement("span", description),
    ],
    { ...props }
  );
};

export const Default = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  size: Size;
  label: string;
  lang: string;
}>({
  args: {
    disabled: false,
    readOnly: false,
    size: Size.normal,
    label: "Description",
    lang: "en",
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
