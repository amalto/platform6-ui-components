import {
  capitalize,
  getComponent,
  getSelectArgType,
  makeStory,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Size } from "../../../shared/types";

const getStoryField = (props?: Prop): string =>
  getComponent("p6-input", "", props);

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
  builder: (args): string => getStoryField(args),
});

export const TextStory = makeStory({
  builder: (): string => getStoryField({ type: "text" }),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ key, value }) =>
      getStoryField({ size: value, placeholder: `${capitalize(key)} input` })
    ),
});

export const ReadonlyStory = makeStory({
  builder: (): string =>
    getStoryField({ readOnly: true, placeholder: "Read only" }),
});

export const DisabledStory = makeStory({
  builder: (): string =>
    getStoryField({ disabled: true, placeholder: "Disabled" }),
});

export const WaitingStory = makeStory({
  builder: (): string =>
    getStoryField({ waiting: true, placeholder: "Waiting" }),
});

export const OnErrorStory = makeStory({
  builder: (): string => getStoryField({ pattern: "42", value: "84" }),
});
