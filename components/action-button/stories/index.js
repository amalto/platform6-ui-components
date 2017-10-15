import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ActionButton from '../typescript/index'


storiesOf('ActionButton', module)
	.add('active', () =>
		<ActionButton onClick={action('clicked')}>Click me!</ActionButton>)
	.add('disabled', () =>
		<ActionButton disabled onClick={action('clicked')}>Disabled</ActionButton>)
