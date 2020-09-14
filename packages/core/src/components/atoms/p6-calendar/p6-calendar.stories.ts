import { Components } from '../../../components';
import { ComponentProps, getElement, getForm, getSelectArgType, makeStory, Props, StringSelectArgType } from '../../../shared/storybook';
import { Mode } from '../../../shared/types';
import { P6CalendarType } from './p6-calendar';

const component = 'p6-calendar';

export default {
  title: 'Atoms/Calendar',
  component,
};

const componentProps: ComponentProps = [
  'name',
  'type',
  'required',
  'disabled',
  'color',
  'readOnly',
  'isRange',
  'startDate',
  'endDate',
  'minDate',
  'maxDate',
  'minuteSteps',
  'labelFrom',
  'labelTo',
];

const getStoryField = (props?: Props<Components.P6Calendar>): HTMLElement => {
  return getElement(component, '', props);
};

// Default
export const Default = makeStory<{
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  mode: Mode;
  type: P6CalendarType;
  lang: string;
  isRange: boolean;
  startDate: string;
  endDate: string;
  minDate: string;
  maxDate: string;
  minuteSteps: number;
  labelFrom: string;
  labelTo: string;
}>({
  componentProps,
  args: {
    required: false,
    readOnly: false,
    disabled: false,
    mode: Mode.default,
    type: 'date',
    lang: 'en',
    isRange: false,
    startDate: '',
    endDate: '',
    minDate: '',
    maxDate: '',
    minuteSteps: 5,
    labelFrom: '',
    labelTo: '',
  },
  argTypes: {
    ...getSelectArgType<StringSelectArgType>(
      'type',
      ['date', 'datetime', 'time'].map(type => ({
        key: type,
        value: type,
      })),
    ),
  },
  builder: (props): HTMLElement => getStoryField(props),
});

export const Form = makeStory<{
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  mode: Mode;
  type: P6CalendarType;
}>({
  componentProps,
  args: {
    required: false,
    readOnly: false,
    disabled: false,
    mode: Mode.default,
    type: 'date',
  },
  argTypes: {
    ...getSelectArgType<StringSelectArgType>(
      'type',
      ['date', 'datetime', 'time'].map(type => ({
        key: type,
        value: type,
      })),
    ),
  },
  builder: (props): HTMLElement => getForm(getStoryField(props)),
});
