import React from 'react'
import { Link } from 'react-router-dom'
import './TripItem.scss'
import tripService from '../../services/tripService';
import TripItemInfo from '../tripItemInfo/TripItemInfo'

//this component should be broken down to 3 components:
//trip item which holds:
//trip status display
//trip actions display
//trip by me display
function TripItem ({ trip, user, onUpdateLikeJoin }) {
  const linkTo =`/trip/${trip._id}`
  const linkToEdit =`/trip/edit/${trip._id}`
  var tripImg = tripService.getPlaceImg(trip.itinerary[0].photos[0].photo_reference)
  var cardClassName = 'trip-item-card'
  if (trip.status === 'closed') cardClassName += ' closed'
  if (trip.organizer._id === user._id) cardClassName += ' mine'
    return (
      <li className={cardClassName}>
        <h2 className="trip-title">{trip.country}</h2>    
        <Link to={linkTo}>
          {tripImg &&
          <div className="trip-item-inner" 
            style ={ { backgroundImage: `url("${tripImg}")` } }>
          </div>}
        </Link>
        {trip && trip.members &&
        <div className="action-info-container flex align-center space-between">
          <div className="left-action-container">
            {trip.organizer._id === user._id &&
            <Link to={linkToEdit}><i className="far fa-edit"></i></Link>} 
          </div>
        {onUpdateLikeJoin &&
        <TripItemInfo trip={trip} user={user} onUpdateLikeJoin={onUpdateLikeJoin}/>}
        </div>}
      </li>
    )
   
}


export default TripItem