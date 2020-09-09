import { IconName, IconPrefix, library } from '@fortawesome/fontawesome-svg-core';
import { faAccessibleIcon, faAutoprefixer, faFontAwesome, faGit, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { faCat, faCheckSquare, faHome, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Components } from '../../../components';
import { ComponentProps, getElement, getSelectArgType, makeSizeStory, makeStory, Props, StringSelectArgType } from '../../../shared/storybook';
import { Size } from '../../../shared/types';

const component = 'p6-icon';

export default {
  title: 'Atoms/Icon',
  component,
};

const componentProps: ComponentProps = ['name', 'size', 'iconPrefix', 'transform'];

const iconsMap = new Map([
  ['fab', ['accessible-icon', 'autoprefixer', 'font-awesome', 'git', 'html5']],
  ['fas', ['home', 'info-circle', 'check-square', 'times', 'cat']],
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
  faCat,
);

const getStoryField = (name: IconName, props?: Props<Components.P6Icon>): HTMLElement => getElement(component, name, { name, ...props });

const makeLibStory = (iconPrefix: IconPrefix, defaultIcon: IconName) => {
  return makeStory<{
    icon: IconName;
    size: Size;
    transform: string;
  }>({
    componentProps,
    args: {
      icon: defaultIcon,
      size: Size.normal,
      transform: '',
    },
    argTypes: {
      ...getSelectArgType<StringSelectArgType>(
        'icon',
        (iconsMap.get(iconPrefix) || []).map(type => ({
          key: type,
          value: type,
        })),
      ),
    },
    builder: ({ icon, ...args }): HTMLElement => getStoryField(icon, { iconPrefix, ...args }),
  });
};

export const LibraryFas = makeLibStory('fas', 'home');
export const LibraryFab = makeLibStory('fab', 'cat');

export const Sizes = makeSizeStory({
  componentProps,
  builder: ({ value }) =>
    getStoryField('home', {
      size: value,
    }),
});

export const HomeIcon = makeStory({
  componentProps,
  builder: (): HTMLElement => getStoryField('home'),
});

export const FlipAndRotate = makeStory<{ transform: string }>({
  componentProps,
  args: {
    transform: 'flip-v rotate-90',
  },
  builder: (props): HTMLElement => getStoryField('home', props),
});
