import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { ComponentProps, getElement, makeStory, Props } from '../../../shared/storybook';
import { Mode, Size } from '../../../shared/types';
import { P6Panel } from './p6-panel';

const component = 'p6-panel';

export default {
  title: 'Molecules/Panel',
  component,
};

library.add(faPlay, faStop);

const componentProps: ComponentProps = ['hideable', 'hidden'];

const getStoryField = (props?: Props<P6Panel>): HTMLElement => {
  return getElement(
    component,
    [
      getElement('span', 'Panel Header', {
        slot: 'label',
      }),
      getElement(
        'div',
        [
          getElement(
            'p6-button',
            [
              getElement('p6-icon', [], {
                name: 'play',
              }),
              'Start',
            ],
            { outlined: true, size: Size.small },
          ),
          getElement(
            'p6-button',
            [
              getElement('p6-icon', [], {
                name: 'stop',
              }),
              'Stop',
            ],
            { mode: Mode.danger, outlined: true, size: Size.small },
          ),
        ],
        {
          slot: 'header-actions',
        },
      ),
      getElement('p6-empty', []),
    ],
    props,
  );
};

export const Default = makeStory<{
  hideable: boolean;
}>({
  componentProps,
  args: {
    hideable: true,
  },
  builder: args => getStoryField(args),
});
