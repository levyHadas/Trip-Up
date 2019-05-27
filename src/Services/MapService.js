export default {
    itineraryToCoords,
    geoCodePlace
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
        console.log(coords)
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



