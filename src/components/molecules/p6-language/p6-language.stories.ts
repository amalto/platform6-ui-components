import {
  getComponent,
  makeStory,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getStoryField = (props?: Prop): string =>
  getComponent("p6-language", "", { name: "language", ...props });

export const DefaultStory = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  size: Size;
  mode: Mode;
  fullWidth: boolean;
  value: string;
}>({
  args: {
    disabled: false,
    readOnly: false,
    required: false,
    size: Size.normal,
    mode: Mode.default,
    fullWidth: false,
    value: "fr",
  },
  builder: (args): string => getStoryField(args),
});

export const SelectedValueStory = makeStory<{
  value: string;
}>({
  args: {
    value: "fr",
  },
  builder: (args): string => getStoryField(args),
});

export const DisabledStory = makeStory<{
  disabled: boolean;
}>({
  args: {
    disabled: false,
  },
  builder: (args): string => getStoryField(args),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ value }) =>
      getStoryField({
        size: value,
      })
    ),
});

export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ value }) =>
      getStoryField({
        mode: value,
      })
    ),
});
