
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './TripDetails.scss'
import UtilService from '../../services/utilService'
import TripService from '../../services/tripService'

import { loadTrip, deleteTrip, updateTripLikes, loadTripMembers } from '../../actions/tripActions'
import { saveUser } from '../../actions/userActions'

import MapContainer from '../../components/googleMaps/MapContainer'
import ImgGallery from '../../components/imgGallery/ImgGallery'
import MembersList from '../../components/membersList/MembersList'
import JoinBtn from '../../components/joinBtn/JoinBtn'
import LikeBtn from '../../components/likeBtn/LikeBtn'





class TripDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {showMembers:false}
        this.deleteTrip = this.deleteTrip.bind(this)
        this.backToTrips = this.backToTrips.bind(this)
        this.showMembers = this.showMembers.bind(this)
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


    backToTrips() {
        // this.props.history.goBack()
        this.props.history.push('/trip')
    }

    showMembers() {
        //check if we already load members, if not. load them
        if (this.props.trip.members && typeof(this.props.trip.members[0]) === 'string') {
            this.props.loadTripMembers(this.props.trip)
        }
        this.setState({showMembers:true})
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
        const linkToOrganizerProfile = `/user/${this.props.user._id}`
        return (
        <section className = "trip-details flex column">
            
            <i className="fas fa-long-arrow-alt-left back" 
                onClick={this.backToTrips} title="Trips">
            </i>
            <div className="title-actions-container flex">
                <h2 className="trip-title">{this.props.trip.country}</h2>
                {this.props.user && this.props.trip.organizer &&
                <div className="actions-container flex space-between">
                    {this.props.user._id &&
                    <Fragment>
                        <LikeBtn userLiking={this.props.user} tripToLike={this.props.trip}
                            saveUser={this.props.saveUser} updateTripLikes={this.props.updateTripLikes}/>
                        <JoinBtn userRequesting={this.props.user} tripToRequest={this.props.trip}/>
                    </Fragment>}
                    {this.props.user._id === this.props.trip.organizer._id &&
                    <span>
                        <Link to={linkToEdit}><i className="far fa-edit"></i></Link>
                        <i className="far fa-trash-alt"onClick={this.deleteTrip}></i>
                    </span>}
          
                </div>}
            </div>
                
            {this.props.trip.organizer && this.props.trip.members &&
            <Fragment>
            <div className="main-info-container flex align-center space-between">
                {UtilService.getIconForType(this.props.trip.type)}
                <span> | </span>
                <div className="num" title="Trip Date">
                    {UtilService.toDatePickerFormat(this.props.trip.tripDate)}
                </div>
                <span> | </span>
                <span className="see-members" onClick={this.showMembers}> 
                    <i className="fas fa-users" title="See who joined"> </i>
                    <span className="num">
                        {' ' +  this.props.trip.members.length} / {this.props.trip.maxMembers}
                    </span>
                </span>
                {this.state.showMembers && !this.props.loading &&
                <MembersList members={this.props.trip.members} 
                    hideMembers={() => this.setState({ showMembers:false })}/>}
                <span> | </span>
                <span title="Organizer">By:</span>
                <Link to={linkToOrganizerProfile}>
                    <img className="organizer-img" src={this.props.trip.organizer.img} alt="User"/>
                </Link>
            </div>
            <div className="more-info-container flex column">
                <p title="Description">{this.props.trip.desc || ' '}</p>
                
            </div>

            {tripImgs &&
            <div className="img-container">
                <ImgGallery imgs={tripImgs}/>
            </div>}
            </Fragment>}
            <div className="itinerary-container">
                <h2>Trip Itinerary:</h2>
                <p className="trip-info">{itineraryList}.</p>
                <p>See places on map. Click the map markes to see place info.</p>
            </div>
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

const mapDispatchToProps = {loadTrip, deleteTrip, saveUser, updateTripLikes, loadTripMembers}
    
export default connect(mapStateToProps, mapDispatchToProps)(TripDetails)