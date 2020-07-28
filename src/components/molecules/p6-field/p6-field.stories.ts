import { Components } from "../../../components";
import {
  ComponentProps,
  getElement,
  getForm,
  makeStory,
  Props,
} from "../../../shared/storybook";

const component = "p6-field";

export default {
  title: "Molecules/Field",
  component,
};

const componentProps: ComponentProps = ["size"];

const getStoryField = (
  children: HTMLElement[],
  props?: Props<Components.P6Field>
): HTMLElement => getElement(component, children, props);

const getFieldContent = (
  label: string,
  hint: string,
  prop?: Props<Components.P6Input>
): HTMLElement[] => [
  getElement("p6-label", label, {
    slot: "label",
  }),
  getElement("p6-hint", hint, {
    slot: "hint",
  }),
  getElement("p6-input", "", {
    name: "test",
    ...prop,
  }),
];

export const Default = makeStory<{
  label: string;
  hint: string;
}>({
  componentProps,
  args: {
    label: "Label",
    hint: "hint message",
  },
  builder: ({ label, hint, ...args }): HTMLElement =>
    getStoryField(getFieldContent(label, hint, { ...args })),
});

export const Form = makeStory<{
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  waiting: boolean;
  pattern: string;
}>({
  componentProps,
  args: {
    required: false,
    readonly: false,
    disabled: false,
    waiting: false,
    pattern: "42",
  },
  builder: (args): HTMLElement =>
    getForm(getStoryField(getFieldContent("Label", "hint message", args))),
});
