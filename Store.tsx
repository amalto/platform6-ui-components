import { combineReducers, createStore, Store } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { datagridReducer } from './typescript/DataGridReducer'
import { mainReducer } from './typescript/MainReducer'
import { servicesReducer } from './typescript/ServicesReducer'

const reducer = combineReducers( {
    form: formReducer,
    datagrid: datagridReducer,
    main: mainReducer,
    services: servicesReducer
} )
const store = createStore( reducer )

export { store }