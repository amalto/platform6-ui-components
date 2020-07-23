import { Components } from "../../../components";
import {
  getElement,
  getSelectArgType,
  makeStory,
  Props,
  StringSelectArgType,
} from "../../../shared/storybook/stories";
import { Mode } from "../../../shared/types";
import { P6CalendarType } from "./p6-calendar";

const component = "p6-calendar";

export default {
  title: "Atoms/Button",
  component,
};

const getStoryField = (props?: Props<Components.P6Calendar>): HTMLElement => {
  return getElement(component, "", props);
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
  args: {
    required: false,
    readOnly: false,
    disabled: false,
    mode: Mode.default,
    type: "date",
    lang: "en",
    isRange: false,
    startDate: "",
    endDate: "",
    minDate: "",
    maxDate: "",
    minuteSteps: 5,
    labelFrom: "",
    labelTo: "",
  },
  argTypes: {
    ...getSelectArgType<StringSelectArgType>(
      "type",
      ["date", "datetime", "time"].map((type) => ({
        key: type,
        value: type,
      }))
    ),
  },
  builder: (props): HTMLElement => getStoryField(props),
});
