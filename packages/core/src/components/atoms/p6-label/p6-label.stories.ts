import { Components } from '../../../components';
import { getElement, makeStory, Props } from '../../../shared/storybook';

const component = 'p6-label';

export default {
  title: 'Atoms/Label',
  component,
};

const getStoryField = (text: string, props?: Props<Components.P6Label>): HTMLElement => getElement(component, text, props);

export const Default = makeStory<{
  text: string;
}>({
  args: {
    text: 'Label',
  },
  builder: ({ text }): HTMLElement => getStoryField(text),
});
