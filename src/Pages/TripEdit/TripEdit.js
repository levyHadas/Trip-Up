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
        this.state = {itineraryCoords:[], country:''}
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
            .then(() => {
                MapService.itineraryToCoords(this.props.google, this.props.trip)
                    .then(itineraryCoords => this.setState({itineraryCoords}))
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
        delete stateToSave.itineraryCoords
        this.props.saveTrip(stateToSave, this.props)
    }
    
    addToItinerary = (newPlace) => {
        var itinerary = this.state.itinerary
        itinerary.push(newPlace)
        this.setState({itinerary})
        MapService.itineraryToCoords(this.props.google, this.props.trip)
            .then(itineraryCoords => this.setState({itineraryCoords}))
    }
    
    
    removeFromItinerary = (ev) => {
        ev.preventDefault()
        // ev.stopPropagation()
        var itinerary = this.state.itinerary
        itinerary.splice(ev.target.getAttribute('value'), 1)
        this.setState({itinerary})
        MapService.itineraryToCoords(this.props.google, this.props.trip)
            .then(itineraryCoords => this.setState({itineraryCoords}))
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
            var itineraryMap = this.state.itinerary.map((place, idx) => {
                return <div className="place-container" key={idx}>
                            <span>{place}</span>
                            <i className="far fa-minus-square remove" 
                                    value={idx}
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
                {this.state.itineraryCoords.length &&
                <div className="map-wrapper-edit">
                    <EditMap itinerary={this.state.itineraryCoords} 
                            country={this.state.country}
                            className="map-container"
                            google={this.props.google}
                            zoom={5}>
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

// export default connect(mapStateToProps, mapDispatchToProps)(TripEdit)
