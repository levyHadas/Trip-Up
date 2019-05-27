import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import React, { Component, Fragment } from 'react'
import { GoogleApiConfig } from '../../Services/GoogleApiConfig'
 
export class EditMap extends Component {

state={center:{}, showInfo:false, selectedPlace:''}

componentDidMount() {
  // this.setState({center: this.props.itineraryCoords[0]})
}
  

onMapClicked = (props,map, ev) => {
  return this.setState({showInfo:false, 
            activeMarker:null,
            selectedPlace: null, 
            center:{lat:ev.latLng.lat(), lng:ev.latLng.lng()}
          })
}

render() {
  const style = { width: '100%', height: '100%' }
  var icon = {
    url: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png", // url
    scaledSize: new this.props.google.maps.Size(21, 33), // scaled size
    origin: new this.props.google.maps.Point(0,0), // origin
    anchor: new this.props.google.maps.Point(11, 33) // anchor
};
  
  const markersMap = this.props.itinerary.map(place => {
      return <Marker
        key={place.place_id}
        position={place.geometry.location}
        onClick={this.onMarkerClicked}
        icon= {icon} />
      })
  const paths = this.props.itinerary.map(place => place.geometry.location)
  return (
  <Fragment>
    <Map google={this.props.google} zoom={this.props.zoom} style={style} 
      initialCenter={paths[0]} //should be handled
      onClick={this.onMapClicked}>
      {!this.props.initial && markersMap}
      {!this.props.initial && 
      <Polygon
        paths={paths}
        strokeColor="#0000FF"
        strokeOpacity={0.7}
        strokeWeight={1}
        fillColor="#0000FF"
        fillOpacity={0.2} />}
    </Map>}
  </Fragment>)
} //end of render


} //end of comp

export default GoogleApiWrapper(GoogleApiConfig)(EditMap)


