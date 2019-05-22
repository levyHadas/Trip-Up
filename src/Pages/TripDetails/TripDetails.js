
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadTrip, deleteTrip, updateTripLikesMembers } from '../../Actions/TripActions'
import { saveUser } from '../../Actions/UserActions'
import { updateLikeJoin } from '../../Services/GlobalFunctions'
import UtilService from '../../Services/UtilService'

import './TripDetails.scss'
import MapContainer from '../MapContainer/MapContainer';

class TripDetails extends PureComponent {
    constructor(props) {
        super(props)
        this.deleteTrip = this.deleteTrip.bind(this)
        this.goBack = this.goBack.bind(this)
        this.handleLikeJoin = this.handleLikeJoin.bind(this)
        this.tripId = this.props.match.params.id
    }
    
    componentDidMount() {
        this.props.loadTrip(this.tripId)
    }

    deleteTrip () {
        this.props.deleteTrip(this.tripId, this.props)
    }


    goBack() {
        this.props.history.goBack()
    }

    handleLikeJoin(ev) {
        updateLikeJoin(ev.target.getAttribute('data-action-type'), this.props.user, this.props.trip)
        this.props.saveUser(this.props.user)
        this.props.updateTripLikesMembers(this.props.trip)
    }
    
    render() {
        const trip = this.props.trip
        const linkToEdit =`/trip/edit/${this.tripId}`
        
        return (
        <section className = "trip-details flex column">
            <button className="back" onClick={this.goBack}>Back</button>
            <div className="details-actions-container flex space-between">
                <div className="info-container">
                    <p className="tripInfo">Country: {trip.country}</p>
                    {trip.city && <p className="tripInfo">City: {trip.city}</p>}
                    <p className="tripInfo">Type: {UtilService.getIconForType(trip.type)}</p>
                </div>
                <div className="actions-container flex space-between">
                    <span data-action-type="like" onClick={this.handleLikeJoin}>
                        {trip.likes}
                        <i className="far fa-thumbs-up" title="like" data-action-type="like"></i>
                    </span>
                    {trip.members &&
                    <span data-action-type="join" onClick={this.handleLikeJoin}>
                        {trip.members.length}
                        <i className="fas fa-user-plus" title="Join" data-action-type="join"></i>
                    </span>}
                    {trip.organizer && this.props.user._id === trip.organizer._id &&
                    <span>
                        <Link to={linkToEdit}><i className="far fa-edit"></i></Link>
                        <i className="far fa-trash-alt"onClick={this.deleteTrip}></i>
                    </span>}
                </div>
            </div>
            <div className="img-container">
                {trip.imgs &&
                <img className="trip-img" src={trip.imgs[0]} alt="Trip"/>}
            </div>
            <MapContainer itinerary={trip.itinerary} country={trip.country}></MapContainer>
        </section>)
    }
}

function mapStateToProps (state) {
    return { trip: state.trip.currTrip, user:state.user }
}

const mapDispatchToProps = {loadTrip, deleteTrip, updateTripLikesMembers, saveUser}
    
export default connect(mapStateToProps, mapDispatchToProps)(TripDetails)