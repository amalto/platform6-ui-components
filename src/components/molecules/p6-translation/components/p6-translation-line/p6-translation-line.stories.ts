import { Components } from "../../../../../components";
import {
  ComponentProps,
  getElement,
  makeStory,
  Props,
} from "../../../../../shared/storybook";
import { Size } from "../../../../../shared/types";

const component = "p6-translation-line";

export default {
  title: "Molecules/Translation Line",
  component,
};

const componentProps: ComponentProps = [
  "name",
  "excludes",
  "language",
  "translation",
  "size",
  "readOnly",
  "disabled",
];

const getStoryField = (
  props?: Props<Components.P6TranslationLine>
): HTMLElement => {
  return getElement(component, [], { name: "field", ...props });
};

export const Default = makeStory<{
  lang: string;
  language: string;
  translation: string;
  readOnly: boolean;
  disabled: boolean;
  size: Size;
}>({
  componentProps,
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
