import React from 'react'
import { PANDING } from '../../config/consts'
import { APPROVED } from '../../config/consts'
import { DECLINED } from '../../config/consts'

function IncomingRequestsList({ requests, onUpdateRequestStatus }) {
    const requestsMap = requests.map(request => {
        return (<li key={request.tripId}> 
                    <p className="request-id">{request.tripId}</p>
                    <p className="user-requesting">{request.userId}</p>
                    {request.status === PANDING &&
                    <div className="request-actions-container">
                        <button onClick={onUpdateRequestStatus} name={request.tripId} value={APPROVED}>Approve</button>
                        <button onClick={onUpdateRequestStatus} name={request.tripId} value={DECLINED}>Decline</button>
                    </div>}
                </li>)
        }) 

    return (
        <div className="requestss-container flex column align-center">
            <h1>Join requests</h1>
            <ul>{requestsMap}</ul>
        </div>)
}
export default IncomingRequestsList