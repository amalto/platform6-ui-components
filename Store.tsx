import { combineReducers, createStore, Store } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers( { form: formReducer } )
const store = createStore( reducer )

export { store }