
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
    
    state = { loading:true, newProfile:false }

    componentDidMount() {
        this._loadProfile()
            .then(newState => this.setState({ ...newState, reloadProfile:this._loadProfile }))
    }

    _loadProfile = async() => {
        var profile = await userService.getById(this.props.match.params.id)
        profile.trips = await tripService.query({ tripsIds:profile.trips })
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
        return { ...profile, loading:false }
    }

    setRequestReply = async(ev) => {
        let incomingRequests = [...this.state.incomingRequests]
        let requestIdx = incomingRequests.findIndex(request => request._id === ev.target.name)
        incomingRequests[requestIdx].status = ev.target.value
        this.setState({incomingRequests})
        requestService.saveNewStatus(incomingRequests[requestIdx]) //async
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this._loadProfile()
                .then(newState => this.setState({...newState}))
        }
    }
  
    render() {
        const profileUser = {...this.state}
        const linkToEdit =`/user/edit/${this.state._id}`
        return (
        <section className = "profile-details flex column align-center">
            {!this.state.loading &&
            <Fragment>
                <img className="profile-img margin-center" src={this.state.img} alt="user"/>
                <div className="profile-header flex align-center">
                    <h1>{this.state.fName} {this.state.sName}</h1>
                    {this.state._id === this.props.user._id &&
                    <Link to={linkToEdit}><i className="far fa-edit"></i></Link>}
                </div>
                {this.state._id === this.props.user._id && this.state.incomingRequests && 
                <IncomingRequestsList 
                requests={this.state.incomingRequests}
                onSetRequestReply={this.setRequestReply}/>}
                {this.state.interests && <h4>Interests: {this.state.interests.join(', ')}</h4>}
                <h3>
                    {(this.state._id === this.props.user._id) ? 
                        'Your' : this.state.fName} Trips:
                </h3>
                <TripList trips={this.state.trips} user={profileUser}/>
                
            </Fragment>}
        </section>)
    }
}

function mapStateToProps (state) {
    return { user:state.user, currTrip:state.trip.currTrip }
}

const mapDispatchToProps = { reloadTrip }

    
export default connect(mapStateToProps, mapDispatchToProps)(MemberDetails)
