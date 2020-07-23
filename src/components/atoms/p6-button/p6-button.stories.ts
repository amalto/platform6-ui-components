import { Components } from "../../../components";
import {
  getElement,
  getForm,
  getSelectArgType,
  makeModeStory,
  makeSizeStory,
  makeStory,
  Props,
  StringSelectArgType,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";
import { P6ButtonType } from "./p6-button";

const component = "p6-button";

export default {
  title: "Atoms/Button",
  component,
};

const getStoryField = (
  text: string | HTMLElement[],
  props?: Props<Components.P6Button>
): HTMLElement => {
  return getElement(component, text, props);
};

export const Default = makeStory<{
  text: string;
  size: Size;
  mode: Mode;
  disabled: boolean;
  outlined: boolean;
  waiting: boolean;
  type: P6ButtonType;
}>({
  args: {
    text: "My button",
    type: "button",
    size: Size.normal,
    mode: Mode.default,
    disabled: false,
    outlined: false,
    waiting: false,
  },
  argTypes: {
    ...getSelectArgType<StringSelectArgType>(
      "type",
      ["submit", "reset", "button"].map((type) => ({ key: type, value: type }))
    ),
  },
  builder: ({ text, ...args }) =>
    getForm(getStoryField(text, { ...args }), false),
});

export const Sizes = makeSizeStory(({ key, value }) =>
  getStoryField(key, {
    size: value,
  })
);

export const Modes = makeModeStory(({ key, value }) =>
  getStoryField(key, {
    mode: value,
  })
);

export const Icon = makeStory({
  builder: (): HTMLElement =>
    getElement(
      "div",
      ["", "Home"].map((text) =>
        getStoryField([
          getElement("p6-icon", [], { name: "home" }),
          getElement("span", text),
        ])
      )
    ),
});

export const Waiting = makeStory({
  builder: (): HTMLElement =>
    getStoryField("Waiting", {
      waiting: true,
    }),
});

export const Disabled = makeStory({
  builder: (): HTMLElement =>
    getStoryField("Disabled", {
      disabled: true,
    }),
});

export const Outlined = makeStory({
  builder: (): HTMLElement =>
    getStoryField("Outlined", {
      outlined: true,
    }),
});
