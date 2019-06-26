import axios from 'axios'
import { BASE_PATH_REQUEST } from '../config/consts'
import { PANDING } from '../config/consts'
import socketService from './socketService'


export default {
    addIncoming,
    updateIncoming,
    addOutgoing,
    updateOutgoing,
    setNewRequest,
    saveNewStatus
 
}

const Axios = axios.create({
    withCredentials: true,
})

async function setNewRequest(member, trip) {
    if (member.trips.some(currTripId => currTripId === trip._id)) return;  //if user already in trip return
    if (trip.members.length >= trip.maxMembers) return; //if trip is full - return
    //else - set join request
    const newRequest = 
        {   _id: `${member._id}_${trip._id}`,
            tripId : trip._id, 
            memberId : member._id, 
            organizerId : trip.organizer._id,
            status : PANDING
        }
    newRequest._id = `${newRequest.memberId}_${newRequest.tripId}`
    await Promise.all([addIncoming(newRequest, trip.organizer._id), addOutgoing(newRequest, member._id)])
    socketService.emit('new-incoming-request', newRequest)
    console.log('request has been sent')
    //for debuging
    // const updatedOrganizer = await addIncoming(newRequest, trip.organizer._id)
    // const updatedMember = await addOutgoing(newRequest, member._id)
    // console.log('request has been sent', updatedOrganizer, updatedMember)
}

async function saveNewStatus(request) {
    await Promise.all([updateIncoming(request, request.organizerId), updateOutgoing(request, request.memberId)])
    socketService.emit('new-reply', request)
    //socketService. inform user that he was replyed
    //toast that request was approved

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







