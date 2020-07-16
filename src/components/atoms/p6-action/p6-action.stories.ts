import { getSelectKnob } from "../../../shared/storybook/knobs";
import {
  getBooleanProp,
  getComponent,
  getDisabledProp,
  getForm,
  getModeProp,
  getSizeProp,
  getTextProp,
  MakerFn,
  makeStory,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const COMPONENT_NAME = "p6-action";

const getAction = (props?: Prop): string => {
  const size = props?.size !== undefined ? props.size : Size.normal;
  return getComponent(
    COMPONENT_NAME,
    getComponent("p6-icon", "", {
      size,
      name: "home",
      ...getTextProp("transform", "Transformation"),
    }),
    props
  );
};

const makeComponentStory = (conf: {
  items: string | MakerFn;
  prop?: Prop;
  previewProp?: Prop;
}): (() => string) => {
  return makeStory({
    componentName: COMPONENT_NAME,
    preview: getComponent(COMPONENT_NAME, "Action", conf.previewProp),
    ...conf,
  });
};

export const DefaultStory = makeComponentStory({
  items: getForm(
    getAction({
      type: getSelectKnob(
        "Action Type",
        ["submit", "reset", "button"],
        "button"
      ),
      ...getBooleanProp("waiting", "Waiting", false),
      ...getDisabledProp(),
      ...getModeProp(),
      ...getSizeProp(),
    }),
    false
  ),
});

const modeStoryFn = (props: Prop): string =>
  ModeStoryMaker(({ value }) => getAction({ mode: value, ...props }));

export const ModeStory = makeComponentStory({
  items: modeStoryFn,
  previewProp: { mode: Mode[Mode.success] },
});

export const DisabledStory = makeComponentStory({
  items: (props) => modeStoryFn(props),
  prop: { disabled: true },
  previewProp: { mode: Mode[Mode.success] },
});

export const WaitingStory = makeComponentStory({
  items: (props) => modeStoryFn(props),
  prop: { waiting: true },
  previewProp: { mode: Mode[Mode.success] },
});

export const SizeStory = makeComponentStory({
  items: (props) =>
    SizeStoryMaker(({ value }) => getAction({ size: value, ...props })),
  previewProp: { mode: Size[Size.small] },
});
