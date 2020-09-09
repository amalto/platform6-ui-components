import { setCustomElements } from '@storybook/web-components';

import customElements from '../dist/custom-elements.json';

setCustomElements(customElements);

export const parameters = {
  layout: 'centered',
};
