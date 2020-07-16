import { getTextKnob } from "../../../shared/storybook/knobs";
import {
  getBooleanProp,
  getComponent,
  getDisabledProp,
  getForm,
  getPreview,
  getReadOnlyProp,
  getRequiredProp,
  getTextProp,
  Prop,
} from "../../../shared/storybook/stories";

const getFieldContent = (prop?: Prop): string[] => [
  getComponent("p6-label", getTextKnob("Label", "Field label"), {
    slot: "label",
  }),
  getComponent("p6-hint", getTextKnob("Hint", "hint message"), {
    slot: "hint",
  }),
  getComponent("p6-input", "", {
    name: "test",
    ...prop,
  }),
];

export const DefaultStory = (): string => {
  return getComponent("p6-field", getFieldContent());
};
DefaultStory.parameters = getPreview(DefaultStory());

export const FormStory = (): string => {
  return getForm(
    getComponent(
      "p6-field",
      getFieldContent({
        ...getRequiredProp(),
        ...getReadOnlyProp(),
        ...getDisabledProp(),
        ...getTextProp("pattern", "Pattern"),
        ...getBooleanProp("waiting", "Waiting"),
      })
    )
  );
};
FormStory.parameters = getPreview(FormStory());
