import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import React, { Component, Fragment } from 'react'
import { GoogleApiConfig } from '../../Services/GoogleApiConfig'
 
export class EditMap extends Component {

state={center:{}, showInfo:false, selectedPlace:''}

componentDidMount() {
  this.setState({center: this.props.itinerary[0]})
}
  

onMapClicked = (props,map, ev) => {
  return this.setState({showInfo:false, 
            activeMarker:null,
            selectedPlace: null, 
            center:{lat:ev.latLng.lat(), lng:ev.latLng.lng()}
          })
}

render() {
  const style = {
      width: '100%',
      height: '100%',
  }
  return (
  <Fragment>
    <Map google={this.props.google} zoom={this.props.zoom} style={style} 
      initialCenter={this.props.itinerary[0]}
      onClick={this.onMapClicked}>

      <Polygon
        paths={this.props.itinerary}
        strokeColor="#0000FF"
        strokeOpacity={0.7}
        strokeWeight={1}
        fillColor="#0000FF"
        fillOpacity={0.2} />
  
    </Map>}
  </Fragment>)
} //end of render


} //end of comp

export default GoogleApiWrapper(GoogleApiConfig)(EditMap)


