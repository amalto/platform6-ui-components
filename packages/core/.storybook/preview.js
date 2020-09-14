import { setCustomElements } from '@storybook/web-components';
import customElementsJson from '../dist/custom-elements.json';
import { platform6 } from './theme';

setCustomElements(customElementsJson);

export const parameters = {
  layout: 'centered',
  theme: platform6,
};
