import React, { Fragment } from 'react'
import requestService from '../../services/requestService'

function JoinBtn({ userRequesting, tripToRequest }) {
    
    const handleJoin = () => {
        if (!userRequesting) return;
        requestService.setNewRequest(userRequesting, tripToRequest)
        //toast that request was sent
    }

    return (
        <Fragment>
            {userRequesting._id !== tripToRequest.organizer._id &&
            <Fragment>
                <span onClick={handleJoin}>
                    <i className="fas fa-user-plus" title="Ask to Join"></i>
                </span>
            </Fragment>}
            {userRequesting._id === tripToRequest.organizer._id &&
            <Fragment>
                <span>{tripToRequest.members.length}
                    <i className="fas fa-users" title="Joined"></i>
                </span>
            </Fragment>}
        </Fragment>)
}

export default JoinBtn