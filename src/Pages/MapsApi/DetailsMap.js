import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import React, { Component, Fragment } from 'react'
import MapService from '../../Services/MapService'
import { GoogleApiConfig } from '../../Services/GoogleApiConfig'

export class DetailsMap extends Component {

state={center:{}, paths:[], showInfo:false, selectedPlace:''}

componentDidMount() {

  const paths = this.props.trip.itinerary.map(place => place.geometry.location)
  this.setState({ center:paths[0], paths })
  console.log(this.props.trip.itinerary)
}

onMapClicked = (props,map, ev) => {
  // return this.setState({showInfo:false, 
  //           activeMarker:null,
  //           selectedPlace: null, 
  //           center:{lat:ev.latLng.lat(), lng:ev.latLng.lng()}
  //         })
}
onInfoWindowClose = (props,infoWindow, ev) => {
  return this.setState({showInfo:false, 
            activeMarker:null,
            selectedPlace: null
            })
}
onMarkerClicked = (props,marker, ev) => {
  console.log(props)
  return this.setState({showInfo:true, activeMarker:marker,selectedPlace: props})
  
}
render() {
  const style = {
      width: '100%',
      height: '100%',
  }
  var markersMap = this.props.trip.itinerary.map(place => {
    return <Marker
      name={place.name}
      key={place.place_id}
      position={place.geometry.location}
      onClick={this.onMarkerClicked}
      onClick={this.onMarkerClicked}/>
  })

  return (
  <Fragment>
    {this.state.center.lng && this.state.center.lat &&
    <Map google={this.props.google} style={style} 
      initialCenter={this.state.center}
      zoom={7}
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
          <h1>{this.state.selectedPlace.name}</h1>
      </InfoWindow>
    </Map>}
  </Fragment>)
} //end of render


} //end of comp



export default GoogleApiWrapper(GoogleApiConfig)(DetailsMap)


