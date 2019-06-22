import axios from 'axios'
import { BASE_PATH_REQUEST } from '../config/consts'


export default {
    addIncoming,
    updateIncoming,
    addOutgoing,
    updateOutgoing,
 
}

const Axios = axios.create({
    withCredentials: true,
})


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





