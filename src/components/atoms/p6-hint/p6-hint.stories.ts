import { getTextKnob } from "../../../shared/storybook/knobs";
import {
  getComponent,
  getModeProp,
  getPreview,
  ModeStoryMaker,
  Prop,
} from "../../../shared/storybook/stories";
import { Mode } from "../../../shared/types";

const getHint = (text: string, props?: Prop): string => {
  return getComponent("p6-hint", text, props);
};

/*
type DefaultStoryArgs = {
  label: string;
  mode: Mode;
};
export const DefaultStory = ({ label, ...props }: DefaultStoryArgs): string =>
  getHint(label, { ...props });
DefaultStory.argTypes = {
  mode: { control: { type: "select", options: enumArrayToObject(modes) } },
};
DefaultStory.args = { label: "hint", mode: Mode.success } as DefaultStoryArgs;
DefaultStory.parameters = getPreview(DefaultStory(DefaultStory.args));
*/
export const DefaultStory = (): string =>
  getHint(getTextKnob("Hint text", "Hint message"), { ...getModeProp() });
DefaultStory.parameters = getPreview(DefaultStory());

export const ModeStory = (): string =>
  ModeStoryMaker(({ key, value }) => getHint(key, { mode: value }));
ModeStory.parameters = getPreview(getHint("hint", { mode: Mode.success }));
