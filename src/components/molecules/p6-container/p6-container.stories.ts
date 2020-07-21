import { getComponent, makeStory } from "../../../shared/storybook/stories";

const getStoryField = (text: string): string =>
  getComponent("p6-container", text);

export const DefaultStory = makeStory<{
  text: string;
}>({
  args: {
    text: "Container exemple",
  },
  builder: ({ text }) => getStoryField(text),
});
