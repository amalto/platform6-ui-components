import {
  getComponent,
  makeStory,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Size } from "../../../shared/types";

const getStoryField = (description: string, props?: Prop): string => {
  const size = props?.size !== undefined ? props.size : Size.normal;
  return getComponent(
    "p6-translation",
    [getComponent("p6-icon", "", { size }), description],
    { ...props }
  );
};

export const DefaultStory = makeStory<{
  disabled: boolean;
  readOnly: boolean;
  size: Size;
  label: string;
  lang: string;
}>({
  args: {
    disabled: false,
    readOnly: false,
    size: Size.normal,
    label: "Description",
    lang: "en",
  },
  builder: ({ label, ...args }): string => getStoryField(label, { ...args }),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        size: value,
      })
    ),
});
