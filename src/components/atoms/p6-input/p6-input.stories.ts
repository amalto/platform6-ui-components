import { Components } from "../../../components";
import {
  capitalize,
  getElement,
  getSelectArgType,
  makeSizeStory,
  makeStory,
  Props,
} from "../../../shared/storybook/stories";
import { Size } from "../../../shared/types";
import { enumToArray } from "../../../utils/enum";
import { P6InputType } from "./types";

const component = "p6-input";

export default {
  title: "Atoms/Input",
  component,
};

const getStoryField = (props?: Props<Components.P6Input>): HTMLElement =>
  getElement(component, [], props);

export const DefaultStory = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  waiting: boolean;
  min: number;
  max: number;
  pattern: string;
  placeholder: string;
  type: P6InputType;
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
    type: P6InputType.text,
    size: Size.normal,
    value: "",
  },
  argTypes: {
    ...getSelectArgType("type", enumToArray(P6InputType)),
  },
  builder: (args): HTMLElement => getStoryField(args),
});

export const TextStory = makeStory({
  builder: (): HTMLElement => getStoryField({ type: P6InputType.text }),
});

export const SizeStory = makeSizeStory(({ key, value }) =>
  getStoryField({ size: value, placeholder: `${capitalize(key)} input` })
);

export const ReadonlyStory = makeStory({
  builder: (): HTMLElement =>
    getStoryField({ readOnly: true, placeholder: "Read only" }),
});

export const DisabledStory = makeStory({
  builder: (): HTMLElement =>
    getStoryField({ disabled: true, placeholder: "Disabled" }),
});

export const WaitingStory = makeStory({
  builder: (): HTMLElement =>
    getStoryField({ waiting: true, placeholder: "Waiting" }),
});

export const OnErrorStory = makeStory({
  builder: (): HTMLElement => getStoryField({ pattern: "42", value: "84" }),
});
