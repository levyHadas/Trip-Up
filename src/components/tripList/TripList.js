import React from 'react'
import TripItem from '../tripItem/TripItem'
import './TripList.scss'

function TripList ({ trips, user, onUpdateLikeJoin }) {
    const tripItems = trips.map(trip => {
        return <TripItem key={trip._id} trip={trip} 
                    user={user} 
                    onUpdateLikeJoin={onUpdateLikeJoin}/>})
        
    return <ul className="trip-list">{tripItems}</ul>
   
}

export default TripList