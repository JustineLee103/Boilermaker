import { createStore, applyMiddleware } from 'redux';
import combinedReducers from './reducers'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const store = createStore(
    combinedReducers,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
)

export default store
