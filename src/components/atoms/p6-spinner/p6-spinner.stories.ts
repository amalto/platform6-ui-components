import { Components } from "../../../components";
import {
  getElement,
  makeStory,
  Props,
} from "../../../shared/storybook/stories";

const component = "p6-spinner";

export default {
  title: "Atoms/Spinner",
  component,
};

const getStoryField = (props?: Props<Components.P6Spinner>): HTMLElement => {
  return getElement(component, [], props);
};

export const Default = makeStory({
  builder: (): HTMLElement =>
    getStoryField({
      style: { width: "4.2rem", height: "4.2rem" } as CSSStyleDeclaration,
    }),
});

export const SmallContainer = makeStory({
  builder: (): HTMLElement =>
    getStoryField({
      style: { width: "1rem", height: "1rem" } as CSSStyleDeclaration,
    }),
});

export const VerticalContainer = makeStory({
  builder: (): HTMLElement =>
    getStoryField({
      style: {
        width: "10.5rem",
        height: "21rem",
        background: "#eee",
      } as CSSStyleDeclaration,
    }),
});

export const HorizontalContainer = makeStory({
  builder: (): HTMLElement =>
    getStoryField({
      style: {
        width: "21rem",
        height: "10.5rem",
        background: "#eee",
      } as CSSStyleDeclaration,
    }),
});
