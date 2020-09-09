import { Components } from '../../../components';
import { ComponentProps, getElement, getForm, makeStory, Props } from '../../../shared/storybook';

const component = 'p6-textarea';

export default {
  title: 'Atoms/Textarea',
  component,
};

const componentProps: ComponentProps = ['disabled', 'max', 'min', 'rows', 'cols', 'name', 'placeholder', 'readOnly', 'required', 'resizable', 'value', 'waiting'];

const getStoryField = (props?: Props<Components.P6Textarea>): HTMLElement => getElement(component, '', { ...props });

export const Default = makeStory<{
  placeholder: string;
  min: number;
  max: number;
  rows: number;
  cols: number;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  waiting: boolean;
  resizable: boolean;
  value: string;
}>({
  componentProps,
  args: {
    placeholder: 'Placeholder',
    min: 0,
    max: 42,
    rows: 4,
    cols: 8,
    disabled: false,
    readOnly: false,
    required: false,
    waiting: false,
    resizable: false,
    value: '',
  },
  builder: (args): HTMLElement => getStoryField(args),
});

export const ReadOnly = makeStory<{ readOnly: boolean }>({
  componentProps,
  args: { readOnly: true },
  builder: (props): HTMLElement => getStoryField(props),
});

export const Disabled = makeStory<{ disabled: boolean }>({
  componentProps,
  args: { disabled: true },
  builder: (props): HTMLElement => getStoryField(props),
});

export const Waiting = makeStory<{ waiting: boolean }>({
  componentProps,
  args: { waiting: true },
  builder: (props): HTMLElement => getStoryField(props),
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
    value: 'default value',
  },
  builder: (props): HTMLElement => getForm(getStoryField({ name: 'field', ...props })),
});
