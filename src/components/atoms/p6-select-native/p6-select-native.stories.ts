import { Components } from '../../../components';
import { ComponentProps, getElement, getForm, makeModeStory, makeStory, Props } from '../../../shared/storybook';
import { Mode } from '../../../shared/types';

const component = 'p6-select-native';

export default {
  title: 'Atoms/Select native',
  component,
};

const componentProps: ComponentProps = ['name', 'multiple', 'mode', 'fullWidth', 'disabled', 'required', 'readOnly'];

const getStoryField = (options: HTMLElement[], props?: Props<Components.P6SelectNative>): HTMLElement =>
  getElement(component, options, {
    name: 'language',
    ...props,
  });

const getOption = (value: string, display: string, props?: Props<HTMLOptionElement>): HTMLElement => {
  return getElement('option', display, {
    value,
    ...props,
  });
};

export const Default = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  fullWidth: boolean;
  multiple: boolean;
  mode: Mode;
}>({
  componentProps,
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    fullWidth: false,
    multiple: false,
    mode: Mode.default,
  },
  builder: (args): HTMLElement =>
    getStoryField([getOption('', 'Select language'), getElement('optgroup', [getOption('fr', 'Français'), getOption('en', 'English')], { label: 'Europe' })], args),
});

export const Selected = makeStory({
  componentProps,
  builder: (): HTMLElement => getStoryField([getOption('', 'Placeholder'), getOption('value', 'Selected value', { selected: true })]),
});

export const Disabled = makeStory<{ disabled: boolean }>({
  componentProps,
  args: { disabled: true },
  builder: (props): HTMLElement => getStoryField([getOption('', 'Placeholder'), getOption('value', 'Display')], props),
});

export const Modes = makeModeStory({
  componentProps,
  builder: ({ key, value }) =>
    getStoryField([getOption('', 'Placeholder'), getOption('value', key)], {
      mode: value,
    }),
});

export const Form = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  multiple: boolean;
}>({
  componentProps,
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    multiple: false,
  },
  builder: (props): HTMLElement =>
    getForm(
      getStoryField(
        [getOption('', 'Select language'), getElement('optgroup', [getOption('fr', 'Français'), getOption('en', 'English', { selected: true })], { label: 'Europe' })],
        { name: 'field', ...props },
      ),
    ),
});
