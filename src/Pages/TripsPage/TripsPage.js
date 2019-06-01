import { connect } from 'react-redux'
import React, { PureComponent } from 'react'

import { updateUserLikesTrips } from '../../Actions/UserActions'
import { updateLikeJoin } from '../../Services/GlobalFunctions'
import { loadTrips, updateTripLikesMembers } from '../../Actions/TripActions'
import TripList from '../../Comps/TripList/TripList'
import TripService from '../../Services/TripService'
import './TripsPage.scss'


class TripPage extends PureComponent {
    
    componentDidMount() {
        this.props.loadTrips({})
    }
 
  

    onUpdateLikeJoin = async(ev) => {
        const actionType = ev.target.getAttribute('data-action-type')
        const tripId = ev.target.getAttribute('data-trip-id')
        const trip = await TripService.getById(tripId) 
        
        updateLikeJoin(actionType, this.props.user, trip)
        this.props.updateUserLikesTrips(this.props.user)
        this.props.updateTripLikesMembers(trip)
    
    }
    
    render() {
        return (
            <section className="trips">
                {!this.props.loading && 
                <TripList trips={this.props.trips} user={this.props.user} 
                    onUpdateLikeJoin={this.onUpdateLikeJoin}/>}
            <div className="app-bg-img"></div>
            </section>
        )
    }
}

function mapStateToProps (state) {
    return { trips: state.trip.trips, loading:state.util.loading, user:state.user }
}
const mapDispatchToProps = {loadTrips, updateUserLikesTrips, updateTripLikesMembers}

export default connect(mapStateToProps, mapDispatchToProps)(TripPage)
