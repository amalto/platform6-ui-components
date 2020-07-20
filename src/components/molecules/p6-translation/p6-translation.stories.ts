import { getSelectKnob, getTextKnob } from "../../../shared/storybook/knobs";
import {
  getComponent,
  getDisabledProp,
  getForm,
  getModeProp,
  getPreview,
  getReadOnlyProp,
  getSizeProp,
  Prop,
} from "../../../shared/storybook/stories";
import { Size } from "../../../shared/types";

const getField = (description: string, props?: Prop): string => {
  const size = props?.size !== undefined ? props.size : Size.normal;
  return getComponent(
    "p6-translation",
    [getComponent("p6-icon", "", { size }), description],
    { ...props }
  );
};

export const DefaultStory = (): string => {
  return getForm(
    getField(getTextKnob("Field", "Description"), {
      lang: getSelectKnob("Language", ["en", "fr", "ru"], "en"),
      ...getSizeProp(),
      ...getModeProp(),
      ...getReadOnlyProp(),
      ...getDisabledProp(),
    })
  );
};
DefaultStory.parameters = getPreview(getField("Description"));
