import {
  getComponent,
  makeStory,
  ModeStoryMaker,
  Prop,
} from "../../../shared/storybook/stories";
import { Mode } from "../../../shared/types";

const getStoryField = (text: string, props?: Prop): string =>
  getComponent("p6-hint", text, props);

// Default
export const DefaultStory = makeStory<{ label: string; mode: Mode }>({
  args: { label: "hint", mode: Mode.success },
  builder: ({ label, ...props }): string => getStoryField(label, { ...props }),
});

// --- Mode
export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        mode: value,
      })
    ),
});
