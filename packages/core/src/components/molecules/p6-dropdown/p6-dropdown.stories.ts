import { getElement, makeStory } from '../../../shared/storybook';

const component = 'p6-dropdown';

export default {
  title: 'Molecules/Dropdown',
  component,
};

const getStoryField = (label: string, children: HTMLElement[]): HTMLElement => getElement(component, [getElement('span', label, { slot: 'label' }), ...children]);

export const Default = makeStory<{
  label: string;
}>({
  args: {
    label: 'Dropdown label',
  },
  builder: ({ label }): HTMLElement =>
    getStoryField(label, [
      getElement('p6-link', 'link 1 (with p6-link)', {
        href: '#',
        className: 'dropdown-item',
      }),
      getElement('a', 'link 2 (with HTML anchor)', {
        href: '#',
        className: 'dropdown-item',
      }),
      getElement('div', '<p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>'),
      getElement('hr', []),
      getElement('a', 'Link after a divider', {
        href: '#',
        className: 'dropdown-item',
      }),
    ]),
  preview: ({ label }): HTMLElement =>
    getStoryField(label, [
      getElement('a', 'link 1', { href: '#', className: 'dropdown-item' }),
      getElement('hr', []),
      getElement('a', 'Link 2', { href: '#', className: 'dropdown-item' }),
    ]),
});
