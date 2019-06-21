import axios from 'axios'
import { googleApiConfig } from '../config/googleApiConfig'
import { BASE_PATH_MAPS } from '../config/consts'

const Axios = axios.create({
    withCredentials: true,
})

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

function getPlaceInfo(placeId) {
  console.log('here')
  const params = {
    "placeid" : placeId,
    "fields": ["name","rating","formatted_phone_number", "url", "reviews",
                "photo", "website", "type", "place_id", "geometry", "formatted_address"],
    "key":googleApiConfig.apiKey
  }
  return _infoRequest(params)
    .then(info => {console.log(info); return info})
    .catch(error => console.error('Error', error))
}


function _infoRequest(params) {
  var strParams = '?'
  for (var key in params) {
    strParams += `${key}=${params[key]}&`
  }
  return Axios.get(`${BASE_PATH_MAPS}/'${strParams}'`)
      .then(res => res.data.result)
      .catch(err => {throw (err)})
}













  



