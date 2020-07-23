import { Components } from "../../../components";
import {
  getElement,
  makeModeStory,
  makePositionStory,
  makeStory,
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
export const Modes = makeModeStory(({ key, value }) =>
  getStoryField({
    text: key,
    mode: value,
  })
);

// --- Position
export const Positions = makePositionStory(({ key, value }) =>
  getStoryField({
    text: key,
    position: value,
  })
);
