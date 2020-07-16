import {
  getBooleanProp,
  getComponent,
  getDisabledProp,
  getNumberProp,
  getPreview,
  getReadOnlyProp,
  getRequiredProp,
  getTextProp,
  Prop,
} from "../../../shared/storybook/stories";

const getTextarea = (props?: Prop): string => {
  return getComponent("p6-textarea", "", { ...props });
};

export const DefaultStory = (): string => {
  return getTextarea({
    ...getTextProp("placeholder", "Placeholder", ""),
    ...getNumberProp("min", "Min"),
    ...getNumberProp("max", "Max", 42),
    ...getNumberProp("rows", "Rows", 4),
    ...getNumberProp("cols", "Cols", 8),
    ...getDisabledProp(),
    ...getReadOnlyProp(),
    ...getRequiredProp(),
    ...getBooleanProp("waiting", "Waiting", false),
    ...getBooleanProp("resizable", "Resizable", false),
  });
};
DefaultStory.parameters = getPreview(DefaultStory());

export const TextStory = (): string => getTextarea();
TextStory.parameters = getPreview(TextStory());

export const ReadOnlyStory = (): string => getTextarea({ readOnly: true });
ReadOnlyStory.parameters = getPreview(ReadOnlyStory());

export const DisabledStory = (): string => getTextarea({ disabled: true });
DisabledStory.parameters = getPreview(DisabledStory());

export const WaitingStory = (): string => getTextarea({ waiting: true });
WaitingStory.parameters = getPreview(WaitingStory());
