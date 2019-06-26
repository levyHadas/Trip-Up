
import userService from '../services/userService'

export function login(user, history) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        dispatch ({type:'loading', payload:true})
        userService.login(user)
            .then(loggedUser => {
                dispatch ({type:'setCurrUser', payload:loggedUser})
                dispatch ({type:'loading', payload:false})
                history.push(`/trip`)
            })
            .catch(err => {
                dispatch ({type:'loading', payload:false})
                dispatch ({type:'setCurrUser', payload:{}})
                console.log(err)
                //need to tell user login is incorrect
            } )
    }
}

export function signup(user) {
    return (dispatch) => { 
        dispatch ({type:'loading', payload:true})
        return userService.signup(user)
            .then(signedUser => signedUser)
    }
}

export function saveUser(user, { noLoading } = false ) {
    return (dispatch) => {
        if (!noLoading) dispatch ({type:'loading', payload:true})
        return userService.updateUser(user)
            .then(updatedUser => {
                dispatch ({type:'updateUser', payload:updatedUser})
                if (!noLoading) dispatch ({type:'loading', payload:false})            
            })
            .catch(err => {throw(err)})
    }
}

export function loadUser() {
    return (dispatch) => { 
        dispatch ({type:'loading', payload:true})
        userService.getLoggedUser()
            .then(user => {
                if (user) dispatch ({type:'setCurrUser', payload:user})
                dispatch ({type:'loading', payload:false})
            })
    }
}
export function reloadCurrUser() {
    return (dispatch) => { 
        userService.getLoggedUser()
            .then(user => {
                if (user) dispatch ({type:'setCurrUser', payload:user})
            })
    }
}

export function logout() {
    return (dispatch) => { 
        userService.logout()
        .then(() => {
            dispatch ({type:'setCurrUser', payload:{_id:null, username:''}})
        })
    }
}
























// function _updateUser(user) {
//     return (dispatch) => {
//         dispatch ({type:'loading', payload:true})
//         return UserService.updateUser(user)
//             .then(updatedUser => {
//                 dispatch ({type:'updateUser', payload:updatedUser})
//                 dispatch ({type:'loading', payload:false})
            
//                 // increaseLikedForTrip()
//             })
//             .catch((err) => {throw(err)})
//     }
// }

// export function addTripToLiked(user, tripId) {
//     if (user.likes.some((like) => like === tripId)) {
//         return;
//     }
//     user.likes.unshift(tripId)
//     return _updateUser(user)
// }

// export function addToUserTrips(user, tripId) {
//     user.trips.unshift(tripId)
//     _updateUser(user)
//     //add to trip
// }

