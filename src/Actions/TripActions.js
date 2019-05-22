
import TripService from '../Services/TripService'

export function loadTrips(filterBy) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        dispatch ({type:'loading', payload:true})
        TripService.query(filterBy)
            .then(trips => {
                dispatch ({type:'setTrips', payload:trips})
                dispatch ({type:'loading', payload:false})
            })
    }
}
export function loadTrip(tripId) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        dispatch ({type:'loading', payload:true})
        return TripService.getById(tripId)
            .then(currTrip => {
                dispatch ({type:'setCurrTrip', payload:currTrip})
                dispatch ({type:'loading', payload:false})
                return currTrip
            })
    }
}
export function deleteTrip(tripId, { history }) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        dispatch ({type:'loading', payload:true})
        TripService.remove(tripId)
            .then(() => {
                dispatch ({type:'setCurrTrip', payload:null})
                dispatch ({type:'loading', payload:false})
                history.push(`/trip`)
            })
    }
}




export function saveTrip(tripToSave, props=null) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        dispatch ({type:'loading', payload:true})
        TripService.save(tripToSave)
        .then((savedTrip) => {
            dispatch ({type:'setCurrTrip', payload:savedTrip})
            dispatch ({type:'loading', payload:false})
            if (props) props.history.push(`/trip/${savedTrip._id}`)
        })
    }
}
export function updateTripLikesMembers(tripToUpdate) {
    return (dispatch) => { //it recives dispatch from the thunk middleware
        TripService.updateLikesMembers(tripToUpdate)
        .then(updatedTrip => {
                dispatch ({type:'setCurrTrip', payload:updatedTrip})
                TripService.query({})
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

