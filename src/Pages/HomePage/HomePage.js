import { connect } from 'react-redux'
import React, { Component } from 'react'


import LoginPage from '../LoginPage/LoginPage'
import SignupPage from '../SignupPage/SignupPage'

class HomePage extends Component {
      
    render() {
        return (
            <section className="home">
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
