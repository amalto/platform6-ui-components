/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit-html';
/* eslint-enable import/no-extraneous-dependencies */
import { Components } from '../../../components';
import { ComponentProps, getElement, makeStory, Props } from '../../../shared/storybook';

const component = 'p6-link';

export default {
  title: 'Atoms/Link',
  component,
};

const componentProps: ComponentProps = ['href', 'rel', 'target', 'transform'];

const getStoryField = (text: string, props?: Props<Components.P6Link>): HTMLElement => getElement(component, text, props);

export const Default = makeStory<{ text: string; href: string }>({
  componentProps,
  args: {
    text: 'link',
    href: '',
  },
  builder: ({ text, ...args }): HTMLElement => {
    return getStoryField(text, args);
  },
});

export const WithHref = makeStory<{ text: string }>({
  componentProps,
  args: {
    text: 'Link',
  },
  builder: ({ text, ...args }): TemplateResult => html`a ${getStoryField(text, args)} with a href`,
});
