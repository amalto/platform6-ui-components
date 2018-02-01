import { createStore, Store } from 'redux'

const todos = ( state = [], action ) => {
    return state
}

const store = createStore( todos )

export { store }