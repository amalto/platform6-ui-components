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
import {
  getSelectArgType,
  makeStory,
} from "../../../shared/storybook/makeStory";
import {
  getComponent,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Size } from "../../../shared/types";

const iconsMap = new Map([
  ["fab", ["accessible-icon", "autoprefixer", "font-awesome", "git", "html5"]],
  ["fas", ["home", "info-circle", "check-square", "times", "cat"]],
]);

library.add(
  // fab
  faAccessibleIcon,
  faAutoprefixer,
  faFontAwesome,
  faGit,
  faHtml5,
  // Fas
  faInfoCircle,
  faCheckSquare,
  faHome,
  faTimes,
  faCat
);

const getIcon = (name: string, props?: Prop): string => {
  return getComponent("p6-icon", name, { name, ...props });
};

const makeLibStory = (iconPrefix: string, defaultIcon: string) => {
  return makeStory<{
    icon: string;
    size: Size;
    transform: string;
  }>({
    args: {
      icon: defaultIcon,
      size: Size.normal,
      transform: "",
    },
    argTypes: {
      ...getSelectArgType(
        "icon",
        (iconsMap.get(iconPrefix) || []).map((type) => ({
          key: type,
          value: type,
        }))
      ),
    },
    builder: ({ icon, ...args }): string =>
      getIcon(icon, { iconPrefix, ...args }),
  });
};

export const LibraryFasStory = makeLibStory("fas", "home");
export const LibraryFabStory = makeLibStory("fab", "cat");

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ value }) =>
      getIcon("home", {
        size: value,
      })
    ),
});

export const HomeIconStory = makeStory({
  builder: (): string => getIcon("home"),
});

export const FlipAndRotateStory = makeStory({
  builder: (): string => getIcon("home", { transform: "flip-v rotate-90" }),
});

export const UnknownIconStory = makeStory({
  builder: (): string => getIcon("chart-home"),
});
