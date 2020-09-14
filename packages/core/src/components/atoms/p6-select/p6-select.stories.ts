import { Components } from '../../../components';
import { ComponentProps, getElement, getForm, makeStory, Props } from '../../../shared/storybook';
import { Mode } from '../../../shared/types';

const component = 'p6-select';

export default {
  title: 'Atoms/Select',
  component,
};

const componentProps: ComponentProps = ['name', 'multiple', 'disabled', 'required', 'readOnly', 'placeholder', 'shouldSort', 'disableSearch'];

const getStoryField = (options: HTMLElement[], props?: Props<Components.P6Select>): HTMLElement =>
  getElement(component, options, {
    name: 'language',
    ...props,
  });

const getOption = (value: string, display: string, props?: Props<HTMLOptionElement>): HTMLElement => {
  return getElement('option', display, { value, ...props });
};

export const Default = makeStory<{
  lang: string;
  disabled: boolean;
  multiple: boolean;
  disableSearch: boolean;
  shouldSort: boolean;
  required: boolean;
  readOnly: boolean;
  placeholder: string;
  mode: Mode;
}>({
  componentProps,
  args: {
    lang: 'en',
    disabled: false,
    multiple: false,
    disableSearch: false,
    shouldSort: true,
    required: false,
    readOnly: false,
    placeholder: 'This is a placeholder',
    mode: Mode.default,
  },
  builder: (args): HTMLElement =>
    getStoryField([getOption('no', 'Not selected'), getOption('yes', 'Selected', { selected: true }), getOption('never', 'Disabled', { disabled: true })], args),
});

export const Selected = makeStory({
  componentProps,
  builder: (): HTMLElement => getStoryField([getOption('no', 'Unselected value'), getOption('yes', 'Selected value', { selected: true })]),
});

export const MultipleSelected = makeStory({
  componentProps,
  builder: (): HTMLElement =>
    getStoryField([getOption('one', 'One', { selected: true }), getOption('two', 'Two', { selected: true }), getOption('three', 'Three')], { multiple: true }),
});

export const Disabled = makeStory<{ disabled: boolean }>({
  componentProps,
  args: { disabled: true },
  builder: (props): HTMLElement => getStoryField([getOption('value', 'Display')], props),
});

export const CustomPlaceholder = makeStory<{ placeholder: string }>({
  componentProps,
  args: {
    placeholder: 'Custom placeholder',
  },
  builder: ({ placeholder }): HTMLElement => getStoryField([getOption('value', 'Display')], { placeholder }),
});

export const Placeholder = makeStory({
  componentProps,
  builder: (): HTMLElement => getStoryField([getOption('', 'This is the placeholder'), getOption('one', 'One'), getOption('two', 'Two'), getOption('three', 'Three')]),
});

export const WithoutSearch = makeStory<{ disableSearch: boolean }>({
  componentProps,
  args: {
    disableSearch: true,
  },
  builder: (props): HTMLElement => getStoryField([getOption('one', 'One'), getOption('two', 'Two'), getOption('three', 'Three')], props),
});

export const Language = makeStory<{ lang: string }>({
  componentProps,
  args: {
    lang: 'en',
  },
  builder: (props): HTMLElement => getStoryField([getOption('one', 'One'), getOption('two', 'Two'), getOption('three', 'Three')], props),
});

export const Form = makeStory<{
  disabled: boolean;
  multiple: boolean;
  required: boolean;
  readOnly: boolean;
}>({
  componentProps,
  args: {
    disabled: false,
    multiple: false,
    required: false,
    readOnly: false,
  },
  builder: (props): HTMLElement =>
    getForm(
      getStoryField(
        [getOption('', 'Select language'), getElement('optgroup', [getOption('fr', 'Français'), getOption('en', 'English', { selected: true })], { label: 'Europe' })],
        { name: 'field', ...props },
      ),
    ),
});
