import axios from 'axios'
import trips from '../Data/TripsData'
import UserService from './UserService.js';

const Axios = axios.create({
    withCredentials: true,
})

const BASE_PATH = (process.env.NODE_ENV !== 'development')
    ? '/trip'
    : 'http://localhost:3003/trip'

export default {
    query,
    getById,
    save,
    remove,
    getEmpty,
    createTrips,
    getTripTypes,
    updateLikesMembers
}

function createTrips() {
    trips.forEach(trip => {
        trip.desc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores atque at odio harum natus voluptate aliquam sapiente mollitia ad molestias quidem, excepturi impedit itaque neque doloribus ex pariatur iste animi.'
        save(trip)
    })
}

function query(filterBy={}) {
    return Axios.get(`${BASE_PATH}`, filterBy)
    // return Axios.get(`${BASE_PATH}/${filterBy}`)
        .then(res => res.data)
        .catch(err => {throw (err)})
}

function getById(tripId) {
    if (!tripId) return null
    return Axios.get(`${BASE_PATH}/${tripId}`)
        .then(res => res.data)
        .catch(err => {throw (err)})
}

async function save(trip) {
    trip.organizer = await UserService.getLoggedUser()
    trip.createdAt = Date.now()
    console.log(trip)
    if (trip._id) {
        return Axios.put(`${BASE_PATH}/${trip._id}`, trip)
        .then(res => res.data)
        .catch(err => {throw (err)})
    }
    return Axios.post(`${BASE_PATH}`, trip)
    .then(res => res.data)
    .catch(err => {throw (err)})
}
async function updateLikesMembers(trip) {
    return Axios.put(`${BASE_PATH}/memberslikes/${trip._id}`, trip)
        .then(res => res.data)
        .catch(err => {throw (err)})
   
}

function remove(tripId) {
    return Axios.delete(`${BASE_PATH}/${tripId}`)
        .then(res => res.data)
        .catch(err => {throw (err)})
}

function getEmpty() {
    return {
        "country": "",
        "city": "",
        "budget": "",
        "type": "",
        "max-members": "",
        "organizer": {},
        "members": [],
        "status": "open",
        "createdAt":"",
        "likes": "1",
        "tripDate":"",
        "itinerary": [],
        "imgs": [],
        "itinerary":[]
    }

}
function getTripTypes() {
    return ['hiking', 'shoping', 'music', 'art', 'other', 'photography', 'skiing', 'food']
}

// "itinerary": [{"name":"madrid", "img":"", "coords":{}}, {"name":"barcelona", "img":"", "coords":{}}],
