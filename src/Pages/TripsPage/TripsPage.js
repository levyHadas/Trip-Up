import { connect } from 'react-redux'
import React, { PureComponent } from 'react'

import { saveUser } from '../../actions/userActions'
import { loadTrips, updateTripLikes } from '../../actions/tripActions'
import TripList from '../../components/tripList/TripList'
import FilterBy from '../../components/filterBy/FilterBy'
import './TripsPage.scss'


class TripPage extends PureComponent {
    
    componentDidMount() {
        this.props.loadTrips()
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
                    saveUser={this.props.saveUser}
                    updateTripLikes={this.props.updateTripLikes}/>}
            <div className="app-bg-img"></div>
            </section>
        )
    }
}

function mapStateToProps (state) {
    return { trips: state.trip.trips, loading:state.util.loading, user:state.user }
}
const mapDispatchToProps = {loadTrips, updateTripLikes, saveUser}

export default connect(mapStateToProps, mapDispatchToProps)(TripPage)
