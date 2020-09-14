import { Components } from '../../../components';
import { ComponentProps, getElement, makeModeStory, makePositionStory, makeStory, Props } from '../../../shared/storybook';
import { Mode, Position } from '../../../shared/types';

const component = 'p6-help';

export default {
  title: 'Atoms/Help',
  component,
};

const componentProps: ComponentProps = ['text', 'position', 'mode'];

const getStoryField = (props?: Props<Components.P6Help>): HTMLElement => getElement(component, [], props);

export const Default = makeStory<{
  text: string;
  mode: Mode;
  position: Position;
}>({
  componentProps,
  args: {
    text: 'Tooltip',
    mode: Mode.default,
    position: Position.top,
  },
  builder: (args): HTMLElement => getStoryField(args),
});

// --- Mode
export const Modes = makeModeStory({
  componentProps,
  builder: ({ key, value }) =>
    getStoryField({
      text: key,
      mode: value,
    }),
});

// --- Position
export const Positions = makePositionStory({
  componentProps,
  builder: ({ key, value }) =>
    getStoryField({
      text: key,
      position: value,
    }),
});
