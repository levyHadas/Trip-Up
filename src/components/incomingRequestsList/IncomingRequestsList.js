import React from 'react'
import RequestItem from '../requestItem/RequestItem'




function IncomingRequestsList({ requests, onSetRequestReply }) {
    const requestItems = requests.map( request => {
        return (
            <RequestItem key={request._id} request={request}
            onSetRequestReply={onSetRequestReply}/>)
        }) 
    return (
        <div className="requestss-container flex column align-center">
            <h1>Join requests</h1>
            <ul>{requestItems}</ul>
        </div>)
}
export default IncomingRequestsList