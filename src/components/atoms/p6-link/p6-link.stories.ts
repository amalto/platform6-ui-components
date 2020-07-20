import { makeStory } from "../../../shared/storybook/makeStory";
import { getComponent, Prop } from "../../../shared/storybook/stories";

const getLink = (text: string, props?: Prop): string => {
  return getComponent("p6-link", text, props);
};

export const DefaultStory = makeStory<{
  text: string;
}>({
  args: {
    text: "link",
  },
  builder: ({ text }): string => getLink(text),
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
    `a ${getLink(text, { ...props })} with a href`,
});
