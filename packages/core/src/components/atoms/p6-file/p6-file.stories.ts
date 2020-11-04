import { Components } from '../../../components';
import { isCustomEvent } from '../../../shared/form/event';
import { ComponentProps, getElement, getForm, makeModeStory, makeStory, Props } from '../../../shared/storybook';
import { Mode } from '../../../shared/types';

const component = 'p6-file';

export default {
  title: 'Atoms/File',
  component,
};

const componentProps: ComponentProps = ['name', 'placeholder', 'required', 'value'];

const getStoryField = (props?: Props<Components.P6File>): HTMLElement => {
  const elmt = getElement(component, [], props);
  elmt.addEventListener('p6Change', (e: Event): void => {
    if (!isCustomEvent(e)) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log(
      `%c Platform 6 %c ${String.fromCodePoint(0x1f4e1)} %c p6Change :: detail `,
      'background:#61a653; color:white',
      'background:transparent; color:black',
      'background:black; color:cyan',
      e.detail,
    );
  });

  return elmt;
};

export const Default = makeStory<{
  required: boolean;
  placeholder: string;
  value: string;
}>({
  componentProps,
  args: {
    required: false,
    placeholder: 'Placeholder',
    value: '',
  },
  argTypes: {},
  builder: (args): HTMLElement => getStoryField(args),
});

export const Disabled = makeStory<{ disabled: boolean }>({
  componentProps,
  args: { disabled: true },
  builder: (props): HTMLElement => getStoryField({ placeholder: 'Disabled', ...props }),
});

export const Modes = makeModeStory({
  componentProps,
  builder: ({ key, value }) =>
    getStoryField({
      mode: value,
      placeholder: `Mode : ${key}`,
    }),
});

export const Outlined = makeStory<{ outlined: boolean; mode: Mode }>({
  componentProps,
  args: {
    outlined: true,
    mode: Mode.primary,
  },
  builder: (props): HTMLElement => getStoryField({ placeholder: 'Outlined', ...props }),
});

export const Form = makeStory<{
  disabled: boolean;
  required: boolean;
  value: string;
}>({
  componentProps,
  args: {
    disabled: false,
    required: false,
    value: 'default value',
  },
  argTypes: {},
  builder: (props): HTMLElement => getForm(getStoryField({ placeholder: 'Choose a file ...', name: 'field', ...props })),
});
