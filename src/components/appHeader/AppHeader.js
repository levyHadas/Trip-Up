import React from 'react'
import AppNav from '../appNav/AppNav'
import './AppHeader.scss'
import { logout } from '../../actions/userActions'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.png'
import { connect } from 'react-redux'

function mapStateToProps (state) {
    return { navOpen:state.util.navOpen, user: state.user }
}

function AppHeader (props) {
    console.log(window.document.body.clientWidth)
    const isMobile = window.document.body.clientWidth < 745    
    const toggleNav = (ev) => {
        ev.preventDefault()
        props.dispatch({type:'toggleNav'})
    }
    
    const onLogout = (ev) => {
        ev.preventDefault()
        props.dispatch(logout())
    }
    return (
        <header className="header-container">
            {isMobile &&
            <div className="hamburger flex align-center" 
                onClick={toggleNav}>
                <i className="fas fa-bars"></i>
            </div>}
            <div className="header-items-container flex space-between">
            <div className="title-nav-container flex align-center space-between">
                <Link to="/" className="flex align-center space-between">
                    <img className="logo-img" src={logoImg} alt=""/>
                    <h1 className="logo-txt">TRIP  UP</h1>
                </Link>
                    
                <AppNav user={props.user} navLinkClicked={toggleNav} navOpen={props.navOpen}/>
            </div>
                { props.user._id && 
                <div className="user-area-link flex align-center">
                    <div className="name-logout-container flex space-between align-center">
                        <img className="user-img" src={props.user.img} alt="User"/>
                        <p className="user-name">{props.user.username[0]}</p>
                        <a className="Nav_link logout" href="/home"
                            onClick={onLogout}> Logout
                        </a> 
                    </div>
                </div>}
            </div>
        </header>
    )
}


export default connect(mapStateToProps)(AppHeader)