
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadTrip, deleteTrip, updateTripLikesMembers } from '../../Actions/TripActions'
import { saveUser } from '../../Actions/UserActions'
import { updateLikeJoin } from '../../Services/GlobalFunctions'
import UtilService from '../../Services/UtilService'

import './TripDetails.scss'
import DetailsMap from '../MapsApi/DetailsMap'
import ImgGallery from '../../Comps/ImgGallery/ImgGallery'


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
        .then(() => {
            // this.imgs = this.props.trip.itinerary[0].photos[0].html_attributions
            // console.log(this.imgs)
            // console.log(this.props.trip.itinerary[0].photos[0].photo_reference)
            //map imgs with photo_reference
            //https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=YOUR_API_KEY

        })
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
        const linkToEdit =`/trip/edit/${this.tripId}`
        return (
        <section className = "trip-details flex column">
            <button className="back" onClick={this.goBack}>Back</button>
            <div className="details-actions-container flex space-between">
                <div className="info-container">
                    <p className="tripInfo">Country: {this.props.trip.country}</p>
                    {this.props.trip.city && 
                    <p className="tripInfo">City: {this.props.trip.city}</p>}
                    <p className="tripInfo">
                        Type: {UtilService.getIconForType(this.props.trip.type)}
                    </p>
                </div>
                <div className="actions-container flex space-between">
                    <span data-action-type="like" onClick={this.handleLikeJoin}>
                        {this.props.trip.likes}
                        <i className="far fa-thumbs-up" title="like" data-action-type="like"></i>
                    </span>
                    {this.props.trip.members &&
                    <span data-action-type="join" onClick={this.handleLikeJoin}>
                        {this.props.trip.members.length}
                        <i className="fas fa-user-plus" title="Join" data-action-type="join"></i>
                    </span>}
                    {this.props.trip.organizer && 
                     this.props.user._id === this.props.trip.organizer._id &&
                    <span>
                        <Link to={linkToEdit}><i className="far fa-edit"></i></Link>
                        <i className="far fa-trash-alt"onClick={this.deleteTrip}></i>
                    </span>}
                </div>
            </div>
            <div className="img-container">
                {this.props.trip.imgs &&
                <ImgGallery imgs={this.props.trip.imgs}/>}
            </div>
            {this.props.trip.country &&
            <div className="map-wrapper-details">
                <DetailsMap trip={this.props.trip} className="map-container"/>
            </div>}
        </section>)
    }
}

function mapStateToProps (state) {
    return { trip: state.trip.currTrip, user:state.user, loading:state.util.loading }
}

const mapDispatchToProps = {loadTrip, deleteTrip, updateTripLikesMembers, saveUser}
    
export default connect(mapStateToProps, mapDispatchToProps)(TripDetails)