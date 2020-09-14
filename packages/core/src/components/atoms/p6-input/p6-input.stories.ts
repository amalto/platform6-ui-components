import { Components } from '../../../components';
import { ComponentProps, getElement, getForm, getSelectArgType, makeStory, Props } from '../../../shared/storybook';
import { enumToArray } from '../../../utils/enum';
import { P6InputType } from './types';

const component = 'p6-input';

export default {
  title: 'Atoms/Input',
  component,
};

const componentProps: ComponentProps = ['disabled', 'max', 'min', 'name', 'pattern', 'placeholder', 'readOnly', 'required', 'type', 'value', 'waiting'];

const getStoryField = (props?: Props<Components.P6Input>): HTMLElement => getElement(component, [], props);

export const Default = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  waiting: boolean;
  min: number;
  max: number;
  pattern: string;
  placeholder: string;
  type: P6InputType;
  value: string;
}>({
  componentProps,
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    waiting: false,
    min: 0,
    max: 42,
    pattern: '',
    placeholder: 'Placeholder',
    type: P6InputType.text,
    value: '',
  },
  argTypes: {
    ...getSelectArgType('type', enumToArray(P6InputType)),
  },
  builder: (args): HTMLElement => getStoryField(args),
});

export const Text = makeStory({
  componentProps,
  builder: (): HTMLElement => getStoryField({ type: P6InputType.text }),
});

export const Readonly = makeStory<{ readOnly: boolean }>({
  componentProps,
  args: { readOnly: true },
  builder: (props): HTMLElement => getStoryField({ placeholder: 'Read only', ...props }),
});

export const Disabled = makeStory<{ disabled: boolean }>({
  componentProps,
  args: { disabled: true },
  builder: (props): HTMLElement => getStoryField({ placeholder: 'Disabled', ...props }),
});

export const Waiting = makeStory<{ waiting: boolean }>({
  componentProps,
  args: { waiting: true },
  builder: (props): HTMLElement => getStoryField({ placeholder: 'Waiting', ...props }),
});

export const OnError = makeStory({
  componentProps,
  builder: (): HTMLElement => getStoryField({ pattern: '42', value: '84' }),
});

export const Form = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  type: P6InputType;
  value: string;
}>({
  componentProps,
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    type: P6InputType.text,
    value: 'default value',
  },
  argTypes: {
    ...getSelectArgType('type', enumToArray(P6InputType)),
  },
  builder: (props): HTMLElement => getForm(getStoryField({ name: 'field', ...props })),
});
