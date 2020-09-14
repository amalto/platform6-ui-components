import { Components } from '../../../components';
import { ComponentProps, getElement, getForm, makeStory, Props } from '../../../shared/storybook';
import { Size } from '../../../shared/types';

const component = 'p6-translation';

export default {
  title: 'Molecules/Translation',
  component,
};

const componentProps: ComponentProps = ['name', 'value', 'readOnly', 'disabled'];

const getStoryField = (description: string, props?: Props<Components.P6Translation>): HTMLElement => {
  return getElement(
    component,
    [
      getElement('p6-icon', [], {
        size: Size.small,
        name: 'home',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style: 'margin-right: 0.175rem;' as any,
      }),
      getElement('span', description),
    ],
    { ...props },
  );
};

export const Default = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  label: string;
  lang: string;
}>({
  componentProps,
  args: {
    disabled: false,
    readOnly: false,
    label: 'Description',
    lang: 'en',
  },
  builder: ({ label, ...args }): HTMLElement => getStoryField(label, { ...args }),
});

export const Form = makeStory<{
  disabled: boolean;
  readOnly: boolean;
}>({
  componentProps,
  args: {
    disabled: false,
    readOnly: false,
  },
  builder: (props): HTMLElement =>
    getForm(
      getStoryField('Label', {
        name: 'field',
        value: { en: 'English', fr: 'Français' },
        ...props,
      }),
    ),
});
