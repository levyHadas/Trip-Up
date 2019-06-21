
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { saveUser, loadUser } from '../../actions/userActions'

 

import './profileEdit.scss'



class UserEdit extends Component {
    
    state = {}

    async componentDidMount() {
        await this.props.loadUser()
        if (!this.props.user._id || this.props.user._id !== this.props.match.params.id) {
            this.props.history.push('/')
        }
        if (!this.props.user.interests) this.props.user.interests = []
        if (!this.props.user.media) this.props.user.media = []
        this.setState({...this.props.user, interests:this.props.user.interests.join(', ')})
    }

 
  

    handleInput = (ev) => {
        if (ev.target.value) {
            var value = (isNaN(ev.target.value)) ? ev.target.value : +ev.target.value
            this.setState({[ev.target.name]:value})
        }
        else this.setState({[ev.target.name]:''})
    }
    handleSubmit = (ev) => {
        if (ev) ev.preventDefault()
        var profileToSave = {...this.state}
        profileToSave.interests = this.handlListInput(profileToSave.interests)
        this.props.saveUser(profileToSave)
            .then(() => this.props.history.push(`/user/${this.props.user._id}`))
    }
    
    handlListInput = (strInputs) => {
        if (!strInputs) return []
        let values = strInputs.split(',')
        values = values.map(input => input.trim())
        return values
        
    }
   
    
    render() {
        return (
        <section className = "user-edit flex column">
            {this.state._id &&
            <Fragment>
                <h1>Profile Edit - {this.state.fName || this.state.username}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="fName" 
                        value={this.state.fName} 
                        placeholder="Name"
                        onChange={this.handleInput}
                        required/>
                    <input type="text" name="sName" 
                        value={this.state.sName} 
                        placeholder="Surname"
                        onChange={this.handleInput}/>
                    <input type="text" name="interests" 
                        value={this.state.interests} 
                        placeholder="Add Interests (comma separated)"
                        onChange={this.handleInput}/>
                    {/* <input type="url"  
                        value={this.state.media} 
                        placeholder="Add you favorite video and music links"
                        onChange={this.handleMediaInput}/> */}
                    <button>Save</button>
                </form>
            </Fragment>}
        </section>)
    }
}

function mapStateToProps (state) {
    return { user:state.user, loading:state.util.loading }
}

const mapDispatchToProps = { saveUser, loadUser }
    
export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
