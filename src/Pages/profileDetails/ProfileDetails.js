
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import userService from '../../services/userService'
import tripService from '../../services/tripService'
import TripList from '../../components/tripList/TripList'
import IncomingRequestsList from '../../components/incomingRequestsList/IncomingRequestsList'

import { reloadTrip } from '../../actions/tripActions'

import './profileDetails.scss'
import requestService from '../../services/requestService'



class MemberDetails extends Component {
    
    state = { loading:true }

    async componentDidMount() {
        var profile = await userService.getById(this.props.match.params.id)
        profile.trips = await tripService.query({tripsIds:profile.trips})
        var requestsPromises = profile.incomingRequests.map(async(request) => {
            const memberAndTripPromises = await Promise.all([userService.getById(request.memberId), tripService.getById(request.tripId)])
            const memberRequesting = memberAndTripPromises[0]
            const tripRequested = memberAndTripPromises[1]
            var detailedRequest = 
                {   ...request, 
                    memberName: memberRequesting.name || memberRequesting.username,
                    memberImg: memberRequesting.img,
                    tripCountry: tripRequested.country
                } 
            return detailedRequest
        })
        var detailedRequests = await Promise.all(requestsPromises)
        profile.incomingRequests = detailedRequests
        this.setState({ ...profile })
    }

    setRequestReply = async(ev) => {
        let incomingRequests = [...this.state.incomingRequests]
        let requestIdx = incomingRequests.findIndex(request => request._id === ev.target.name)
        incomingRequests[requestIdx].status = ev.target.value
        this.setState({incomingRequests})
        await requestService.saveNewStatus(incomingRequests[requestIdx])
        // in request service - socketService.emit('new-reply')
    }

    render() {
        const profileUser = {...this.state}
        delete profileUser.loading 
        const linkToEdit =`/user/edit/${this.state._id}`
        return (
        <section className = "profile-details flex column">
            {!this.state.loading &&
            <Fragment>
                {this.state._id === this.props.user._id &&
                <Link to={linkToEdit}><i className="far fa-edit"></i></Link>}
                <h1>{this.state.fName} {this.state.sName} Profile</h1>
                <img className="profile-img" src={this.state.img} alt="user"/>
                {this.state.interests && <h4>Interests: {this.state.interests.join(', ')}</h4>}
                <h3>Added Trips:</h3>
                <TripList trips={this.state.trips} user={profileUser}/>
            </Fragment>}
            {this.state._id === this.props.user._id && this.state.incomingRequests && 
                <IncomingRequestsList 
                    requests={this.state.incomingRequests}
                    onSetRequestReply={this.setRequestReply}/>
            }
        </section>)
    }
}

function mapStateToProps (state) {
    return { user:state.user, currTrip:state.trip.currTrip }
}

const mapDispatchToProps = { reloadTrip }

    
export default connect(mapStateToProps, mapDispatchToProps)(MemberDetails)
