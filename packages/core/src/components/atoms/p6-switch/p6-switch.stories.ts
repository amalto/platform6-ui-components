import { Components } from '../../../components';
import { ComponentProps, getElement, getForm, makeModeStory, makeStory, Props } from '../../../shared/storybook';
import { Mode } from '../../../shared/types';

const component = 'p6-switch';

export default {
  title: 'Atoms/Switch',
  component,
};

const componentProps: ComponentProps = ['checked', 'disabled', 'mode', 'name'];

const getStoryField = (label: string, props?: Props<Components.P6Switch>): HTMLElement => getElement(component, label, props);

export const Default = makeStory<{
  disabled: boolean;
  checked: boolean;
  mode: Mode;
  label: string;
}>({
  componentProps,
  args: {
    disabled: false,
    checked: false,
    mode: Mode.default,
    label: 'Switch label',
  },
  builder: ({ label, ...args }): HTMLElement => getStoryField(label, { ...args }),
});

export const Disabled = makeStory<{ disabled: boolean }>({
  componentProps,
  args: { disabled: true },
  builder: (props): HTMLElement => getStoryField('Label', props),
});

export const Modes = makeModeStory({
  componentProps,
  builder: ({ key, value }) =>
    getStoryField(key, {
      mode: value,
    }),
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
  builder: (props): HTMLElement => getForm(getStoryField('Switch label', { name: 'field', ...props })),
});
