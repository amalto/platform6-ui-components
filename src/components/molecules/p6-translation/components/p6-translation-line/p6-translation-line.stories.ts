import { Components } from "../../../../../components";
import {
  getElement,
  getForm,
  makeStory,
  Props,
} from "../../../../../shared/storybook/stories";
import { Size } from "../../../../../shared/types";

const component = "p6-translation-line";

export default {
  title: "Molecules/Translation Line",
  component,
};

const getStoryField = (
  props?: Props<Components.P6TranslationLine>
): HTMLElement => {
  return getElement(component, [], props);
};

export const Default = makeStory<{
  lang: string;
  language: string;
  translation: string;
  readOnly: boolean;
  disabled: boolean;
  size: Size;
}>({
  args: {
    lang: "en",
    language: "en",
    translation: "English",
    readOnly: false,
    disabled: false,
    size: Size.normal,
  },
  builder: (args): HTMLElement => getStoryField(args),
});

export const Form = makeStory<{
  language: string;
  translation: string;
  readOnly: boolean;
  disabled: boolean;
}>({
  args: {
    language: "en",
    translation: "English",
    readOnly: false,
    disabled: false,
  },
  builder: (args): HTMLElement => getForm(getStoryField(args)),
});
