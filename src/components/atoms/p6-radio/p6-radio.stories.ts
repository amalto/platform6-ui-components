import { Components } from '../../../components';
import { ComponentProps, getElement, getForm, makeStory, Props } from '../../../shared/storybook';

const component = 'p6-radio';

export default {
  title: 'Atoms/Radio',
  component,
};

const componentProps: ComponentProps = ['name', 'value', 'checked', 'disabled', 'readOnly'];

const getStoryField = (text: string, props?: Props<Components.P6Radio>): HTMLElement => getElement(component, text, props);

export const Default = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  name: string;
  value: string;
}>({
  componentProps,
  args: {
    disabled: false,
    readOnly: false,
    name: 'field',
    value: 'first',
  },
  builder: ({ value, ...args }): HTMLElement =>
    getElement(
      'p6-radio-group',
      ['first', 'second'].map(key =>
        getStoryField(key, {
          checked: value === key,
          value: key,
          ...args,
        }),
      ),
    ),
});

export const Readonly = makeStory<{ readOnly: boolean }>({
  componentProps,
  args: { readOnly: true },
  builder: (props): HTMLElement =>
    getStoryField('Read only', {
      name: 'readonly-example',
      checked: true,
      ...props,
    }),
});

export const Disabled = makeStory<{ disabled: boolean }>({
  componentProps,
  args: { disabled: true },
  builder: (props): HTMLElement =>
    getStoryField('Disabled', {
      name: 'disabled-example',
      checked: true,
      ...props,
    }),
});

export const Form = makeStory<{ disabled: boolean; readOnly: boolean }>({
  componentProps,
  args: {
    disabled: false,
    readOnly: false,
  },
  builder: (props): HTMLElement =>
    getForm(
      getElement(
        'p6-radio-group',
        ['first', 'second'].map((key, idx) =>
          getStoryField(key, {
            value: key,
            name: 'field',
            checked: idx === 0,
            ...props,
          }),
        ),
      ),
    ),
});
