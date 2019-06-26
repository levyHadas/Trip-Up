import React from 'react'
import { Link } from 'react-router-dom'
import './TripItem.scss'
import tripService from '../../services/tripService';
import JoinBtn from '../joinBtn/JoinBtn'
import LikeBtn from '../likeBtn/LikeBtn'
import { CLOSED } from '../../config/consts'

function TripItem ({ trip, user, trips, saveUser, updateTripLikes}) {
  const linkTo =`/trip/${trip._id}`
  const linkToEdit =`/trip/edit/${trip._id}`
  var tripImg = tripService.getPlaceImg(trip.itinerary[0].photos[0].photo_reference)
  var cardClassName = 'trip-item-card'
  if (trip.status === CLOSED) cardClassName += ' closed'
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
          {user._id &&
            <div className="right-info-container flex align-center">
              <LikeBtn userLiking={user} tripToLike={trip} trips={trips}
                  saveUser={saveUser} updateTripLikes={updateTripLikes}/>
              <JoinBtn userRequesting={user} tripToRequest={trip}/>
            </div>}
        </div>}
      </li>
    )
   
}


export default TripItem