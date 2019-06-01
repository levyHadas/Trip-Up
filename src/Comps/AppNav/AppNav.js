import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

function mapStateToProps (state) {
    return { navOpen:state.util.navOpen, user: state.user }
}

const AppNav = (props) => {
    const loggedUser=(props.user.username) ? true : false
    let navClassName = 'nav-container flex align-center space-between'
    navClassName += (props.navOpen) ? ' nav-open':' nav-closed'
    return (
        <nav className={navClassName}>
            <NavLink className="Nav_link" 
                activeClassName="activeRoute" 
                to="/home">Home
            </NavLink>
            <NavLink className="Nav_link"  
                activeClassName="activeRoute" 
                to="/trip">Trips
            </NavLink>
            {loggedUser && 
            <NavLink className="Nav_link"
                activeClassName="activeRoute" 
                to="/trip/edit">Create!
            </NavLink> }
            {!loggedUser && 
            <NavLink className="Nav_link"
                activeClassName="activeRoute" 
                to="/home">Login
            </NavLink> }
        </nav>
    )
}

export default connect(mapStateToProps)(AppNav)