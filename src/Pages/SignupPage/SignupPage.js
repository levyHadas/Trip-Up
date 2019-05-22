import { connect } from 'react-redux'
import React, { Component } from 'react'

import { signup, login } from '../../Actions/UserActions'

class SignupPage extends Component {
    
    state = {username:'', password: '', passwordRepeat:''}
    
    handleInput = (ev) => {
        // if (ev.target.value) {
            this.setState({[ev.target.name]: ev.target.value})
        // } else this.setState({[ev.target.name]: ''})
    }

    handleSubmit = async(ev) => {
        ev.preventDefault()
        if (!this.state.username || !this.state.password)  return;
        if (this.state.password !== this.state.passwordRepeat) return;
        const signedUser = await this.props.signup({username:this.state.username, password: this.state.password})
        this.props.login(signedUser, this.props.history)
    }
    
    render() {
        return (
            <section className="signup">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" 
                        placeholder="Username"
                        name="username"
                        value={this.state.username} 
                        onChange={this.handleInput}/>
                    <input type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password} 
                        onChange={this.handleInput}/>
                    <input type="password"
                        placeholder="Password Repeat"
                        name="passwordRepeat"
                        value={this.state.passwordRepeat} 
                        onChange={this.handleInput}/>
                    <button>Sign Up</button>
                </form>
            </section>
        )
    }
}

const mapDispatchToProps = { signup, login }

export default connect(null, mapDispatchToProps)(SignupPage) //with:
