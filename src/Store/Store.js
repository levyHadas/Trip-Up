import { applyMiddleware, combineReducers, createStore } from 'redux'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { userReducer } from '../reducers/userReducer'
import { tripReducer } from '../reducers/tripReducer'
import { utilReducer } from '../reducers/utilReducer'

const reducers = combineReducers({
    user: userReducer,
    util: utilReducer, 
    trip: tripReducer
})


// const middleware = applyMiddleware(logger, thunk)
const middleware = applyMiddleware(thunk)
const store = createStore(reducers, middleware)

export default store