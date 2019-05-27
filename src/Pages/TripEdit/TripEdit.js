import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import { GoogleApiWrapper } from 'google-maps-react';
import EditMap from '../MapsApi/EditMap'

import BudgetRange from '../../Comps/BudgetRange/BudgetRange'
import TripService from '../../Services/TripService'
import MapService from '../../Services/MapService'
import { loadTrip, saveTrip } from '../../Actions/TripActions'
import LocationSearchInput from '../MapsApi/LocationSearchInput'
import { GoogleApiConfig } from '../../Services/GoogleApiConfig'

class TripEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {itinerary:[], country:''}
        this.tripTypes = []
        this.tripId = this.props.match.params.id
    }

    componentDidMount() {
        //need to follow url change!!
        if (!this.props.user._id) this.props.history.push('/')
        
        this.tripTypes = TripService.getTripTypes()
        if (!this.tripId) {
            const tripToEdit = TripService.getEmpty()
            this.setState({...tripToEdit})
        } else {
            this.props.loadTrip(this.tripId)
            .then(() => {
                if (this.props.user._id !== this.props.trip.organizer._id) {
                    this.props.history.push('/')
                } else this.setState({...this.props.trip})
            })  
        }
    }

    componentWillUnmount() {
        this.props.loadTrip(null)
    }


    handleInput = (ev) => {
        if (ev.target.value) this.setState({[ev.target.name]:ev.target.value})
        else this.setState({[ev.target.name]:''})
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        var stateToSave = {...this.state}
        this.props.saveTrip(stateToSave, this.props)
    }
    
    addToItinerary = (newPlace) => {
        
        MapService.getPlaceInfo(newPlace)
        .then (placeInfo => {
            var itinerary = this.state.itinerary
            itinerary.push(placeInfo)            
            this.setState({itinerary})
        })
        
    }
    
    
    removeFromItinerary = (ev) => {
        ev.preventDefault()
        // ev.stopPropagation() 
        var itinerary = this.state.itinerary
        const idxToRemove = itinerary.findIndex(place => {
            return place.place_id === ev.target.getAttribute('value')
        })
        itinerary.splice(idxToRemove, 1)
        this.setState({itinerary})
    }

    // "country": "",
    // "city": "",
    // "budget": "",
    // "type": "",
    // "max-members": "",
    // "organizer": {},
    // "members": [],
    // "status": "open",
    // "createdAt":"",
    // "likes": "1",
    // "tripDate":"",
    // "itinerary": [],
    // "imgs": []
    render() {
        const tripTypseMap = this.tripTypes.map((option, idx) => {
            if (this.state.type === option) {
                return <option name={option} value={option} 
                            key={idx} selected>{option}
                        </option>
            } else return <option name={option} value={option} key={idx}>{option}</option>
        })

        if (this.state.itinerary && this.state.itinerary.length) {
            var itineraryMap = this.state.itinerary.map(place => {
                return <div className="place-container" key={place.place_id}>
                            <span>{place.name}</span>
                            <i className="far fa-minus-square remove" 
                                    value={place.place_id}
                                    onClick={this.removeFromItinerary}>
                            </i>
                        </div>
            })
        }
        return (
        <form>
            <input type="text" name="country" 
                value={this.state.country}
                placeholder="Country" 
                onChange={this.handleInput}/>

            {this.state.itinerary && 
            <div className="itinerary-container flex">
                <div>
                    {itineraryMap}
                    <LocationSearchInput onAddToItinerary={this.addToItinerary}/>
                </div>
                {this.state.itinerary.length &&
                <div className="map-wrapper-edit">
                    <EditMap className="map-container"
                            country={this.state.country} //should be countryCoords i ncase itenery is empty
                            itinerary={this.state.itinerary}
                            google={this.props.google}>
                    </EditMap>
                </div>}
            </div>}
            <select name="type"  placeholder="type" 
                    onChange={this.handleInput}>
                    {tripTypseMap}
            </select>
            {this.state.budget && 
            <BudgetRange budget={this.state.budget} onSetBudget={budget => this.setState({budget:budget})}></BudgetRange>}
            
            <button onClick={this.handleSubmit}>Save</button>
        </form>)
    }
}

function mapStateToProps (state) {
    return { trip: state.trip.currTrip, user:state.user }
}

const mapDispatchToProps = {loadTrip, saveTrip}



  
export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper(GoogleApiConfig)(TripEdit))

