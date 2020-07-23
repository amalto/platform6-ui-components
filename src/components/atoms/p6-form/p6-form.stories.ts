import { Components } from "../../../components";
import { getElement, Props } from "../../../shared/storybook/stories";

const component = "p6-form";

export default {
  title: "Atoms/Form",
  component,
};

const getStoryField = (
  children: HTMLElement[],
  props?: Props<Components.P6Checkbox>
): HTMLElement => {
  return getElement(component, children, props);
};

export const Default = (): HTMLElement =>
  getStoryField([
    getElement("p6-field", [
      getElement("p6-label", "custom inputs", { slot: "label" }),
      getElement("p6-input", [], { name: "c-input", required: true }),
    ]),
    getElement("p6-field", [
      getElement("p6-label", "native input", { slot: "label" }),
      getElement("input", [], { name: "n-input", required: true }),
    ]),
  ]);
