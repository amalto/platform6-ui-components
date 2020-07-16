import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAccessibleIcon,
  faAutoprefixer,
  faFontAwesome,
  faGit,
  faHtml5,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCat,
  faCheckSquare,
  faHome,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { getSelectKnob } from "../../../shared/storybook/knobs";
import {
  getComponent,
  getSizeProp,
  getTextProp,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";

const iconsMap = new Map([
  [
    "fab",
    ["accessible-icon", "autoprefixer", "font-awesome", "git", "html5", "cat"],
  ],
  ["fas", ["home", "info-circle", "check-square", "times"]],
]);

library.add(
  // fab
  faAccessibleIcon,
  faAutoprefixer,
  faFontAwesome,
  faGit,
  faHtml5,
  faCat,
  // Fas
  faInfoCircle,
  faCheckSquare,
  faHome,
  faTimes
);

const getIcon = (name: string, props?: Prop): string => {
  return getComponent("p6-icon", name, { name, ...props });
};

export const DefaultStory = (prefix: string): string => {
  const icons = iconsMap.get(prefix) || [];
  return getIcon(getSelectKnob("Name", icons, icons[0]), {
    iconPrefix: prefix,
    ...getTextProp("transform", "Transformation"),
    ...getSizeProp(),
  });
};

export const SizeStory = (): string =>
  SizeStoryMaker(({ value }) => getIcon("home", { size: value }));

export const IconStory = (name: string, props: Prop | undefined): string =>
  getIcon(name, props);
