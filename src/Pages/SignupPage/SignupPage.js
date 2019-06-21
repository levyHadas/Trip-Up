import { connect } from 'react-redux'
import React, { Component } from 'react'

import { signup, login } from '../../actions/userActions'

class SignupPage extends Component {
    
    state = {username:'', password: '', passwordRepeat:''}
    
    handleInput = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
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
                <form className="login-form flex column align-center"
                        onSubmit={this.handleSubmit}>
                    <input className="login-input" type="text" 
                        placeholder="First Name"
                        name="fName"
                        value={this.state.fName} 
                        onChange={this.handleInput}
                        required/>
                    <input className="login-input" type="text" 
                        placeholder="Username"
                        name="username"
                        value={this.state.username} 
                        onChange={this.handleInput}
                        required/>
                    <input className="login-input" type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password} 
                        onChange={this.handleInput}
                        required/>
                    <input  className="login-input" type="password"
                        placeholder="Password Repeat"
                        name="passwordRepeat"
                        value={this.state.passwordRepeat} 
                        onChange={this.handleInput}
                        required/>
                    <button className="btn login-btn">Sign Up</button>
                </form>
            </section>
        )
    }
}

const mapDispatchToProps = { signup, login }

export default connect(null, mapDispatchToProps)(SignupPage) //with:
