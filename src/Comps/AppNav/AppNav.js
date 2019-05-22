import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


const AppNav = (props) => {
    return (
        <nav className="nav-container flex align-center space-between">
            <NavLink className="Nav_link" 
                activeClassName="activeRoute" 
                to="/home">Home
            </NavLink>
            <NavLink className="Nav_link"  
                activeClassName="activeRoute" 
                to="/trip">Trips
            </NavLink>
            {props.loggedUser && 
            <NavLink className="Nav_link"
                activeClassName="activeRoute" 
                to="/trip/edit">Create!
            </NavLink> }
            {!props.loggedUser && 
            <NavLink className="Nav_link"
                activeClassName="activeRoute" 
                to="/home">Login
            </NavLink> }
        </nav>
    )
}

export default connect()(AppNav)