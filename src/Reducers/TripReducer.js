
const initialState = {currTrip:{}, trips:[]}
export const tripReducer = (state=initialState, action) => {
    switch (action.type) {

        case 'setTrips':
            return ({...state, trips:[...action.payload]})
        case 'setCurrTrip':
            // if (action.payload) return ({...state, currTrip:action.payload})
            return ({...state, currTrip:{...action.payload}})
        default:
            return state
    }
}






//examples for exports

// export default (state={}, action) => {
//     if (action.type === 'a') state = {...state, num:action.payload} 
//     return state
// }
// import userReducer from '../Reducers/userReducer'




// const mainReducer = (state={}, action) => {
    //     if (action.type === 'a') state = {...state, num:action.payload} 
    //     return state
    // }
    // export default {
        //     mainReducer,
        // }

// import userReducer from '../Reducers/userReducer'
// userReducer.mainReducer

