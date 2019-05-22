
// const initialState = {_id: null, username:'', password:'', likes:[], trips:[]}
const initialState = {_id: null}
export const userReducer = (state=initialState, action) => {
    switch (action.type) {

        case 'signup':
            break
        case 'setCurrUser' || 'updateUser':
        console.log(action.payload)
        console.log({...state, ...action.payload, likes:[...action.payload.likes], trips:[...action.payload.trips]})
        return ({...state, ...action.payload, likes:[...action.payload.likes], trips:[...action.payload.trips]})
        // case 'updateUser':
            // return ({...state, ...action.payload, likes:[...action.payload.likes], trips:[...action.payload.trips]})
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

