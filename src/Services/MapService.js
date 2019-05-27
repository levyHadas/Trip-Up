import { geocodeByAddress } from 'react-places-autocomplete';
import axios from 'axios'
import { GoogleApiConfig } from '../Services/GoogleApiConfig'


const Axios = axios.create({
    withCredentials: true,
})
const BASE_PATH = (process.env.NODE_ENV !== 'development')
    ? 'trip/placeinfo'
    : 'http://localhost:3003/trip/placeinfo'

export default {
    itineraryToCoords,
    geoCodePlace,
    getPlaceInfo
}


function itineraryToCoords (google, trip) {
    const geocoder = new google.maps.Geocoder()
    if (!trip.itinerary.length) {
      return geoCodePlace(geocoder, trip.country).then(coord => {
          return ([{ lat: coord.lat(), lng: coord.lng() }])
      })
    }
    return Promise.all(trip.itinerary.map(geoCodePlace.bind(null,geocoder)))
    .then(coords => {
        return coords.map(coord => {
            return { lat: coord.lat(), lng: coord.lng() }
        })
    })
  }

function geoCodePlace(geocoder, place) {
    return new Promise((resolve, reject) =>
      geocoder.geocode({ 'address': place }, (results, status) => {    
        if (status === 'OK') return resolve(results[0].geometry.location);
          else return reject('No latLng was found by address');
      })
    )
  }

function getPlaceInfo(address) {
  if (!address) {
    const params = {
      "placeid" : "ChIJNVQ84YFLHRURqzjMQp3RVGY",
      "fields": ["name","rating","formatted_phone_number", "photo", "website", "type", "url", "place_id","formatted_address"],
      "key":GoogleApiConfig.apiKey
    }
    _infoRequest(params)
  }
  else {
    return geocodeByAddress(address)
    .then(results => {
      const params = {
        "placeid" : results[0].place_id,
        "fields": ["name","rating","formatted_phone_number", "photo", "website", "type", "place_id", "geometry", "formatted_address"],
        "key":GoogleApiConfig.apiKey
      }
      return _infoRequest(params)
        .then(info => info)
    })
    .catch(error => console.error('Error', error))
  }
}

function _infoRequest(params) {
  var strParams = '?'
  for (var key in params) {
    strParams += `${key}=${params[key]}&`
  }
  return Axios.get(`${BASE_PATH}/'${strParams}'`)
      .then(res => res.data.result)
      .catch(err => {throw (err)})
}



  



