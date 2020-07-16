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

export const DefaultStory = (): string =>
  getHint(getTextKnob("Text", "hint"), {
    ...getModeProp(),
  });
DefaultStory.parameters = getPreview(DefaultStory());

export const ModeStory = (): string =>
  ModeStoryMaker(({ key, value }) => getHint(key, { mode: value }));
ModeStory.parameters = getPreview(getHint("hint", { mode: Mode.success }));
