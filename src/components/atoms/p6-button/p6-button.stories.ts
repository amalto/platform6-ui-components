import {
  getComponent,
  getForm,
  getSelectArgType,
  makeStory,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getStoryField = (text: string, props?: Prop): string => {
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
  builder: ({ text, ...args }) =>
    getForm(getStoryField(text, { ...args }), false),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        size: value,
      })
    ),
});

export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        mode: value,
      })
    ),
});

export const IconStory = makeStory({
  builder: (): string =>
    ["", "Home"]
      .map((text) =>
        getStoryField(
          `${getComponent("p6-icon", "", { name: "home" })}<span>${text}</span>`
        )
      )
      .join(""),
});

export const WaitingStory = makeStory({
  builder: (): string =>
    getStoryField("Waiting", {
      waiting: true,
    }),
});

export const DisabledStory = makeStory({
  builder: (): string =>
    getStoryField("Disabled", {
      disabled: true,
    }),
});

export const OutlinedStory = makeStory({
  builder: (): string =>
    getStoryField("Outlined", {
      outlined: true,
    }),
});
