
const initialState = {loading:false}
export const utilReducer = (state=initialState, action) => {
    switch (action.type) {

        case 'loading':
            if (action.payload) return ({...state, loading:true})
            return ({...state, loading:false})
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

