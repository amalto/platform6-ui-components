import { Components } from "../../../components";
import {
  getElement,
  makeStory,
  ModeStoryMaker,
  Props,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const component = "p6-action";

export default {
  title: "Atoms/Action",
  component,
};

const getStoryField = (props?: Props<Components.P6Action>): HTMLElement => {
  const size = props?.size !== undefined ? props.size : Size.normal;
  return getElement(
    component,
    getElement("p6-icon", [], {
      size,
      name: "home",
    }),
    props
  );
};

export const Default = makeStory<{
  size: Size;
  mode: Mode;
  disabled: boolean;
  waiting: boolean;
}>({
  args: {
    size: Size.normal,
    mode: Mode.default,
    disabled: false,
    waiting: false,
  },
  builder: (args) => getStoryField(args),
});

export const Modes = makeStory({
  builder: (): HTMLElement =>
    ModeStoryMaker(({ value }) =>
      getStoryField({
        mode: value,
      })
    ),
});

export const Disabled = makeStory({
  builder: (): HTMLElement =>
    getStoryField({
      disabled: true,
    }),
});

export const Waiting = makeStory({
  builder: (): HTMLElement =>
    getStoryField({
      waiting: true,
    }),
});

export const Sizes = makeStory({
  builder: (): HTMLElement =>
    SizeStoryMaker(({ value }) =>
      getStoryField({
        size: value,
      })
    ),
});
