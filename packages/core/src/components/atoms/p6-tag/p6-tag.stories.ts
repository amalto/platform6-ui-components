import { Components } from '../../../components';
import { ComponentProps, getElement, makeModeStory, makeStory, Props } from '../../../shared/storybook';
import { Mode } from '../../../shared/types';

const component = 'p6-tag';

export default {
  title: 'Atoms/Tag',
  component,
};

const componentProps: ComponentProps = ['mode'];

const getStoryField = (name: string, props?: Props<Components.P6Tag>): HTMLElement => getElement(component, name, props);

export const Default = makeStory<{
  mode: Mode;
  label: string;
}>({
  componentProps,
  args: {
    mode: Mode.default,
    label: 'Tag',
  },
  builder: ({ label, ...args }): HTMLElement => getStoryField(label, { ...args }),
});

export const Modes = makeModeStory({
  componentProps,
  builder: ({ key, value }) =>
    getStoryField(key, {
      mode: value,
    }),
});
