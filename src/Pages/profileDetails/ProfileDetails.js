
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import userSevice from '../../services/userService'
import TripList from '../../components/tripList/TripList'
import IncomingRequestsList from '../../components/incomingRequestsList/IncomingRequestsList'



import './profileDetails.scss'
import tripService from '../../services/tripService';
import { updateJoinRequest } from '../../services/likeJoinService'



class MemberDetails extends Component {
    
    state = { loading:true }

    async componentDidMount() {
        var profile = await userSevice.getById(this.props.match.params.id)
        profile.trips = await tripService.query({tripsIds:profile.trips})
        this.setState({ ...profile, loading:false })
    }

    updateRequestStatus = (ev) => {
        let request = this.state.incomingRequests.find(request => request.tripId = ev.target.name)
        request.status = ev.target.value
        updateJoinRequest(request, this.state._id)
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
                    onUpdateRequestStatus={this.updateRequestStatus}/>
            }
        </section>)
    }
}

function mapStateToProps (state) {
    return { user:state.user }
}

    
export default connect(mapStateToProps)(MemberDetails)
