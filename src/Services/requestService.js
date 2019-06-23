import axios from 'axios'
import { BASE_PATH_REQUEST } from '../config/consts'
import { PANDING } from '../config/consts'
import { APPROVED } from '../config/consts'
import { DECLINED } from '../config/consts'


export default {
    addIncoming,
    updateIncoming,
    addOutgoing,
    updateOutgoing,
    setNewRequest,
    updateRequestStatus
 
}

const Axios = axios.create({
    withCredentials: true,
})

async function setNewRequest(member, trip) {
    if (member.trips.some(currTripId => currTripId === trip._id)) return;  //if user already in trip return
    if (trip.members.length >= trip.maxMembers) return; //if trip is full - return
    //else - set join request
    const newRequest = 
        {   tripId : trip._id, 
            memberId : member._id, 
            status : PANDING
        }
    const updatedOrganizer = await addIncoming(newRequest, trip.organizer._id)
    const updatedMember = await addOutgoing(newRequest, member._id)
    console.log('request has been sent', updatedOrganizer, updatedMember)
    // socketService. tell organizer there is a request 
}

async function updateRequestStatus(request, currUserId) {
    updateIncoming(request, currUserId)
    updateOutgoing(request, request.memberId)
    // const updatedOrganizer = await updateIncoming(request, currUserId)
    // const updatedMember = await updateOutgoing(request, request.memberId)
}

function addIncoming(newRequest, organizerId) {
    return Axios.post(`${BASE_PATH_REQUEST}/incoming/${organizerId}`, newRequest)
        .then(res => res.data) 
        .catch(err => {throw (err)}) 
}
function addOutgoing(newRequest, memberId) {
    return Axios.post(`${BASE_PATH_REQUEST}/outgoing/${memberId}`, newRequest)
        .then(res => res.data) 
        .catch(err => {throw (err)}) 
}
function updateIncoming(requestToUpdate, organizerId) {
    return Axios.put(`${BASE_PATH_REQUEST}/incoming/${organizerId}`, requestToUpdate)
        .then(res => res.data) 
        .catch(err => {throw (err)}) 
}
function updateOutgoing(requestToUpdate, memberId) {
    return Axios.put(`${BASE_PATH_REQUEST}/outgoing/${memberId}`, requestToUpdate)
        .then(res => res.data) 
        .catch(err => {throw (err)}) 
}







