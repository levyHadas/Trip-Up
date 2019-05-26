import React from 'react'
import { Link } from 'react-router-dom'
import './TripItem.scss'


function TripItem ({ trip, user, onUpdateLikeJoin }) {
    const linkTo =`/trip/${trip._id}`
    const linkToEdit =`/trip/edit/${trip._id}`
    return (
      <li className="trip-item-card">
        
        <h2 className="trip-title">{trip.country} - {trip.city}</h2>    
        <Link to={linkTo}>
          <div className="trip-item-inner" 
            style ={ { backgroundImage: `url("${trip.imgs[0]}")` } }>
          </div>
        </Link>
        <div className="action-info-container flex align-center space-between">
          <div className="left-action-container">
            {trip.organizer._id === user._id &&
            <Link to={linkToEdit}><i className="far fa-edit"></i></Link>} 
          </div>
          <div className="right-info-container flex align-center">
            <span>{trip.likes}</span>
            {user._id &&
            <i className="far fa-thumbs-up" title="like" 
              data-action-type="like" data-trip-id={trip._id} 
              onClick={onUpdateLikeJoin.bind(this)}> 
            </i>}
            {!user._id &&
            <i className="far fa-thumbs-up no-user"></i>}
              {/*ev is passed automaticly as last parameter in bind  */}
            <span>{trip.members.length}</span>
            {user._id && 
            <i className="fas fa-user-plus" title="Join" 
              data-action-type="join" data-trip-id={trip._id} 
              onClick={onUpdateLikeJoin.bind(this)}>
            </i>}
            {!user._id && 
            <i className="fas fa-users" title="Members"></i>}
          </div>
        </div> 
      </li>
    )
   
}


export default TripItem