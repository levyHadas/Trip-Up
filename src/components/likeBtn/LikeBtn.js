import React, { Fragment } from 'react'

function LikeBtn( props ) {
    
    const handleLike = () => {
        // if (props.userLiking.likes.some(liked => liked === props.tripToLike._id)) return;
        props.userLiking.likes.unshift(props.tripToLike._id)
        props.tripToLike.likes++
        props.saveUser(props.userLiking, {noLoading:true})
        props.updateTripLikes(props.tripToLike, props.trips)
    }

    return (
        <Fragment>
            {props.userLiking._id !== props.tripToLike.organizer._id &&
            <Fragment>
                <span onClick={handleLike}>
                    {props.tripToLike.likes}
                    <i className="far fa-thumbs-up" title="like"></i>
                </span>
            </Fragment>}
            {props.userLiking._id === props.tripToLike.organizer._id &&
            <Fragment>
                <span>{props.tripToLike.likes}
                    <i className="far fa-thumbs-up no-user" title="like"></i>
                </span>
            </Fragment>}
        </Fragment>)
}

export default LikeBtn