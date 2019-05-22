import React, { Component } from 'react'
import { connect } from 'react-redux'


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
        if (!this.props.user._id) this.props.history.push('/')
        else {
            this.tripTypes = TripService.getTripTypes()
            if (this.tripId) {
                this.props.loadTrip(this.tripId)
                    .then(tripToEdit => {
                        this.setState({...tripToEdit})
                        if (this.props.user._id !== this.props.trip.organizer._id) {
                            this.props.history.push('/')
                        }
                    })
            } else {
                const tripToEdit = TripService.getEmpty()
                this.setState({...tripToEdit})
            }
        }
    }

    handleInput = (ev) => {
        if (ev.target.value) this.setState({[ev.target.name]:ev.target.value})
        else this.setState({[ev.target.name]:''})

        
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        this.props.saveTrip({...this.state}, this.props)
    }


    render() {
        const tripTypseMap = this.tripTypes.map(option => {
            if (this.state.type === option) {
                return <option name={option} value={option} selected>{option}</option>
            }
            return <option name={option} value={option}>{option}</option>
        })
        return (
            <section className="trip-edit">
                <form>
                    {(this.state.country ||  this.state.country === '') 
                    && <input type="text" name="country" 
                        value={this.state.country}
                        placeholder="Country" 
                        onChange={this.handleInput}/> } 

                    {(this.state.city ||  this.state.city === '') 
                    && <input type="text" name="city"  
                        value={this.state.city}
                        placeholder="cCity" 
                        onChange={this.handleInput}/> } 

                    <select name="type"  placeholder="type" onChange={this.handleInput}>
                        {tripTypseMap}
                    </select>

                    {(this.state.budget ||  this.state.budget === '') 
                    && <input type="number" 
                            placeholder="Budget" 
                            name="budget" 
                            onChange={this.handleInput}
                            value={this.state.budget}/> }
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
