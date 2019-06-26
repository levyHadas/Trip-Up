import React from 'react'
import { PANDING } from '../../config/consts'
import { APPROVED } from '../../config/consts'
import { DECLINED } from '../../config/consts'


function RequestItem ({ request, onSetRequestReply })  {
    return (
        <li className="request-container">
            <p className="trip-requested-id">Request id: {request._id}</p>
            <p className="trip-requested-country">
                Requested trip country: {request.tripCountry}
            </p>
            <p className="user-requesting">
                From user: {request.memberName}
            </p>
            <img src={request.memberImg} alt="userRequesting"/>
            <p>Request status: {request.status}</p>
            {request.status === PANDING &&
            <div className="request-actions-container">
                <button onClick={onSetRequestReply} 
                    name={request._id} value={APPROVED}>
                    Approve
                </button>
                <button onClick={onSetRequestReply} 
                    name={request._id} value={DECLINED}>
                    Decline
                </button>
            </div>}
        </li>)
        
}

export default RequestItem