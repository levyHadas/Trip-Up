
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { updateTripLikesMembers } from '../../Actions/TripActions'
import { saveUser } from '../../Actions/UserActions'


class TripDetails extends PureComponent {
    constructor(props) {
        super(props)
        console.log(this.props.trip)
        this.handleLikeJoin = this.handleLikeJoin.bind(this)
    }

    handleLikeJoin(ev) {
        console.log(ev)
        ev.preventDefault()
        ev.stopPropagation()
        if (eval.name === 'like') {
            if (this.props.user.likes.some((liked) => liked === this.props.trip._id)) return;
            this.props.user.likes.unshift(this.props.trip._id)
            this.props.trip.likes++
        }
        else {
            if (this.props.user.trips.some(trip => trip === this.props.trip._id)) return;
            this.props.user.trips.unshift(this.props.trip._id)
            this.props.trip.members.unshift(this.props.user._id)
        }
        this.props.saveUser(this.props.user)
        this.props.updateTripLikesMembers(this.props.trip)
    }
    render() {
        console.log('rendered small')
        return (
            <div className="temp-container">
                <span>{this.props.trip.members.length}</span>
                <i className="fas fa-users" 
                    title="Participants" 
                    name="join"
                    onClick={this.handleLikeJoin}></i>
    
                <span>{this.props.trip.likes.length}</span>
                <i className="far fa-thumbs-up" 
                    title="Like" 
                    name="like"
                    onClick={this.handleLikeJoin}></i>    
            </div>
        )
    }
}

const mapDispatchToProps = {updateTripLikesMembers, saveUser}
    
export default connect(null, mapDispatchToProps)(TripDetails)