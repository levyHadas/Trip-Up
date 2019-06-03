
import tripService from '../services/tripService'

export function loadTrips(filterBy) {
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
        .then((savedTrip) => {
            dispatch ({type:'setCurrTrip', payload:savedTrip})
            dispatch ({type:'loading', payload:false})
        })
    }
}

export function updateTripLikesMembers(tripToUpdate) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        tripService.updateLikesMembers(tripToUpdate)
        .then(updatedTrip => {
                dispatch ({type:'setCurrTrip', payload:updatedTrip})
                tripService.query({})
                .then(trips => {
                    dispatch ({type:'setTrips', payload:trips})
                })
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

