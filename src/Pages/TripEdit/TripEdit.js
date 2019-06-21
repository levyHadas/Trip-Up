import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from '../../components/googleMaps/MapContainer'
import defaultPlace from '../../data/initialPlace'

import BudgetRange from '../../components/budgetRange/BudgetRange'
import TripTypes from '../../components/tripTypes/TripTypes'
import ItineraryItem from '../../components/itineraryItem/ItineraryItem'
import TripService from '../../services/tripService'
import MapService from '../../services/mapService'
import UtilService from '../../services/utilService'
import { loadTrip, saveTrip } from '../../actions/tripActions'
import LocationSearchInput from '../../components/googleMaps/LocationSearchInput'
import { googleApiConfig } from '../../config/googleApiConfig'
import './TripEdit.scss'

class TripEdit extends Component {

    constructor(props) {
        super(props)
        this.state = { itinerary:[], 
                        country: '', 
                        budget: {min:500, max:1800}, 
                        tripDate: '', 
                        maxMembers: 2,
                        itineraryErr: false,
                        tripDateErr: false }
        this.tripId = this.props.match.params.id
    }

    componentDidMount() {
        //need to follow url change!!
        if (!this.props.user._id) this.props.history.push('/')
        
        
        if (!this.tripId) {
            const tripToEdit = TripService.getEmpty()
            tripToEdit.members.push(this.props.user._id)
            this.setState({...tripToEdit})
        } else {
            this.props.loadTrip(this.tripId)
            .then(() => {
                if (this.props.user._id !== this.props.trip.organizer._id) {
                    this.props.history.push('/')
                } else {
                    const tripDate = UtilService.toDatePickerFormat(this.props.trip.tripDate)
                    this.setState({...this.props.trip, tripDate})
                }

            })  
        }
    }

    componentWillUnmount() {
        this.props.loadTrip(null)
    }

    setCountry = (address) => {
        this.setState({country: address.formatted_address})
    }
    handleInput = (ev) => {
        this.setState({ tripDateErr: false })
        if (ev.target.value) {
            var value = (isNaN(ev.target.value)) ? ev.target.value : +ev.target.value
            this.setState({[ev.target.name]:value})
        }
        else this.setState({[ev.target.name]:''})
    }

    handleSubmit = (ev) => {
        if (ev) ev.preventDefault()
        if (!this.state.itinerary.length) {
            this.setState({ itineraryErr: true })
            return; 
        }
        if (!this.state.tripDate) {
            this.setState({ tripDateErr: true })
            return;
        }
        var tripToSubmit = {...this.state}
        delete tripToSubmit.tripDateErr 
        delete tripToSubmit.itineraryErr 
        this.props.saveTrip(tripToSubmit)
            .then(() => this.props.history.push(`/trip/${this.props.trip._id}`))
    }
    
    addToItinerary = (newPlace) => {
        this.setState({ itineraryErr: false })
        if (!this.state.country) {
            let countryNames = newPlace.address_components.pop()
            if (countryNames.long_name === 'United States') {
                let stateNames = newPlace.address_components.pop()
                this.setState({country:countryNames.long_name + stateNames.long_name})
            } else this.setState({country:countryNames.long_name})
        }
        MapService.getPlaceInfo(newPlace.place_id)
        .then (placeInfo => {
            var itinerary = this.state.itinerary
            itinerary.push(placeInfo)            
            this.setState({itinerary})
        })
        
    }
    
    
    removeFromItinerary = (ev) => {
        ev.preventDefault()
        var itinerary = this.state.itinerary
        const idxToRemove = itinerary.findIndex(place => {
            return place.place_id === ev.target.getAttribute('value')
        })
        itinerary.splice(idxToRemove, 1)
        this.setState({itinerary})
    }

  

    render() {
        if (this.state.itinerary && this.state.itinerary.length) {
            var itineraryMap = this.state.itinerary.map(place => {
                return <ItineraryItem key={place.place_id} 
                        place={place}
                        onRemoveFromItinerary={this.removeFromItinerary}/>
            })
        }
    
        return (
        <section className="edit-container">
        {!this.state._id && <h1>Create a Trip</h1>}
        {this.state._id && <h1>Edit Your Trip</h1>}
        {this.state.itineraryErr &&
        <p className="err">Must choose at least one place</p>}
        {this.state.tripDateErr &&
        <p className="err">Must choose trip date</p>}
        
        <form>
            <button onClick={this.handleSubmit}>Save</button>
            <div className="top-container flex">
                {(this.state.country || !this.props.match.params.id) &&
                <LocationSearchInput className='address-autocomplete-input edit-field'
                            onPlaceSelected={this.setCountry} required
                            value={this.state.country} placeholder='Country' />}
                <TripTypes className="edit-field"
                    currType={this.state.type}
                    onTypeSelected={this.handleInput}/>
                <input className="edit-field max-members" type="number" name="maxMembers" 
                    value={this.state.maxMembers}
                    placeholder="Max Travellers"
                    onChange={this.handleInput}/>
                <input className="edit-field date" type="date" name="tripDate" 
                    value={this.state.tripDate}
                    onChange={this.handleInput}
                    required/>
            </div>
            <BudgetRange className="budget-range"
                budget={this.state.budget} 
                onSetBudget={budget => this.setState({budget:budget})}/>
          
            <div className="bottom-container">
                <div className="places-list flex">
                    {this.state.itinerary.length !== 0 && itineraryMap}
                </div>
                <div className="search-places">
                    <LocationSearchInput className='address-autocomplete-input on-map'
                        onPlaceSelected={this.addToItinerary}
                        value='' placeholder='Add place to itinerary'/>
                </div>
                {this.state.itinerary.length !== 0 &&
                <div className="map-wrapper-edit">
                    <MapContainer className="map-container"
                            itinerary={this.state.itinerary}
                            zoom={5}/>
                </div>}
                {this.state.itinerary.length === 0 &&
                <div className="map-wrapper-edit">
                    <MapContainer className="map-container"
                            itinerary={[defaultPlace]}
                            zoom={12}
                            initial={true}/>
            </div>}
                
            </div>
            
        </form>
        <div className="app-bg-img"></div>
        </section>)
    }
}

function mapStateToProps (state) {
    return { trip: state.trip.currTrip, user:state.user }
}

const mapDispatchToProps = {loadTrip, saveTrip}



  
export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper(googleApiConfig)(TripEdit))



//icon={icon}
// var icon = {
//     url: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png", // url
//     scaledSize: new this.props.google.maps.Size(21, 33), // scaled size
//     origin: new this.props.google.maps.Point(0,0), // origin
//     anchor: new this.props.google.maps.Point(11, 33) // anchor
// }