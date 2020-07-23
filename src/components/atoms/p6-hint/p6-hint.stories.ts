import { Components } from "../../../components";
import {
  getElement,
  makeStory,
  ModeStoryMaker,
  Props,
} from "../../../shared/storybook/stories";
import { Mode } from "../../../shared/types";

const component = "p6-hint";

export default {
  title: "Atoms/Hint",
  component,
};

const getStoryField = (
  text: string,
  props?: Props<Components.P6Hint>
): HTMLElement => getElement(component, text, props);

// Default
export const Default = makeStory<{ label: string; mode: Mode }>({
  args: { label: "hint", mode: Mode.success },
  builder: ({ label, ...props }): HTMLElement =>
    getStoryField(label, { ...props }),
});

// --- Mode
export const Modes = makeStory({
  builder: (): HTMLElement =>
    ModeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        mode: value,
      })
    ),
});
