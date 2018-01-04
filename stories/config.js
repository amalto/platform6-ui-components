import {
    configure,
    setAddon
} from '@storybook/react'
import chaptersAddon, { setDefaults } from 'react-storybook-addon-chapters'
import { setOptions } from '@storybook/addon-options'

function loadStories() {
    require('./index.js')
}
setDefaults({
    sectionOptions: {
        showSource: true,
        allowSourceToggling: false,
        showPropTables: false,
        allowPropTablesToggling: false
    }
})
setAddon(chaptersAddon)
configure(loadStories, module)
setOptions({
    name: 'b2-common-components'
})