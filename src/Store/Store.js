import { applyMiddleware, combineReducers, createStore } from 'redux'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { userReducer } from '../Reducers/UserReducer'
import { tripReducer } from '../Reducers/TripReducer'
import { utilReducer } from '../Reducers/UtilReducer'

const reducers = combineReducers({
    user: userReducer,
    util: utilReducer, 
    trip: tripReducer
})


// const middleware = applyMiddleware(logger, thunk)
const middleware = applyMiddleware(thunk)
const store = createStore(reducers, middleware)

export default store