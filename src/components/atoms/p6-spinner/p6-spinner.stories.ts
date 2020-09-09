import { Components } from '../../../components';
import { getElement, makeStory, Props } from '../../../shared/storybook';

const component = 'p6-spinner';

export default {
  title: 'Atoms/Spinner',
  component,
};

const getStoryField = (props?: Props<Components.P6Spinner>): HTMLElement => {
  return getElement(component, [], props);
};

export const Default = makeStory({
  builder: (): HTMLElement =>
    getStoryField({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style: 'width: 4.2rem; height: 4.2rem;' as any,
    }),
});

export const SmallContainer = makeStory({
  builder: (): HTMLElement =>
    getStoryField({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style: 'width: 1rem; height: 1rem;' as any,
    }),
});

export const VerticalContainer = makeStory({
  builder: (): HTMLElement =>
    getStoryField({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style: 'width: 10.5rem;height: 21rem; background: #eee;' as any,
    }),
});

export const HorizontalContainer = makeStory({
  builder: (): HTMLElement =>
    getStoryField({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style: 'width: 21rem;height: 10.5rem; background: #eee;' as any,
    }),
});
