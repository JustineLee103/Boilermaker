import { combineReducers } from 'redux'
import reducerChildA from './reducerChildA'

const combinedReducers = combineReducers({
    reducerChildA: reducerChildA
})

export default combinedReducers
