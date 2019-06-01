import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import React, { Component, Fragment } from 'react'
import { GoogleApiConfig } from '../../Services/GoogleApiConfig'
import PlaceInfo from '../../Comps/PlaceInfo/PlaceInfo'
import './MapContainer.scss'
 
export class MapContainer extends Component {

state={center:{}, showInfo:false, selectedPlace:''}


  
onInfoWindowClose = (props,infoWindow, ev) => {
  this.setState({showInfo:false, 
            activeMarker:null,
            // selectedPlace: null
            })
}
onMarkerClicked = (props,marker, ev) => {
  this.setState({showInfo:true, activeMarker:marker,selectedPlace: props})
}


render() {
  const style = { width: '100%', height: '100%' }
  const markersMap = this.props.itinerary.map(place => {
      return <Marker
        key={place.place_id}
        position={place.geometry.location}
        onClick={this.onMarkerClicked}
        icon= {this.props.icon}
        placeInfo={place}/>
      })
  const paths = this.props.itinerary.map(place => place.geometry.location)
  return (
  <Fragment>
    <Map google={this.props.google} zoom={this.props.zoom} style={style} 
      initialCenter={paths[0]} //should be handled
      onClick={this.onMapClicked}>
      
      {!this.props.initial && markersMap}
      
      <InfoWindow onClose={this.onInfoWindowClose} 
                  visible={this.state.showInfo} 
                  marker={this.state.activeMarker}>
        <PlaceInfo placeInfo={this.state.selectedPlace.placeInfo}/>
      </InfoWindow>

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

export default GoogleApiWrapper(GoogleApiConfig)(MapContainer)


