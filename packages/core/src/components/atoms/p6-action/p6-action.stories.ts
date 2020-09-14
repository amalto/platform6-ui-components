import { Components } from '../../../components';
import { ComponentProps, getElement, makeModeStory, makeSizeStory, makeStory, Props } from '../../../shared/storybook';
import { Mode, Size } from '../../../shared/types';

const component = 'p6-action';

export default {
  title: 'Atoms/Action',
  component,
};

const componentProps: ComponentProps = ['mode', 'waiting', 'disabled', 'size'];

const getStoryField = (props?: Props<Components.P6Action>): HTMLElement => {
  const size = props?.size !== undefined ? props.size : Size.normal;
  return getElement(
    component,
    getElement('p6-icon', [], {
      size,
      name: 'home',
    }),
    props,
  );
};

export const Default = makeStory<{
  size: Size;
  mode: Mode;
  disabled: boolean;
  waiting: boolean;
}>({
  componentProps,
  args: {
    size: Size.normal,
    mode: Mode.default,
    disabled: false,
    waiting: false,
  },
  builder: args => getStoryField(args),
});

export const Modes = makeModeStory({
  componentProps,
  builder: ({ value }) =>
    getStoryField({
      mode: value,
    }),
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

export const Sizes = makeSizeStory({
  componentProps,
  builder: ({ value }) =>
    getStoryField({
      size: value,
    }),
});
