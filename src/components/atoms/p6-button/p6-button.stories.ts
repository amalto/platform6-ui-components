import { getSelectKnob, getTextKnob } from "../../../shared/storybook/knobs";
import {
  getComponent,
  getDisabledProp,
  getForm,
  getModeProp,
  getPreview,
  getSizeProp,
  ModeStoryMaker,
  Preview,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getButton = (text: string, props?: Prop): string => {
  return getComponent("p6-button", text, props);
};

export const DefaultStory = (): string =>
  getForm(
    getButton(getTextKnob("Text", "My button"), {
      type: getSelectKnob(
        "Button Type",
        ["submit", "reset", "button"],
        "button"
      ),
      ...getDisabledProp(),
      ...getModeProp(),
      ...getSizeProp(),
    }),
    false
  );
DefaultStory.parameters = getPreview(getButton("Example"));

export const SizeStory = (): string =>
  SizeStoryMaker(({ key, value }) => getButton(key, { size: value }));
SizeStory.parameters = getPreview(getButton("Example", { size: Size.small }));

export const ModeStory = (props: Prop | undefined): string =>
  ModeStoryMaker(({ key, value }) => getButton(key, { mode: value, ...props }));
ModeStory.parameters = (props: Prop | undefined): Preview =>
  getPreview(getButton("Example", { mode: Mode.success, ...props }));

export const IconStory = (): string =>
  ["", "Home"]
    .map((text) =>
      getButton(
        `${getComponent("p6-icon", "", { name: "home" })}<span>${text}</span>`
      )
    )
    .join("");
IconStory.parameters = getPreview(
  getButton(
    `${getComponent("p6-icon", "", { name: "home" })}<span>Example</span>`
  )
);
