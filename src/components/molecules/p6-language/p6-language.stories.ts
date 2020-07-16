/* eslint-disable import/no-extraneous-dependencies */
/* eslint-enable import/no-extraneous-dependencies */
import {
  getBooleanProp,
  getComponent,
  getDisabledProp,
  getForm,
  getPreview,
  getReadOnlyProp,
  getRequiredProp,
  getSizeProp,
  getTextProp,
  ModeStoryMaker,
  Preview,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getInput = (props?: Prop): string => {
  return getComponent("p6-language", "", { name: "language", ...props });
};

export const DefaultStory = (): string =>
  getForm(
    getInput({
      ...getDisabledProp(),
      ...getReadOnlyProp(),
      ...getRequiredProp(),
      ...getSizeProp(),
      ...getBooleanProp("fullWidth", "Full width"),
      ...getTextProp("value", "Value", "fr"),
    })
  );
DefaultStory.parameters = getPreview(getInput());

export const BaseStory = (props: Prop | undefined): string => getInput(props);
BaseStory.parameters = (props: Prop | undefined): Preview =>
  getPreview(getInput(props));

export const SizeStory = (): string =>
  SizeStoryMaker(({ value }) => getInput({ size: value }));
SizeStory.parameters = getPreview(getInput({ size: Size.small }));

export const ModeStory = (): string =>
  ModeStoryMaker(({ value }) => getInput({ mode: value }));
ModeStory.parameters = getPreview(getInput({ mode: Mode.success }));
