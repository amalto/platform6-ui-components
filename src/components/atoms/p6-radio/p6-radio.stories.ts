import {
  getComponent,
  getForm,
  makeStory,
  Prop,
} from "../../../shared/storybook/stories";

const getStoryField = (text: string, props?: Prop): string =>
  getComponent("p6-radio", text, props);

export const DefaultStory = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  checked: boolean;
  name: string;
  label: string;
  value: string;
}>({
  args: {
    disabled: false,
    readOnly: false,
    checked: false,
    name: "field",
    label: "Label",
    value: "value",
  },
  builder: ({ label, ...args }): string => getStoryField(label, { ...args }),
});

export const ReadonlyStory = makeStory({
  builder: (): string =>
    getStoryField("Read only", {
      name: "readonly-example",
      checked: true,
      readOnly: true,
    }),
});

export const DisabledStory = makeStory({
  builder: (): string =>
    getStoryField("Disabled", {
      name: "disabled-example",
      checked: true,
      disabled: true,
    }),
});

export const FormStory = makeStory({
  builder: (): string =>
    getForm(
      ["first", "second", "third"]
        .map((key) => getStoryField(key, { value: key, name: "field" }))
        .join("\n")
    ),
});
