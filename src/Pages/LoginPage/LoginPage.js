import { connect } from 'react-redux'
import React, { Component } from 'react'

import { login } from '../../Actions/UserActions'

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
                <form onSubmit={this.handleSubmit}>
                    <input type="text" 
                        name="username"
                        value={this.state.username} 
                        onChange={this.handleInput}/>
                    <input type="password"
                        name="password"
                        value={this.state.password} 
                        onChange={this.handleInput}/>
                    <button>Login</button>
                </form>
            </section>
        )
    }
}

const mapDispatchToProps = { login }

export default connect(null, mapDispatchToProps)(LoginPage) //with:

