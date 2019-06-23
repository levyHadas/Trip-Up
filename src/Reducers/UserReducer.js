
const initialState = {_id: null}
export const userReducer = (state=initialState, action) => {
    switch (action.type) {

        case 'signup':
            break
        case 'setCurrUser' || 'updateUser':
            return ({...state, ...action.payload})
        default:
            return state
    }
}






