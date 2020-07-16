import { getTextKnob } from "../../../shared/storybook/knobs";
import {
  getBooleanProp,
  getComponent,
  getDisabledProp,
  getForm,
  getModeProp,
  getSizeProp,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";

const getCheckbox = (text: string, props?: Prop): string => {
  return getComponent("p6-checkbox", text, props);
};

export const DefaultStory = (): string =>
  getForm(
    getCheckbox(getTextKnob("Text", "Click me"), {
      name: "field",
      ...getBooleanProp("checked", "Checked", true),
      ...getDisabledProp(),
      ...getModeProp(),
      ...getSizeProp(),
    })
  );

export const SizeStory = (props: Prop | undefined): string =>
  SizeStoryMaker(({ key, value }) =>
    getCheckbox(key, { size: value, ...props })
  );

export const ModeStory = (props: Prop | undefined): string =>
  ModeStoryMaker(({ key, value }) =>
    getCheckbox(key, { mode: value, ...props })
  );

export const SingleStory = (text: string, props: Prop | undefined): string =>
  getCheckbox(text, { ...props });
