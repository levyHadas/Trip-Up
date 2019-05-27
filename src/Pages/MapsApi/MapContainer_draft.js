import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon, withGoogleMap} from 'google-maps-react';
import React, { Component } from 'react'
 
export class MapContainer extends Component {

state={center:{}, paths:[]}

componentDidMount() {
  const google = this.props.google
  this.geocoder = new google.maps.Geocoder()
  this._geoCodePlace(this.props.country)
    .then(coords => {
      this.setState({center: {lat:coords.lat(), lng:coords.lng()}}) 
    })
  this._itineraryToCoords()
    .then(coords => {
      this.setState({
        // center: {lat:coords.lat(), lng:coords[0].lng()},
        paths:coords.map(coord => {
          return { lat: coord.lat(), lng: coord.lng()}
        })
      }) 
  })

}

_itineraryToCoords = () => {
  if (!this.props.itinerary.length) {
    return this._geoCodePlace(this.props.country).then(coord => [coord])
  }
  return Promise.all( 
    this.props.itinerary.map(this._geoCodePlace.bind(this))
  )
}

_geoCodePlace(place) {
  return new Promise((resolve, reject) =>
    this.geocoder.geocode({ 'address': place }, (results, status) => {
        if (status === 'OK') return resolve(results[0].geometry.location);
        else return reject('No latLng was found by address');
    })
  )
}
  



onMapClicked = (props,marker, ev) => {
  this.setState({center:{lat:ev.latLng.lat(), lng:ev.latLng.lng()}})
}
onMarkerClicked = (props,marker, ev) => {

}
render() {
  const style = {
      width: '80%',
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto'
  }
  if (this.state.paths && this.state.paths.length) {
    var markersMap = this.state.paths.map(markerCoords =>{
      return <Marker
      
      position={markerCoords}
      onClick={this.onMarkerClicked}/>
    })
  }  
  return (
    <div>
  {this.state.center.lat && 
    <Map google={this.props.google} zoom={7} style={style} 
      initialCenter={this.state.center}
      onClick={this.onMapClicked}>
  
  {markersMap}          
  {/* {this.state.paths && this.state.paths.length &&
  <Marker
      name={'Dolores park'}
      position={this.state.paths[0]}
      onClick={this.onMarkerClicked}/> }
  {this.state.paths && this.state.paths.length &&
  <Marker
      name={'Dolores park'}
      position={this.state.paths[1]}
      onClick={this.onMarkerClicked}/> } */}

  {this.state.paths && this.state.paths.length &&
  <Polygon
      paths={this.state.paths}
      strokeColor="#0000FF"
      strokeOpacity={0.7}
      strokeWeight={1}
      fillColor="#0000FF"
      fillOpacity={0.2} />}

  {/* <Marker onClick={this.onMarkerClick}
          name={'Current location'} /> */}

      <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
          </div>
      </InfoWindow>
    </Map>}
    </div>
  )
  }
}

const googleApiConfig = {
    apiKey:'AIzaSyDHc4xMMsbOPlBmSIZjM_9XHJv14Wea9EM'
}

export default GoogleApiWrapper(googleApiConfig)(MapContainer)


