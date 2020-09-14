import { Components } from '../../../components';
import { getElement, getForm, makeStory, Props } from '../../../shared/storybook';

const component = 'p6-field';

export default {
  title: 'Molecules/Field',
  component,
};

const getStoryField = (children: HTMLElement[], props?: Props<Components.P6Field>): HTMLElement => getElement(component, children, props);

const getFieldContent = (label: string, hint: string, prop?: Props<Components.P6Input>): HTMLElement[] => [
  getElement('p6-label', label, {
    slot: 'label',
  }),
  getElement('p6-hint', hint, {
    slot: 'hint',
  }),
  getElement('p6-input', '', {
    name: 'test',
    ...prop,
  }),
];

export const Default = makeStory<{
  label: string;
  hint: string;
}>({
  args: {
    label: 'Label',
    hint: 'hint message',
  },
  builder: ({ label, hint, ...args }): HTMLElement => getStoryField(getFieldContent(label, hint, { ...args })),
});

export const Form = makeStory<{
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  waiting: boolean;
  pattern: string;
}>({
  args: {
    required: false,
    readonly: false,
    disabled: false,
    waiting: false,
    pattern: '42',
  },
  builder: (args): HTMLElement => getForm(getStoryField(getFieldContent('Label', 'hint message', args))),
});
