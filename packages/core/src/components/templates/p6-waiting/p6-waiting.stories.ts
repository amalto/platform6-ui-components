import { Components } from '../../../components';
import { getElement, makeStory, Props } from '../../../shared/storybook';

const component = 'p6-waiting';

export default {
  title: 'Templates/Waiting',
  component,
};

const getStoryField = (child: string | HTMLElement | HTMLElement[], props?: Props<Components.P6Waiting>): HTMLElement => {
  return getElement(component, child, props);
};

// Default
export const Default = makeStory({
  builder: (): HTMLElement => getStoryField([]),
});

// Centered
export const Centered = makeStory({
  builder: (): HTMLElement =>
    getStoryField([], {
      style: { height: '280px' } as CSSStyleDeclaration,
    }),
});

// Message
export const Message = makeStory<{
  text: string;
}>({
  args: {
    text: 'Loading data...',
  },
  builder: ({ text }): HTMLElement => getStoryField(text),
});

// Message
export const RichMessage = makeStory<{
  text: string;
  link: string;
}>({
  args: {
    text: 'Loading data...',
    link: 'Cancel',
  },
  builder: ({ text, link }): HTMLElement => getStoryField([getElement('span', text), getElement('p6-link', link)]),
});
