import {
  getSelectArgType,
  makeStory,
} from "../../../shared/storybook/makeStory";
import {
  getComponent,
  getForm,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getButton = (text: string, props?: Prop): string => {
  return getComponent("p6-button", text, props);
};

export const DefaultStory = makeStory<{
  text: string;
  size: Size;
  mode: Mode;
  disabled: boolean;
  outlined: boolean;
  waiting: boolean;
  type: string;
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
    ...getSelectArgType(
      "type",
      ["submit", "reset", "button"].map((type) => ({ key: type, value: type }))
    ),
  },
  builder: ({ text, ...args }) => getForm(getButton(text, { ...args }), false),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ key, value }) =>
      getButton(key, {
        size: value,
      })
    ),
});

export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ key, value }) =>
      getButton(key, {
        mode: value,
      })
    ),
});

export const IconStory = makeStory({
  builder: (): string =>
    ["", "Home"]
      .map((text) =>
        getButton(
          `${getComponent("p6-icon", "", { name: "home" })}<span>${text}</span>`
        )
      )
      .join(""),
});

export const WaitingStory = makeStory({
  builder: (): string =>
    getButton("Waiting", {
      waiting: true,
    }),
});

export const DisabledStory = makeStory({
  builder: (): string =>
    getButton("Disabled", {
      disabled: true,
    }),
});

export const OutlinedStory = makeStory({
  builder: (): string =>
    getButton("Outlined", {
      outlined: true,
    }),
});
