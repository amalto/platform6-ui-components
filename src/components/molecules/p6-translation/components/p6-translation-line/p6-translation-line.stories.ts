import {
  getComponent,
  getForm,
  makeStory,
  Prop,
} from "../../../../../shared/storybook/stories";
import { Size } from "../../../../../shared/types";

const getStoryField = (props?: Prop): string => {
  return getComponent("p6-translation-line", "", props);
};

export const DefaultStory = makeStory<{
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
  builder: (args): string => getStoryField(args),
});

export const FormStory = makeStory<{
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
  builder: (args): string => getForm(getStoryField(args)),
});
