//import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import readme from './readme.md';

export default {
  title: 'Atoms/Button',
  component: 'p6-button',
  decorators: [withKnobs],
  parameters: { notes: readme, options: { selectedPanel: 'storybookjs/knobs/panel' } }
};

const modes = ['danger', 'warning', 'default', 'info', 'success', 'primary']

export const Default = () => {
  const kModes = select('Modes', modes, 'default');
  const kOutlined = boolean('Outlined', false);
  const kWaiting = boolean("Waiting", false);
  const kDisabled = boolean("Disabled", false);

  return `<p6-button mode=${kModes} outlined=${kOutlined}  waiting=${kWaiting} disabled=${kDisabled}>click!</p6-button>`
}

export const storyModes = () => modes
  .map(mode => `<p6-button mode="${mode}">${mode}</p6-button>`)
  .join(' ')

storyModes.story = {
  name: 'Modes'
}

export const storyOutlined = () => modes
  .map(mode => `<p6-button mode=${mode} outlined=${true}>${mode}</p6-button>`)
  .join(' ')

storyOutlined.story = {
  name: 'Appearances'
}

export const storyWaiting = () => modes
  .map(mode => `<p6-button mode=${mode} waiting=${true}>${mode}</p6-button>`)
  .join(' ')

storyWaiting.story = {
  name: 'Waiting'
}

export const storyWaitingAndOutlined = () => modes
  .map(mode => `<p6-button mode=${mode} outlined waiting>${mode}</p6-button>`)
  .join(' ')

storyWaitingAndOutlined.story = {
  name: 'Waiting and Outlined'
}

export const storyDisabled = () => modes
  .map(mode => `<p6-button mode=${mode} disabled>${mode}</p6-button>`)
  .join(' ')

storyDisabled.story = {
  name: 'Disabled'
}

export const storyDisabledAndOutlined = () => modes
  .map(mode => `<p6-button mode=${mode} outlined disabled>${mode}</p6-button>`)
  .join(' ')

  storyDisabledAndOutlined.story = {
  name: 'Disabled and Outlined'
}