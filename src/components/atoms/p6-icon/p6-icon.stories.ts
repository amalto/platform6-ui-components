import {
  IconName,
  IconPrefix,
  library,
} from "@fortawesome/fontawesome-svg-core";
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
import { Components } from "../../../components";
import {
  getElement,
  getSelectArgType,
  makeSizeStory,
  makeStory,
  Props,
  StringSelectArgType,
} from "../../../shared/storybook/stories";
import { Size } from "../../../shared/types";

const component = "p6-icon";

export default {
  title: "Atoms/Icon",
  component,
};

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

const getStoryField = (
  name: IconName,
  props?: Props<Components.P6Icon>
): HTMLElement => getElement(component, name, { name, ...props });

const makeLibStory = (iconPrefix: IconPrefix, defaultIcon: IconName) => {
  return makeStory<{
    icon: IconName;
    size: Size;
    transform: string;
  }>({
    args: {
      icon: defaultIcon,
      size: Size.normal,
      transform: "",
    },
    argTypes: {
      ...getSelectArgType<StringSelectArgType>(
        "icon",
        (iconsMap.get(iconPrefix) || []).map((type) => ({
          key: type,
          value: type,
        }))
      ),
    },
    builder: ({ icon, ...args }): HTMLElement =>
      getStoryField(icon, { iconPrefix, ...args }),
  });
};

export const LibraryFas = makeLibStory("fas", "home");
export const LibraryFab = makeLibStory("fab", "cat");

export const Sizes = makeSizeStory(({ value }) =>
  getStoryField("home", {
    size: value,
  })
);

export const HomeIcon = makeStory({
  builder: (): HTMLElement => getStoryField("home"),
});

export const FlipAndRotate = makeStory({
  builder: (): HTMLElement =>
    getStoryField("home", { transform: "flip-v rotate-90" }),
});
