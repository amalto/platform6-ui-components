import { Components } from '../../../components';
import { ComponentProps, getElement, getForm, makeModeStory, makeStory, Props } from '../../../shared/storybook';
import { Mode } from '../../../shared/types';

const component = 'p6-checkbox';

export default {
  title: 'Atoms/Checkbox',
  component,
};

const componentProps: ComponentProps = ['checked', 'disabled', 'mode', 'name', 'value'];

const getStoryField = (text: string, props?: Props<Components.P6Checkbox>): HTMLElement => {
  return getElement(component, text, props);
};

// Default
export const Default = makeStory<{
  text: string;
  mode: Mode;
  checked: boolean;
  disabled: boolean;
}>({
  componentProps,
  args: {
    text: 'Click me',
    mode: Mode.default,
    checked: false,
    disabled: false,
  },
  builder: ({ text, ...props }): HTMLElement => getStoryField(text, { ...props }),
});

export const Modes = makeModeStory({
  componentProps,
  builder: ({ key, value }) =>
    getStoryField(key, {
      mode: value,
      checked: true,
    }),
});

export const Disabled = makeStory<{ disabled: boolean }>({
  componentProps,
  args: { disabled: true },
  builder: (props): HTMLElement => getStoryField('Disabled', props),
});

export const Enabled = makeStory<{ disabled: boolean }>({
  componentProps,
  args: { disabled: false },
  builder: (props): HTMLElement => getStoryField('Enabled', props),
});

export const Form = makeStory<{
  disabled: boolean;
  checked: boolean;
}>({
  componentProps,
  args: {
    disabled: false,
    checked: true,
  },
  builder: (props): HTMLElement =>
    getForm([
      getStoryField('Option 1', {
        name: 'field[0]',
        value: 'yes',
        ...props,
      }),
      getStoryField('Option 2', {
        name: 'field[1]',
        value: 'no',
        ...props,
      }),
      getStoryField('Option 3', {
        name: 'field[2]',
        ...props,
      }),
    ]),
});
