import {
    configure
} from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

function loadStories() {
    require('./index.js')
}

/**
 * Need to wait for the storybook ui to be completely loaded to be sure that the addons module is loaded
 */
setTimeout(setOptions({
    name: 'b2-common-components',
    downPanelInRight: true
}), 0)

configure(loadStories, module)
