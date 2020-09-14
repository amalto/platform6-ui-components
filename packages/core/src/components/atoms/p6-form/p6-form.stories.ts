import { Components } from '../../../components';
import { ComponentProps, getElement, getFormButtons, makeStory, Props } from '../../../shared/storybook';

const component = 'p6-form';

export default {
  title: 'Atoms/Form',
  component,
};

const componentProps: ComponentProps = ['name'];

const getStoryField = (children: HTMLElement[], props?: Props<Components.P6Checkbox>): HTMLElement => {
  return getElement(component, children, props);
};

export const Default = makeStory<{ name: string }>({
  componentProps,
  args: {
    name: 'form',
  },
  builder: (props): HTMLElement =>
    getStoryField(
      [
        getElement('p6-field', [getElement('p6-label', 'custom inputs', { slot: 'label' }), getElement('p6-input', [], { name: 'c-input', required: true })]),
        getElement('p6-field', [
          getElement('p6-label', 'native input', {
            slot: 'label',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style: 'margin-right: 5px;' as any,
          }),
          getElement('input', [], { name: 'n-input', required: true }),
        ]),
        getFormButtons(),
      ],
      props,
    ),
});
