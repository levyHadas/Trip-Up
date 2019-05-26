import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import React, { Component, Fragment } from 'react'
 
export class MapContainer extends Component {

state={center:{}, paths:[], showInfo:false, selectedPlace:''}

componentDidMount() {
  const google = this.props.google
  this.geocoder = new google.maps.Geocoder()
  this._itineraryToCoords()
  .then(coords => {
    this.setState({
      paths:coords.map(coord => {
        return { lat: coord.lat(), lng: coord.lng()}
      })
    }) 
  this._geoCodePlace(this.props.country)
    .then(coords => {
      this.setState({center: {lat:coords.lat(), lng:coords.lng()}}) 
      setTimeout(() => {console.log(this.state.center)},500)
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
  

onMapClicked = (props,map, ev) => {
  return this.setState({showInfo:false, 
            activeMarker:null,
            selectedPlace: null, 
            center:{lat:ev.latLng.lat(), lng:ev.latLng.lng()}
          })
}
onInfoWindowClose = (props,infoWindow, ev) => {
  return this.setState({showInfo:false, 
            activeMarker:null,
            selectedPlace: null
            })
}
onMarkerClicked = (props,marker, ev) => {
  return this.setState({showInfo:true, activeMarker:marker,selectedPlace: props})
  
}
render() {
  const style = {
      width: '100%',
      height: '100%',
  }
  if (this.state.paths && this.state.paths.length) {
    var markersMap = this.state.paths.map((markerCoords, idx) =>{
      return <Marker
        name={this.props.itinerary[idx]}
        key={idx}
        position={markerCoords}
        onClick={this.onMarkerClicked}/>
    })
  }  
  return (
  <Fragment>
    {this.state.center.lng && this.state.center.lat &&
    <Map google={this.props.google} zoom={7} style={style} 
      initialCenter={this.state.center}
      onClick={this.onMapClicked}>

      {markersMap}          

      {this.state.paths && this.state.paths.length &&
      <Polygon
        paths={this.state.paths}
        strokeColor="#0000FF"
        strokeOpacity={0.7}
        strokeWeight={1}
        fillColor="#0000FF"
        fillOpacity={0.2} />}
      <InfoWindow onClose={this.onInfoWindowClose} 
                  visible={this.state.showInfo} 
                  marker={this.state.activeMarker}>
        <div> 
          {this.state.selectedPlace &&
          <h1>{this.state.selectedPlace.name}</h1>}
        </div>
      </InfoWindow>
    </Map>}
  </Fragment>)
} //end of render


} //end of comp

const googleApiConfig = {
    apiKey:'AIzaSyBplLbAcZVSOOSkP5sLK4SrJ-YvjWA43E8'
}

export default GoogleApiWrapper(googleApiConfig)(MapContainer)


