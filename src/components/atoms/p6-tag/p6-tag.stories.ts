import { getTextKnob } from "../../../shared/storybook/knobs";
import {
  getComponent,
  getModeProp,
  getPreview,
  getSizeProp,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getTag = (name: string, props?: Prop): string => {
  return getComponent("p6-tag", name, { name, ...props });
};

export const DefaultStory = (): string => {
  return getTag(getTextKnob("Name", "Tag"), {
    ...getSizeProp(),
    ...getModeProp(),
  });
};
DefaultStory.parameters = getPreview(getTag("Name"));

export const SizeStory = (): string =>
  SizeStoryMaker(({ key, value }) => getTag(key, { size: value }));
SizeStory.parameters = getPreview(getTag("Name", { size: Size.small }));

export const ModeStory = (): string =>
  ModeStoryMaker(({ key, value }) => getTag(key, { mode: value }));
ModeStory.parameters = getPreview(getTag("Name", { mode: Mode.success }));
