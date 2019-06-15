import React, { Fragment } from 'react'

function TripItemInfo ({ trip, user, onUpdateLikeJoin }) {        
    return (
        <div className="right-info-container flex align-center">
        <span>{trip.likes}</span>
        {user._id && user._id !== trip.organizer._id && 
        <Fragment>
          <i className="far fa-thumbs-up" title="like" 
            data-action-type="like" data-trip-id={trip._id} 
            onClick={onUpdateLikeJoin.bind(this)}> 
          </i>
          <span>{trip.members.length}</span>
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
          <i className="fas fa-users" title="Joined"></i>
        </Fragment>}
      </div>)
   
}

export default TripItemInfo