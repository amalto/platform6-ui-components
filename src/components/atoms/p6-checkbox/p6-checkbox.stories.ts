import {
  getComponent,
  makeStory,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getStoryField = (text: string, props?: Prop): string => {
  return getComponent("p6-checkbox", text, props);
};

// Default
export const DefaultStory = makeStory<{
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
  builder: ({ text, ...props }): string => getStoryField(text, { ...props }),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        size: value,
        checked: true,
      })
    ),
});

export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        mode: value,
        checked: true,
      })
    ),
});

export const DisabledStory = makeStory({
  builder: (): string =>
    getStoryField("Disabled", {
      disabled: true,
    }),
});
