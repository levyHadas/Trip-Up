
const initialState = {loading:false, navOpen: false}
export const utilReducer = (state=initialState, action) => {
    switch (action.type) {

        case 'loading':
            if (action.payload) return ({...state, loading:true})
            return ({...state, loading:false})
        case 'toggleNav':
            const newNavState = !state.navOpen
            return ({ ...state, navOpen:newNavState })
        default:
            return state
    }
}





