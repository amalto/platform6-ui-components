import { Components } from "../../../components";
import {
  getElement,
  getForm,
  makeStory,
  Props,
} from "../../../shared/storybook/stories";

const component = "p6-radio";

export default {
  title: "Atoms/Radio",
  component,
};

const getStoryField = (
  text: string,
  props?: Props<Components.P6Radio>
): HTMLElement => getElement(component, text, props);

export const Default = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  name: string;
  value: string;
}>({
  args: {
    disabled: false,
    readOnly: false,
    name: "field",
    value: "first",
  },
  builder: ({ value, ...args }): HTMLElement =>
    getElement(
      "div",
      ["first", "second"].map((key) =>
        getStoryField(key, {
          checked: value === key,
          value: key,
          ...args,
        })
      )
    ),
});

export const Readonly = makeStory({
  builder: (): HTMLElement =>
    getStoryField("Read only", {
      name: "readonly-example",
      checked: true,
      readOnly: true,
    }),
});

export const Disabled = makeStory({
  builder: (): HTMLElement =>
    getStoryField("Disabled", {
      name: "disabled-example",
      checked: true,
      disabled: true,
    }),
});

export const Form = makeStory({
  builder: (): HTMLElement =>
    getForm(
      ["first", "second"].map((key) =>
        getStoryField(key, { value: key, name: "field" })
      )
    ),
});
