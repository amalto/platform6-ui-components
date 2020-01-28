import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'


import { reducer as formReducer } from 'redux-form'
import { datagridReducer } from './typescript/DataGridReducer'
import { mainReducer } from './typescript/MainReducer'
import { servicesReducer } from './typescript/ServicesReducer'
import dialogReducer from './typescript/Redux/Dialog/DialogReducer'

const finalReducer = combineReducers( {
    form: formReducer,
    datagrid: datagridReducer,
    main: mainReducer,
    services: servicesReducer,
    dialog: dialogReducer
} )

const finalCreateStore = compose(
    applyMiddleware( ReduxThunk )
)( createStore )

const store = finalCreateStore( finalReducer )

export { store }