
const initialState = {currTrip:{}, trips:[]}
export const tripReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'setTrips':
            return ({...state, trips:[...action.payload]})
            case 'setCurrTrip':
            return ({...state, currTrip:{...action.payload}})
        default:
            return state
    }
}


