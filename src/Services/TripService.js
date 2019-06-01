import axios from 'axios'
import trips from '../Data/TripsData'
import UserService from './UserService.js';
import { GoogleApiConfig } from '../Services/GoogleApiConfig'


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
    updateLikesMembers,
    getPlaceImg,
    getTripImgs
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
        "budget": {min:200, max:1500},
        "type": "",
        "maxMembers": "",
        "organizer": {},
        "members": [],
        "status": "open",
        "createdAt":"",
        "likes": 1,
        "tripDate":"",
        "itinerary":[]
    }

}
function getTripTypes() {
    return ['Type','hiking', 'shoping', 'music', 'art', 'other', 'photography', 'skiing', 'food']
}

function getPlaceImg(photoReference) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GoogleApiConfig.apiKey}`
}

function getTripImgs(trip) {
    var allPhotosObjects = []
    trip.itinerary.forEach(place => {
        if (place.photos) {
            var somePhotos = (place.photos).slice(0,2)
            allPhotosObjects.push(...somePhotos)
        }
        
    })
    return allPhotosObjects.map(photo => {
        return getPlaceImg(photo.photo_reference)})
}

