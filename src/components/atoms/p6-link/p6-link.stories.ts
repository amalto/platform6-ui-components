import {
  getComponent,
  makeStory,
  Prop,
} from "../../../shared/storybook/stories";

const getStoryField = (text: string, props?: Prop): string =>
  getComponent("p6-link", text, props);

export const DefaultStory = makeStory<{
  text: string;
}>({
  args: {
    text: "link",
  },
  builder: ({ text }): string => getStoryField(text),
});

export const WithHrefStory = makeStory<{
  text: string;
  href: string;
}>({
  args: {
    text: "link",
    href: "#azerty",
  },
  builder: ({ text, ...props }): string =>
    `a ${getStoryField(text, { ...props })} with a href`,
});
