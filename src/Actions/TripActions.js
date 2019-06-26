
import tripService from '../services/tripService'
import userService from '../services/userService'
import store from '../store/store'

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
    return (dispatch) => { 
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
    return (dispatch) => { 
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
    return (dispatch) => { 
        dispatch ({type:'loading', payload:true})
        return tripService.save(tripToSave)
        .then(savedTrip => {
            dispatch ({type:'setCurrTrip', payload:savedTrip})
            dispatch ({type:'loading', payload:false})
        })
        .catch ((err) => {throw(err)})
    }
}

export function reloadTrip(tripToReload) {
    return (dispatch) => { 
    _reloadTripInTrips(dispatch, tripToReload, store.getState().trip.trips)
        if (store.getState().trip.currTrip._id && 
            store.getState().trip.currTrip._id === tripToReload._id) {
                dispatch ({type:'setCurrTrip', payload:tripToReload})
        }
     
    }
}

function _reloadTripInTrips(dispatch, trip, trips) {
    if (!trips || !trips.length) return;
    const idx = trips.findIndex(listItem => listItem._id === trip._id)
    if (idx !== -1) trips[idx] = trip
    dispatch ({type:'setTrips', payload:trips})
}

export function updateTripLikes(tripToUpdate, trips = null) {
    return (dispatch) => { 
        return tripService.updateLikes(tripToUpdate)
        .then(savedTrip => {
            dispatch ({type:'setCurrTrip', payload:savedTrip})
            _reloadTripInTrips(dispatch, savedTrip, trips)
        })
        .catch ((err) => {throw(err)})
    }
}



