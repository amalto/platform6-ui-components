import {
  getComponent,
  getForm,
  makeStory,
  Prop,
} from "../../../shared/storybook/stories";

const getStoryField = (props?: Prop): string =>
  getComponent("p6-textarea", "", { ...props });

export const DefaultStory = makeStory<{
  placeholder: string;
  min: number;
  max: number;
  rows: number;
  cols: number;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  waiting: boolean;
  resizable: boolean;
}>({
  args: {
    placeholder: "Placeholder",
    min: 0,
    max: 42,
    rows: 4,
    cols: 8,
    disabled: false,
    readOnly: false,
    required: false,
    waiting: false,
    resizable: false,
  },
  builder: (args): string => getStoryField(args),
});

export const FormStory = makeStory({
  builder: (): string => getForm(getStoryField()),
});

export const ReadOnlyStory = makeStory({
  builder: (): string => getStoryField({ readOnly: true }),
});

export const DisabledStory = makeStory({
  builder: (): string => getStoryField({ disabled: true }),
});

export const WaitingStory = makeStory({
  builder: (): string => getStoryField({ waiting: true }),
});
