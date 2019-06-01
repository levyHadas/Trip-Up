
const initialState = {_id: null}
export const userReducer = (state=initialState, action) => {
    switch (action.type) {

        case 'signup':
            break
        case 'setCurrUser' || 'updateUser':
            return ({...state, ...action.payload})
        case 'updateUserLikesTrips':
            return ({...state, likes:[...action.payload.likes], trips:[...action.payload.trips]})
        default:
            return state
    }
}






