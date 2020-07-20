import { makeStory } from "../../../shared/storybook/makeStory";
import {
  getComponent,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getAction = (props?: Prop): string => {
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
  builder: (args) => getAction(args),
});

export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ value }) =>
      getAction({
        mode: value,
      })
    ),
});

export const DisabledStory = makeStory({
  builder: (): string =>
    getAction({
      disabled: true,
    }),
});

export const WaitingStory = makeStory({
  builder: (): string =>
    getAction({
      waiting: true,
    }),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ value }) =>
      getAction({
        size: value,
      })
    ),
});
