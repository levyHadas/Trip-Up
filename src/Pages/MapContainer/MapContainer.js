import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon, withGoogleMap} from 'google-maps-react';
import React, { Component } from 'react'
 
export class MapContainer extends Component {

state={}
componentDidMount() {
  const google = this.props.google
  console.log(google)
  this.geocoder = new google.maps.Geocoder()

    // this.geocoder.geocode({ 'address': 'israel' }, (result, status) => {
    //   console.log(result)
    //   console.log(status)
    // })

  this.setState({
    center: 
    {lat: 29.4910603, lng: 34.9025285}
  })
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
    const triangleCoords =[
      
    ]
    return (
        <Map google={this.props.google} zoom={8} style={style} 
            initialCenter={{lat: 29.4910603, lng: 34.9025285}}
            onClick={this.onMapClicked}>
            
      <Marker
        name={'Dolores park'}
        position={this.state.center} 
        onClick={this.onMarkerClicked}/>
      <Polygon
          paths={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35} />
{/*  
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} /> */}
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              {/* <h1>{this.state.selectedPlace.name}</h1> */}
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

const googleApiConfig = {
    // apiKey:'AIzaSyDHc4xMMsbOPlBmSIZjM_9XHJv14Wea9EM'
}

export default GoogleApiWrapper(googleApiConfig)(MapContainer)


