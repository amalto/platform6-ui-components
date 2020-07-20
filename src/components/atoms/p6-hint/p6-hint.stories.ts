import { makeStory } from "../../../shared/storybook/makeStory";
import {
  getComponent,
  ModeStoryMaker,
  Prop,
} from "../../../shared/storybook/stories";
import { Mode } from "../../../shared/types";

const getHint = (text: string, props?: Prop): string => {
  return getComponent("p6-hint", text, props);
};

// Default
export const DefaultStory = makeStory<{ label: string; mode: Mode }>({
  args: { label: "hint", mode: Mode.success },
  builder: ({ label, ...props }): string => getHint(label, { ...props }),
});

// --- Mode
export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ key, value }) =>
      getHint(key, {
        mode: value,
      })
    ),
});
