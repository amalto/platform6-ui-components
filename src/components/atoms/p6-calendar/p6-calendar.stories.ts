import {
  getComponent,
  getSelectArgType,
  makeStory,
  Prop,
} from "../../../shared/storybook/stories";
import { Mode } from "../../../shared/types";

const getStoryField = (props?: Prop): string => {
  return getComponent("p6-calendar", "", props);
};

// Default
export const DefaultStory = makeStory<{
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  mode: Mode;
  type: string;
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
    ...getSelectArgType(
      "type",
      ["date", "datetime", "time"].map((type) => ({
        key: type,
        value: type,
      }))
    ),
  },
  builder: (props): string => getStoryField(props),
});
