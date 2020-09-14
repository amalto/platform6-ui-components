import { Components } from '../../../components';
import { ComponentProps, getElement, getSelectArgType, makeModeStory, makeSizeStory, makeStory, Props, StringSelectArgType } from '../../../shared/storybook';
import { Mode, Size } from '../../../shared/types';
import { P6ButtonType } from './p6-button';

const component = 'p6-button';

export default {
  title: 'Atoms/Button',
  component,
};

const componentProps: ComponentProps = ['mode', 'outlined', 'waiting', 'size', 'type', 'disabled'];

const getStoryField = (text: string | HTMLElement[], props?: Props<Components.P6Button>): HTMLElement => {
  return getElement(component, text, props);
};

export const Default = makeStory<{
  text: string;
  size: Size;
  mode: Mode;
  disabled: boolean;
  outlined: boolean;
  waiting: boolean;
  type: P6ButtonType;
}>({
  componentProps,
  args: {
    text: 'My button',
    type: 'button',
    size: Size.normal,
    mode: Mode.default,
    disabled: false,
    outlined: false,
    waiting: false,
  },
  argTypes: {
    ...getSelectArgType<StringSelectArgType>(
      'type',
      ['submit', 'reset', 'button'].map(type => ({ key: type, value: type })),
    ),
  },
  builder: ({ text, ...args }) => getStoryField(text, { ...args }),
});

export const Sizes = makeSizeStory({
  componentProps,
  builder: ({ key, value }) =>
    getStoryField(key, {
      size: value,
    }),
});

export const Modes = makeModeStory({
  componentProps,
  builder: ({ key, value }) =>
    getStoryField(key, {
      mode: value,
    }),
});

export const Icon = makeStory({
  componentProps,
  builder: (): HTMLElement =>
    getElement('div', [
      getStoryField(
        [getElement('p6-icon', [], { name: 'home', size: Size.small }), getElement('span', '')],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { size: Size.small, style: 'margin-right: 5px;' as any },
      ),
      getStoryField([
        getElement('p6-icon', [], {
          name: 'home',
          style: 'margin-right: 5px;',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
        getElement('span', 'Home'),
      ]),
    ]),
});

export const Waiting = makeStory<{ waiting: boolean }>({
  componentProps,
  args: {
    waiting: true,
  },
  builder: (props): HTMLElement => getStoryField('Waiting', props),
});

export const Disabled = makeStory<{ disabled: boolean }>({
  componentProps,
  args: {
    disabled: true,
  },
  builder: (props): HTMLElement => getStoryField('Disabled', props),
});

export const Outlined = makeStory<{ outlined: boolean }>({
  componentProps,
  args: {
    outlined: true,
  },
  builder: (props): HTMLElement => getStoryField('Outlined', props),
});
