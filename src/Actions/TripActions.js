
import tripService from '../services/tripService'
import userService from '../services/userService'

export function loadTrips(filterBy={}) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        dispatch ({type:'loading', payload:true})
        tripService.query(filterBy)
            .then(trips => {
                dispatch ({type:'setTrips', payload:trips})
                dispatch ({type:'loading', payload:false})
            })
    }
}

export function loadTrip(tripId) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        if (!tripId) dispatch ({type:'setCurrTrip', payload:{}})
        else {
            dispatch ({type:'loading', payload:true})
            return tripService.getById(tripId)
            .then(currTrip => {
                dispatch ({type:'setCurrTrip', payload:currTrip})
                dispatch ({type:'loading', payload:false})
                return currTrip
                })
        }
    }
}
export function loadTripMembers(currTrip) {
    return (dispatch) => { 
        dispatch ({type:'loading', payload:true})
        return userService.getUsers({usersIds:currTrip.members})
            .then(users => {
                currTrip.members = users
                dispatch ({type:'setCurrTrip', payload:currTrip})
                dispatch ({type:'loading', payload:false})
            })
    }
}

export function deleteTrip(tripId, { history }) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        dispatch ({type:'loading', payload:true})
        tripService.remove(tripId)
            .then(() => {
                dispatch ({type:'setCurrTrip', payload:null})
                dispatch ({type:'loading', payload:false})
                history.push(`/trip`)
            })
    }
}

export function saveTrip(tripToSave) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        dispatch ({type:'loading', payload:true})
        return tripService.save(tripToSave)
        .then(savedTrip => {
            dispatch ({type:'setCurrTrip', payload:savedTrip})
            dispatch ({type:'loading', payload:false})
        })
        .catch ((err) => {throw(err)})
    }
}

//no loading on this update type!!
export function saveTripWithoutLoading(tripToSave) {
    // return (dispatch) => { //it recives dispatch from the thunk middleware
    //     return tripService.save(tripToSave)
    //     .then(savedTrip => {
    //         dispatch ({type:'setCurrTrip', payload:savedTrip})
    //         tripService.query({})
    //         .then(trips => {
    //             dispatch ({type:'setTrips', payload:trips})
    //         })
    //     })
    //     .catch ((err) => {throw(err)})
    // }
}
export function reloadTrip(tripToReload, trips = null) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        return tripService.save(tripToReload)
        .then(savedTrip => {
            dispatch ({type:'setCurrTrip', payload:savedTrip})
            _reloadTripInTrips(dispatch, savedTrip, trips)
        })
        .catch ((err) => {throw(err)})
    }
}

function _reloadTripInTrips(dispatch, trip, trips) {
    if (!trips || !trips.length) return;
    const idx = trips.findIndex(listItem => listItem._id === trip._id)
    if (idx !== -1) trips[idx] = trip
    dispatch ({type:'setTrips', payload:trips})
}

export function updateTripLikes(tripToUpdate, trips = null) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        return tripService.updateLikes(tripToUpdate)
        .then(savedTrip => {
            dispatch ({type:'setCurrTrip', payload:savedTrip})
            _reloadTripInTrips(dispatch, savedTrip, trips)
        })
        .catch ((err) => {throw(err)})
    }
}



























// export function signup(user) {
//     return (dispatch) => { //it recives dispatch from the thunk middleware
//         return UserService.signup(user)
//             .then(signedUser => signedUser)
//     }
// }
// export function loadUser() {
//     return (dispatch) => { //it recives dispatch from the thunk middleware
//         UserService.getLoggedUser()
//             .then(user => {
//                 console.log('user', user)
//                 if (user) dispatch ({type:'setCurrUser', payload:user})
//             })
//     }
// }
// export function logout() {
//     return (dispatch) => { //it recives dispatch from the thunk middleware
//         UserService.logout()
//             .then(() => {
//                 dispatch ({type:'setCurrUser', payload:{username:'', password:''}})
//             })
//     }
// }

