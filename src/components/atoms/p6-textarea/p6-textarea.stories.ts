import { Components } from "../../../components";
import {
  getElement,
  getForm,
  makeStory,
  Props,
} from "../../../shared/storybook/stories";

const component = "p6-textarea";

export default {
  title: "Atoms/Textarea",
  component,
};

const getStoryField = (props?: Props<Components.P6Textarea>): HTMLElement =>
  getElement(component, "", { ...props });

export const Default = makeStory<{
  placeholder: string;
  min: number;
  max: number;
  rows: number;
  cols: number;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  waiting: boolean;
  resizable: boolean;
}>({
  args: {
    placeholder: "Placeholder",
    min: 0,
    max: 42,
    rows: 4,
    cols: 8,
    disabled: false,
    readOnly: false,
    required: false,
    waiting: false,
    resizable: false,
  },
  builder: (args): HTMLElement => getStoryField(args),
});

export const Form = makeStory({
  builder: (): HTMLElement => getForm(getStoryField()),
});

export const ReadOnly = makeStory({
  builder: (): HTMLElement => getStoryField({ readOnly: true }),
});

export const Disabled = makeStory({
  builder: (): HTMLElement => getStoryField({ disabled: true }),
});

export const Waiting = makeStory({
  builder: (): HTMLElement => getStoryField({ waiting: true }),
});
