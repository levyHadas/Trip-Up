import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'
 
export class MapContainer extends Component {
  render() {
    const style = {
      width: '500px',
      height: '500px'
    }
    return (
      <Map google={this.props.google}
      style={style}
      initialCenter={{
        lat: 40.854885,
        lng: -88.081807
      }}
      zoom={15}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDHc4xMMsbOPlBmSIZjM_9XHJv14Wea9EM')
})(MapContainer)