
import React, { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadTrip, deleteTrip, updateTripLikesMembers } from '../../actions/tripActions'
import { saveUser } from '../../actions/userActions'
import { updateLikeJoin } from '../../services/likeJoinService'
import UtilService from '../../services/utilService'

import './TripDetails.scss'
import MapContainer from '../../components/googleMaps/MapContainer'
import ImgGallery from '../../components/imgGallery/ImgGallery'
import TripService from '../../services/tripService';


class TripDetails extends PureComponent {
    constructor(props) {
        super(props)
        this.deleteTrip = this.deleteTrip.bind(this)
        this.goBack = this.goBack.bind(this)
        this.handleLikeJoin = this.handleLikeJoin.bind(this)
        this.tripId = this.props.match.params.id
        this.props.loadTrip(this.tripId)
    }
    
    componentDidMount() {
        this.props.loadTrip(this.tripId)
        .then(() => {})
    }

    componentWillUnmount() {
        this.props.loadTrip(null)
    }

    deleteTrip () {
        this.props.deleteTrip(this.tripId, this.props)
    }


    goBack() {
        this.props.history.goBack()
    }

    handleLikeJoin(ev) {
        const actionType = ev.target.getAttribute('data-action-type')
        updateLikeJoin(actionType, this.props.user, this.props.trip)
        this.props.saveUser(this.props.user)
        this.props.updateTripLikesMembers(this.props.trip)
    }
    
    render() {
        if (this.props.trip.itinerary) var tripImgs = TripService.getTripImgs(this.props.trip)
        const linkToEdit =`/trip/edit/${this.tripId}`
        if (this.props.trip.itinerary && this.props.trip.itinerary.length) {
            var itineraryList = this.props.trip.itinerary.map((place, idx) => {
                if (idx === this.props.trip.itinerary.length-1) {
                    return <span key={idx}>{place.name}</span>
                }
                return <span key={idx}>{place.name}, </span>
            })
        }
        return (
        <section className = "trip-details flex column">
            {/* <button className="back" onClick={this.goBack}>Back</button> */}
            <div className="title-actions-container flex">
                <h2 className="trip-title">{this.props.trip.country}</h2>
                {this.props.user && this.props.trip.organizer &&
                <div className="actions-container flex space-between">
                    {this.props.user._id && this.props.user._id !== this.props.trip.organizer._id &&
                    <Fragment>
                        <span data-action-type="like" onClick={this.handleLikeJoin}>
                            {this.props.trip.likes}
                            <i className="far fa-thumbs-up" title="like" data-action-type="like"></i>
                        </span>
                        <span data-action-type="join" onClick={this.handleLikeJoin}>
                            <i className="fas fa-user-plus" title="Join" data-action-type="join"></i>
                        </span>
                    </Fragment>}
                    {this.props.user._id === this.props.trip.organizer._id &&
                    <Fragment>
                    <span data-action-type="like">
                        {this.props.trip.likes}
                        <i className="far fa-thumbs-up no-user" title="like" data-action-type="like"></i>
                    </span>
                    <span>
                        <Link to={linkToEdit}><i className="far fa-edit"></i></Link>
                        <i className="far fa-trash-alt"onClick={this.deleteTrip}></i>
                    </span>
                    </Fragment>}
          
                </div>}
            </div>
                
            {this.props.trip.organizer && this.props.trip.members &&
            <Fragment>
            <div className="main-info-container flex align-center space-between">
                {UtilService.getIconForType(this.props.trip.type)}
                <span> | </span>
                <i className="fas fa-users" title="Members"></i>
                <span> {this.props.trip.members.length} / {this.props.trip.maxMembers}</span>
                <span> | </span>
                <div>{this.props.trip.tripDate}</div>
                <span> | </span>
                <span>By:</span>
                {/* <p className="organizer-name">By: {this.props.trip.organizer.username} </p> */}
                <img className="organizer-img" src={this.props.trip.organizer.img} alt="User"/>
            </div>
            <div className="more-info-container flex column">
                {/* <p>Description: {this.props.trip.desc}</p> */}
                <span className="trip-info"><h4>Itinerary:</h4> {itineraryList}.</span>
            </div>

            {tripImgs &&
            <div className="img-container">
                <ImgGallery imgs={tripImgs}/>
            </div>}
            </Fragment>}
            {this.props.trip.itinerary &&
            <div className="map-wrapper-details">
                <MapContainer className="map-container"
                    trip={this.props.trip} 
                    itinerary={this.props.trip.itinerary} 
                    zoom={7} />
            </div>}
            <div className="app-bg-img"></div>
        </section>)
    }
}

function mapStateToProps (state) {
    return { trip: state.trip.currTrip, user:state.user, loading:state.util.loading }
}

const mapDispatchToProps = {loadTrip, deleteTrip, updateTripLikesMembers, saveUser}
    
export default connect(mapStateToProps, mapDispatchToProps)(TripDetails)