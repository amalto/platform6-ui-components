import {
  getComponent,
  makeStory,
  ModeStoryMaker,
  PositionStoryMaker,
  Prop,
} from "../../../shared/storybook/stories";
import { Mode, Position } from "../../../shared/types";

const getStoryField = (props?: Prop): string =>
  getComponent("p6-help", "", props);

export const DefaultStory = makeStory<{
  text: string;
  mode: Mode;
  position: Position;
}>({
  args: {
    text: "Tooltip",
    mode: Mode.default,
    position: Position.top,
  },
  builder: (args): string => getStoryField(args),
});

// --- Mode
export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ key, value }) =>
      getStoryField({
        text: key,
        mode: value,
      })
    ),
});

// --- Position
export const PositionStory = makeStory({
  builder: (): string =>
    PositionStoryMaker(({ key, value }) =>
      getStoryField({
        text: key,
        position: value,
      })
    ),
});
