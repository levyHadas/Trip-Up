
import userService from '../services/userService'

export function login(user, history) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        dispatch ({type:'loading', payload:true})
        userService.login(user)
        .then(savedUser => {
            dispatch ({type:'setCurrUser', payload:savedUser})
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
    return (dispatch) => { //it recives dispatch from the thunk middleware
        dispatch ({type:'loading', payload:true})
        return userService.signup(user)
        .then(signedUser => signedUser)
    }
}

export function saveUser(user) {
    return (dispatch) => {
        dispatch ({type:'loading', payload:true})
        return userService.updateUser(user)
            .then(updatedUser => {
                dispatch ({type:'updateUser', payload:updatedUser})
                dispatch ({type:'loading', payload:false})            
            })
            .catch((err) => {throw(err)})
    }
}
export function updateUserLikesTrips(user) {
    return (dispatch) => {
        return userService.updateUser(user)
            .then(updatedUser => dispatch ({type:'updateUserLikesTrips', payload:updatedUser}))
            .catch((err) => {throw(err)})
    }
}

export function loadUser() {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        dispatch ({type:'loading', payload:true})
        userService.getLoggedUser()
            .then(user => {
                if (user) dispatch ({type:'setCurrUser', payload:user})
                dispatch ({type:'loading', payload:false})
            })
        }
    }
    export function logout() {
        return (dispatch) => { //it recives dispatch from the thunk middleware
            userService.logout()
            .then(() => {
                dispatch ({type:'setCurrUser', payload:{_id:null, username:'', password:''}})
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
//         console.log('trip already liked')
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

