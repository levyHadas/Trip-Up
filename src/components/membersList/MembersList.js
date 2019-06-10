import React from 'react'
import './membersList.scss'
function MembersList({ members, hideMembers }) {
    const membersMap = members.map(member => {
        return (<li key={member._id}> 
                    <img className="member-img" src={member.img} alt="Traveler"/>
                    <p className="member-name">{member.username}</p>
                </li>)
        }) 

    return (
        <div className="members-container flex column align-center">
            {membersMap.length !==0 && 
            <h1>Trip Travellers:</h1>}
            {!membersMap.length && 
            <h1>Be the first to join!</h1>}
            <ul>{membersMap}</ul>
            <i className="far fa-times-circle" onClick={hideMembers}></i>
        </div>)
}
export default MembersList