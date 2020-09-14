import { Components } from '../../../components';
import { getElement, makeStory, Props } from '../../../shared/storybook';

const component = 'p6-container';

export default {
  title: 'Templates/Container',
  component,
};

const getStoryField = (child: string, props?: Props<Components.P6Container>): HTMLElement => {
  return getElement(component, child, props);
};

export const Default = makeStory<{
  text: string;
}>({
  args: {
    text: 'Container example',
  },
  builder: ({ text }) => getStoryField(text),
});
