import {
  getComponent,
  makeStory,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getStoryField = (label: string, props?: Prop): string =>
  getComponent("p6-switch", label, props);

export const DefaultStory = makeStory<{
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
  builder: ({ label, ...args }): string => getStoryField(label, { ...args }),
});

export const DisabledStory = makeStory({
  builder: (): string => getStoryField("Label", { disabled: true }),
});

export const EnabledStory = makeStory({
  builder: (): string => getStoryField("Label", { disabled: false }),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        size: value,
      })
    ),
});

export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        mode: value,
      })
    ),
});
