import { setCustomElements } from '@storybook/web-components';

import customElements from '../dist/custom-elements.json';
import { platform6 } from './theme';

setCustomElements(customElements);

export const parameters = {
  layout: 'centered',
  theme: platform6,
};
