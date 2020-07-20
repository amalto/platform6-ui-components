import { makeStory } from "../../../shared/storybook/makeStory";
import {
  getComponent,
  ModeStoryMaker,
  PositionStoryMaker,
  Prop,
} from "../../../shared/storybook/stories";
import { Mode, Position } from "../../../shared/types";

const getHelp = (props?: Prop): string => {
  return getComponent("p6-help", "", props);
};

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
  builder: (args): string => getHelp(args),
});

// --- Mode
export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ key, value }) =>
      getHelp({
        text: key,
        mode: value,
      })
    ),
});

// --- Position
export const PositionStory = makeStory({
  builder: (): string =>
    PositionStoryMaker(({ key, value }) =>
      getHelp({
        text: key,
        position: value,
      })
    ),
});
