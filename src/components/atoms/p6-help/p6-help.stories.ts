import { Components } from "../../../components";
import {
  getElement,
  makeStory,
  ModeStoryMaker,
  PositionStoryMaker,
  Props,
} from "../../../shared/storybook/stories";
import { Mode, Position } from "../../../shared/types";

const component = "p6-help";

export default {
  title: "Atoms/Help",
  component,
};

const getStoryField = (props?: Props<Components.P6Help>): HTMLElement =>
  getElement(component, [], props);

export const Default = makeStory<{
  text: string;
  mode: Mode;
  position: Position;
}>({
  args: {
    text: "Tooltip",
    mode: Mode.default,
    position: Position.top,
  },
  builder: (args): HTMLElement => getStoryField(args),
});

// --- Mode
export const Modes = makeStory({
  builder: (): HTMLElement =>
    ModeStoryMaker(({ key, value }) =>
      getStoryField({
        text: key,
        mode: value,
      })
    ),
});

// --- Position
export const Positions = makeStory({
  builder: (): HTMLElement =>
    PositionStoryMaker(({ key, value }) =>
      getStoryField({
        text: key,
        position: value,
      })
    ),
});
