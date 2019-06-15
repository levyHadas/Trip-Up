import { connect } from 'react-redux'
import React, { Component } from 'react'

import { login } from '../../actions/userActions'

class LoginPage extends Component {
    
    state = {username:'', password: ''}
  
    handleInput = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        if (!this.state.username || !this.state.password) return;
        this.props.login({...this.state}, this.props.history)
    }
    
    render() {
        return (
            <section className="login">
                <form className="login-form flex column align-center"onSubmit={this.handleSubmit}>
                    <input className="login-input" type="text" 
                        name="username"
                        placeholder="Username"
                        value={this.state.username} 
                        onChange={this.handleInput}
                        required/>
                    <input className="login-input" type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password} 
                        onChange={this.handleInput}
                        required/>
                    <button className="btn login-btn">Login</button>
                </form>
            </section>
        )
    }
}

const mapDispatchToProps = { login }

export default connect(null, mapDispatchToProps)(LoginPage) //with:

