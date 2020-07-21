import {
  getComponent,
  getForm,
  makeStory,
  Prop,
} from "../../../shared/storybook/stories";

const getFieldContent = (
  label: string,
  hint: string,
  prop?: Prop
): string[] => [
  getComponent("p6-label", label, {
    slot: "label",
  }),
  getComponent("p6-hint", hint, {
    slot: "hint",
  }),
  getComponent("p6-input", "", {
    name: "test",
    ...prop,
  }),
];

export const DefaultStory = makeStory<{
  label: string;
  hint: string;
}>({
  args: {
    label: "Label",
    hint: "hint message",
  },
  builder: ({ label, hint, ...args }): string =>
    getComponent("p6-field", getFieldContent(label, hint, { ...args })),
});

export const FormStory = makeStory<{
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  waiting: boolean;
  pattern: string;
}>({
  args: {
    required: false,
    readonly: false,
    disabled: false,
    waiting: false,
    pattern: "42",
  },
  builder: (args): string =>
    getForm(
      getComponent("p6-field", getFieldContent("Label", "hint message", args))
    ),
});
