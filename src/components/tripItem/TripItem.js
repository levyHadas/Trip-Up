import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './TripItem.scss'
import tripService from '../../services/tripService';


function TripItem ({ trip, user, onUpdateLikeJoin }) {
  const linkTo =`/trip/${trip._id}`
  const linkToEdit =`/trip/edit/${trip._id}`
  var tripImg = tripService.getPlaceImg(trip.itinerary[0].photos[0].photo_reference)
  const cardClassName = (trip.status === 'closed') ? 'trip-item-card closed':'trip-item-card'
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
          <div className="right-info-container flex align-center">
            <span>{trip.likes}</span>
            {user._id && user._id !== trip.organizer._id && 
            <Fragment>
              <i className="far fa-thumbs-up" title="like" 
                data-action-type="like" data-trip-id={trip._id} 
                onClick={onUpdateLikeJoin.bind(this)}> 
              </i>
              <i className="fas fa-user-plus" title="Join" 
                data-action-type="join" data-trip-id={trip._id} 
                onClick={onUpdateLikeJoin.bind(this)}>
              </i>
            </Fragment>}
            {(!user._id || user._id === trip.organizer._id) &&
            <Fragment>
              <i className="far fa-thumbs-up no-user"></i>
                {/*ev is passed automaticly as last parameter in bind  */}
              <span>{trip.members.length}</span>
              <i className="fas fa-users" title="Members"></i>
            </Fragment>}
          </div>
        </div>}
      </li>
    )
   
}


export default TripItem