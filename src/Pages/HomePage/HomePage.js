import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import LoginPage from '../loginPage/LoginPage'
import SignupPage from '../signupPage/SignupPage'
import './HomePage.scss'

class HomePage extends Component {
      
    render() {
        return (
            <section className="home-container">
                <Link to="/trip" className="find-a-trip-btn">find a trip</Link>
                {!this.props.loading && 
                <div className="signup-login-container flex">
                    {!this.props.user.username && 
                        <LoginPage history={this.props.history}/>}
                    {!this.props.user.username && 
                        <SignupPage history={this.props.history}/>}
                </div>}
            </section>
        )
    }
}

function mapStateToProps (state) {
    return { user: state.user,
             loading: state.util.loading }
}


export default connect(mapStateToProps)(HomePage)
