/* eslint-disable import/no-extraneous-dependencies */
import { getSelectKnob } from "../../../shared/storybook/knobs";
/* eslint-enable import/no-extraneous-dependencies */
import {
  capitalize,
  getBooleanProp,
  getComponent,
  getDisabledProp,
  getForm,
  getNumberProp,
  getPreview,
  getReadOnlyProp,
  getRequiredProp,
  getTextProp,
  Preview,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";

const getInput = (props?: Prop): string => {
  return getComponent("p6-input", "", props);
};

export const DefaultStory = (): string =>
  getForm(
    getInput({
      ...getDisabledProp(),
      ...getReadOnlyProp(),
      ...getRequiredProp(),
      ...getBooleanProp("waiting", "Waiting"),
      ...getNumberProp("min", "Min"),
      ...getNumberProp("max", "Max", 42),
      ...getTextProp("pattern", "Pattern"),
      ...getTextProp("placeholder", "Placeholder", "Placeholder"),
      type: getSelectKnob(
        "Type",
        ["email", "number", "password", "search", "tel", "text", "url"],
        "text"
      ),
    })
  );

export const TextStory = (props: Prop | undefined): string =>
  getInput({ type: "text", ...props });

export const SizeStory = (): string =>
  SizeStoryMaker(({ value, key }) =>
    getInput({ size: value, placeholder: `${capitalize(key)} input` })
  );

export const Previews = {
  Default: getPreview(getInput()),
  Text: (props: Prop | undefined): Preview =>
    getPreview(getInput({ type: "text", value: "Input value", ...props })),
};
