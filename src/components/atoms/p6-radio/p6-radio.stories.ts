/* eslint-disable import/no-extraneous-dependencies */
import { makeStory } from "../../../shared/storybook/makeStory";
/* eslint-enable import/no-extraneous-dependencies */
import { getComponent, getForm, Prop } from "../../../shared/storybook/stories";

const getInput = (text: string, props?: Prop): string => {
  return getComponent("p6-radio", text, props);
};

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
  builder: ({ label, ...args }): string => getInput(label, { ...args }),
});

export const ReadonlyStory = makeStory({
  builder: (): string =>
    getInput("Read only", {
      name: "readonly-example",
      checked: true,
      readOnly: true,
    }),
});

export const DisabledStory = makeStory({
  builder: (): string =>
    getInput("Disabled", {
      name: "disabled-example",
      checked: true,
      disabled: true,
    }),
});

export const FormStory = makeStory({
  builder: (): string =>
    getForm(
      ["first", "second", "third"]
        .map((key) => getInput(key, { value: key, name: "field" }))
        .join("\n")
    ),
});
