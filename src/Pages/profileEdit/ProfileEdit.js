
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { saveUser } from '../../actions/userActions'

 

import './profileEdit.scss'



class UserEdit extends Component {
    
    state = {}

    componentDidMount() {
        console.log(this.props.user._id)
        console.log(this.props.match.params.id)
        if (!this.props.user._id || this.props.user._id !== this.props.match.params.id) {
            this.props.history.push('/')
        }
        this.setState({...this.props.user})
    }

 
  

    handleInput = (ev) => {
        // this.setState({ tripDateErr: false })
        if (ev.target.value) {
            var value = (isNaN(ev.target.value)) ? ev.target.value : +ev.target.value
            this.setState({[ev.target.name]:value})
        }
        else this.setState({[ev.target.name]:''})
    }
    handleSubmit = (ev) => {
        // var userToSubmit = {...this.state}
        // delete tripToSubmit.tripDateErr 
        // delete tripToSubmit.itineraryErr 
        // this.props.saveUser(userToSubmit)
        if (ev) ev.preventDefault()
        this.props.saveUser({...this.state})
            .then(() => this.props.history.push(`/user/${this.props.user._id}`))
    }
  
    
    render() {
 
        return (
        <section className = "user-edit flex column">
            {this.state._id &&
            <Fragment>
                <h1>User Edit</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="fName" 
                        value={this.state.fName} 
                        placeholder="Name"
                        onChange={this.handleInput}/>
                    <input type="text" name="sName" 
                        value={this.state.sName} 
                        placeholder="Surname"
                        onChange={this.handleInput}/>
                    <button>Save</button>
                </form>

            </Fragment>}
        </section>)
    }
}

function mapStateToProps (state) {
    return { user:state.user, loading:state.util.loading }
}

const mapDispatchToProps = {saveUser}
    
export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
