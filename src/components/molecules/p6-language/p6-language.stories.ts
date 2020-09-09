import { Components } from '../../../components';
import { ComponentProps, getElement, getForm, makeModeStory, makeStory, Props } from '../../../shared/storybook';
import { Mode } from '../../../shared/types';

const component = 'p6-language';

export default {
  title: 'Molecules/Language',
  component,
};

const componentProps: ComponentProps = ['name', 'value', 'excludes', 'mode', 'fullWidth', 'disabled', 'required', 'readOnly'];

const getStoryField = (props?: Props<Components.P6Language>): HTMLElement => getElement(component, [], { name: 'language', ...props });

export const Default = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  mode: Mode;
  fullWidth: boolean;
  value: string;
}>({
  componentProps,
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    mode: Mode.default,
    fullWidth: false,
    value: 'fr',
  },
  builder: (args): HTMLElement => getStoryField(args),
});

export const SelectedValue = makeStory<{
  value: string;
}>({
  componentProps,
  args: {
    value: 'fr',
  },
  builder: (args): HTMLElement => getStoryField(args),
});

export const Disabled = makeStory<{
  disabled: boolean;
}>({
  componentProps,
  args: {
    disabled: false,
  },
  builder: (args): HTMLElement => getStoryField(args),
});

export const Modes = makeModeStory({
  componentProps,
  builder: ({ value }) =>
    getStoryField({
      mode: value,
    }),
});

export const Form = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  value: string;
}>({
  componentProps,
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    value: 'fr',
  },
  builder: (props): HTMLElement => getForm(getStoryField({ name: 'field', ...props })),
});
