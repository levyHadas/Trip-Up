import React, { Component } from 'react'
import { connect } from 'react-redux'

import BudgetRange from '../../Comps/BudgetRange/BudgetRange'
import TripService from '../../Services/TripService'
import { loadTrip, saveTrip } from '../../Actions/TripActions'

class TripEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.tripTypes = []
        this.tripId = this.props.match.params.id
    }

    componentDidMount() {
        //need to follow url change!!
        if (!this.props.user._id) this.props.history.push('/')
        else {
            this.tripTypes = TripService.getTripTypes()
            if (this.tripId) {
                this.props.loadTrip(this.tripId)
                .then(() => {
                    if (this.props.user._id !== this.props.trip.organizer._id) {
                        this.props.history.push('/')
                    } else this.setState({...this.props.trip})
                })
       
            } else {
                const tripToEdit = TripService.getEmpty()
                this.setState({...tripToEdit})
            }
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
        this.props.saveTrip({...this.state}, this.props)
    }
    
    addToItinerary = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        var itinerary = this.state.itinerary
        itinerary.push(this.state.itineraryPlace)
        this.setState({itinerary})
    }
    
    removeFromItinerary = (ev) => {
        ev.preventDefault()
        // ev.stopPropagation()
        console.log(ev.target.value)
        var prevItinerary = this.state.itinerary
        prevItinerary.splice(ev.target.value, 1)
        console.log(prevItinerary)
        this.setState({itinerary:prevItinerary})
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
                return <option name={option} value={option} key={idx} selected>{option}</option>
            }
            return <option name={option} value={option} key={idx}>{option}</option>
        })
        if (this.state.itinerary && this.state.itinerary.length) {
            var itineraryMap = this.state.itinerary.map((place, idx) => {
                return <div className="place-container" key={idx}>
                            <span>{place}</span>
                            {/* <i class="far fa-minus-square"></i> */}
                            <i className="far fa-minus-square remove" 
                                    value={idx}
                                    onClick={this.removeFromItinerary}>
                            </i>
                        </div>
            })
        }
        return (
            <section className="trip-edit">
                <form>
                    {(this.state.country ||  this.state.country === '') 
                    && <input type="text" name="country" 
                    value={this.state.country}
                    placeholder="Country" 
                    onChange={this.handleInput}/> } 

                    {this.state.itinerary && 
                    <div className="itinerary-container">
                        {itineraryMap}
                        <input type="text" name="itineraryPlace"  
                        placeholder="Itinerary Places"
                        onChange={this.handleInput}/> 
                        <i className="far fa-plus-square" onClick={this.addToItinerary}></i>
                    </div>}
                    <select name="type"  placeholder="type" 
                            onChange={this.handleInput}>
                            {tripTypseMap}
                    </select>
                    {this.state.budget && 
                    <BudgetRange budget={this.state.budget} onSetBudget={budget => this.setState({budget:budget})}></BudgetRange>}
                    <button onClick={this.handleSubmit}>Save</button>
                </form>
            </section>)
    }
}

function mapStateToProps (state) {
    return { trip: state.trip.currTrip, user:state.user }
}

const mapDispatchToProps = {loadTrip, saveTrip}

export default connect(mapStateToProps, mapDispatchToProps)(TripEdit)
