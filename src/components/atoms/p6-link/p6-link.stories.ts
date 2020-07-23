/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from "lit-html";
import { Components } from "../../../components";
/* eslint-enable import/no-extraneous-dependencies */
import {
  getElement,
  makeStory,
  Props,
} from "../../../shared/storybook/stories";

const component = "p6-link";

export default {
  title: "Atoms/Link",
  component,
};

const getStoryField = (
  text: string,
  props?: Props<Components.P6Link>
): HTMLElement => getElement(component, text, props);

type P6LinkProps = { text: string; href: string };

export const Default = makeStory<P6LinkProps>({
  args: {
    text: "link",
    href: "",
  },
  builder: ({ text, ...args }): HTMLElement => {
    return getStoryField(text, args);
  },
});

export const WithHref = ({ text, ...args }: P6LinkProps): TemplateResult =>
  html`a ${getStoryField(text, args)} with a href`;
