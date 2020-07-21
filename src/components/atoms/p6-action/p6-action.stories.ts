import {
  getComponent,
  makeStory,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getStoryField = (props?: Prop): string => {
  const size = props?.size !== undefined ? props.size : Size.normal;
  return getComponent(
    "p6-action",
    getComponent("p6-icon", "", {
      size,
      name: "home",
    }),
    props
  );
};

export const DefaultStory = makeStory<{
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

export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ value }) =>
      getStoryField({
        mode: value,
      })
    ),
});

export const DisabledStory = makeStory({
  builder: (): string =>
    getStoryField({
      disabled: true,
    }),
});

export const WaitingStory = makeStory({
  builder: (): string =>
    getStoryField({
      waiting: true,
    }),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ value }) =>
      getStoryField({
        size: value,
      })
    ),
});
