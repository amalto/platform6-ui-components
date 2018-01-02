import {
    configure
} from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

function loadStories() {
    require('./index.js')
}

configure(loadStories, module)

setOptions({
    name: 'b2-common-components'
})