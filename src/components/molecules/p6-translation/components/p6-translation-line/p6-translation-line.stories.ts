import { Components } from '../../../../../components';
import { ComponentProps, getElement, makeStory, Props } from '../../../../../shared/storybook';

const component = 'p6-translation-line';

export default {
  title: 'Molecules/Translation Line',
  component,
};

const componentProps: ComponentProps = ['name', 'excludes', 'language', 'translation', 'readOnly', 'disabled'];

const getStoryField = (props?: Props<Components.P6TranslationLine>): HTMLElement => {
  return getElement(component, [], { name: 'field', ...props });
};

export const Default = makeStory<{
  lang: string;
  language: string;
  translation: string;
  readOnly: boolean;
  disabled: boolean;
}>({
  componentProps,
  args: {
    lang: 'en',
    language: 'en',
    translation: 'English',
    readOnly: false,
    disabled: false,
  },
  builder: (args): HTMLElement => getStoryField(args),
});
