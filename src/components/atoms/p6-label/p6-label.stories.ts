import { makeStory } from "../../../shared/storybook/makeStory";
import { getComponent } from "../../../shared/storybook/stories";

export const DefaultStory = makeStory<{
  text: string;
}>({
  args: {
    text: "Label",
  },
  builder: ({ text }): string => getComponent("p6-label", text),
});
