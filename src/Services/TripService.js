import axios from 'axios'
import trips from '../data/tripsData'
import userService from './userService.js';
import { googleApiConfig } from '../config/googleApiConfig'
import { BASE_PATH_TRIP } from '../config/consts'


const Axios = axios.create({
    withCredentials: true,
})

export default {
    query,
    getById,
    save,
    remove,
    getEmpty,
    createTrips,
    getTripTypes,
    getPlaceImg,
    getTripImgs
}

function createTrips() {
    trips.forEach(trip => {
        trip.desc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores atque at odio harum natus voluptate aliquam sapiente mollitia ad molestias quidem, excepturi impedit itaque neque doloribus ex pariatur iste animi.'
        save(trip)
    })
}

function query(filterBy) {
    var queryStr = '?'
    if (filterBy) {
        if (filterBy.tripsIds) queryStr = `tripsIds=${JSON.stringify(filterBy.tripsIds)}`
        else {
            for (var key in filterBy) {
                if (typeof(filterBy[key]) === 'object') {
                    if (!filterBy[key]) continue
                    queryStr += `${key}=${JSON.stringify(filterBy[key])}&`
                }
                else queryStr += `${key}=${filterBy[key]}&`
            }
        }
    }
    return Axios.get(`${BASE_PATH_TRIP}/${queryStr}`)
        .then(res => res.data)
        .catch(err => {throw (err)})
}


function getById(tripId) {
    if (!tripId) return null
    return Axios.get(`${BASE_PATH_TRIP}/${tripId}`)
        .then(res => res.data)
        .catch(err => {throw (err)})
}

async function save(trip) {
    trip.createdAt = Date.now()
    trip.tripDate = new Date(trip.tripDate).getTime()
    if (trip.type === 'Type') trip.type = ''
    if (trip._id) {
        return Axios.put(`${BASE_PATH_TRIP}/${trip._id}`, trip)
            .then(res => res.data)
            .catch(err => {throw (err)})
    }
    else {
        let tripOrganizer = await userService.getLoggedUser()
        delete tripOrganizer.likes
        delete tripOrganizer.trips //just want to save the name and the img
        trip.organizer = tripOrganizer
        if (!trip.desc) trip.desc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores atque at odio harum natus voluptate aliquam sapiente mollitia ad molestias quidem, excepturi impedit itaque neque doloribus ex pariatur iste animi.'
        return Axios.post(`${BASE_PATH_TRIP}`, trip)
            .then(res => res.data)
            .catch(err => {throw (err)})
    }
}


function remove(tripId) {
    return Axios.delete(`${BASE_PATH_TRIP}/${tripId}`)
        .then(res => res.data)
        .catch(err => {throw (err)})
}

function getEmpty() {
    return {
        "country": "",
        "budget": {min:0, max:1500},
        "type": "",
        "maxMembers": "",
        "organizer": {},
        "members": [],
        "status": "open",
        "createdAt":"",
        "likes": 1,
        "tripDate":"",
        "itinerary":[],
        "description":''
    }

}
function getTripTypes() {
    return ['Type','Hiking', 'Shoping', 'Music', 'Art', 'Photography', 'Ski', 'Food', 'Other']
}

function getPlaceImg(photoReference) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${googleApiConfig.apiKey}`
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


