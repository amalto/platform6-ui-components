import {
  getComponent,
  getModeProp,
  getPositionProp,
  getTextProp,
  Prop,
} from "../../../shared/storybook/stories";

const getHelp = (props?: Prop): string => {
  return getComponent("p6-help", "", props);
};

export const DefaultStory = (): string =>
  getHelp({
    ...getTextProp("text", "Tooltip", "This is a tooltip"),
    ...getModeProp(),
    ...getPositionProp(),
  });
