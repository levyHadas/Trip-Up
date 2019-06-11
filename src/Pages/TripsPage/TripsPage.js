import { connect } from 'react-redux'
import React, { PureComponent } from 'react'

import { updateUserLikesTrips } from '../../actions/userActions'
import { updateLikeJoin } from '../../services/likeJoinService'
import { loadTrips, saveTripMembersAndLikes } from '../../actions/tripActions'
import TripList from '../../components/tripList/TripList'
import FilterBy from '../../components/filterBy/FilterBy'
import tripService from '../../services/tripService'
// import userService from '../../services/userService'
import './TripsPage.scss'


class TripPage extends PureComponent {
    
    componentDidMount() {
        // this.props.loadTrips({})
        this.props.loadTrips()
    }
 
  

    onUpdateLikeJoin = async(ev) => {
        const actionType = ev.target.getAttribute('data-action-type')
        const tripId = ev.target.getAttribute('data-trip-id')
        const trip = await tripService.getById(tripId) 
        
        updateLikeJoin(actionType, this.props.user, trip)
        this.props.updateUserLikesTrips(this.props.user)
        this.props.saveTripMembersAndLikes(trip)    
    }
    filterTrips = (filterBy) => {
        this.props.loadTrips(filterBy)
    }
    
    render() {
        return (
            <section className="trips">
                <FilterBy filterTrips={this.filterTrips}/>
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
const mapDispatchToProps = {loadTrips, updateUserLikesTrips, saveTripMembersAndLikes: saveTripMembersAndLikes}

export default connect(mapStateToProps, mapDispatchToProps)(TripPage)
