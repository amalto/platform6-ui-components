/* eslint-disable import/no-extraneous-dependencies */
import {
  getSelectArgType,
  makeStory,
} from "../../../shared/storybook/makeStory";
/* eslint-enable import/no-extraneous-dependencies */
import {
  capitalize,
  getComponent,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Size } from "../../../shared/types";

const getInput = (props?: Prop): string => {
  return getComponent("p6-input", "", props);
};

export const DefaultStory = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  waiting: boolean;
  min: number;
  max: number;
  pattern: string;
  placeholder: string;
  type: string;
  size: Size;
  value: string;
}>({
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    waiting: false,
    min: 0,
    max: 42,
    pattern: "",
    placeholder: "Placeholder",
    type: "",
    size: Size.normal,
    value: "",
  },
  argTypes: {
    ...getSelectArgType(
      "type",
      [
        "email",
        "number",
        "password",
        "search",
        "tel",
        "text",
        "url",
      ].map((type) => ({ key: type, value: type }))
    ),
  },
  builder: (args): string => getInput(args),
});

export const TextStory = makeStory({
  builder: (): string => getInput({ type: "text" }),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ key, value }) =>
      getInput({ size: value, placeholder: `${capitalize(key)} input` })
    ),
});

export const ReadonlyStory = makeStory({
  builder: (): string => getInput({ readOnly: true, placeholder: "Read only" }),
});

export const DisabledStory = makeStory({
  builder: (): string => getInput({ disabled: true, placeholder: "Disabled" }),
});

export const WaitingStory = makeStory({
  builder: (): string => getInput({ waiting: true, placeholder: "Waiting" }),
});

export const OnErrorStory = makeStory({
  builder: (): string => getInput({ pattern: "42", value: "84" }),
});
