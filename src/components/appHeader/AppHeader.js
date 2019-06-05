import React from 'react'
import AppNav from '../appNav/AppNav'
import './AppHeader.scss'
import { logout } from '../../actions/userActions'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.png'

function AppHeader ({ user, dispatch }) {
    const isMobile = window.document.body.clientWidth < 750
    return (
        <header className="header-container">
            {isMobile &&
            <div className="hamburger flex align-center" 
                onClick={(ev) => {
                    ev.preventDefault()
                    dispatch({type:'toggleNav'})}}>
                <i className="fas fa-bars"></i>
            </div>}
            <div className="header-items-container flex space-between">
            <div className="title-nav-container flex align-center space-between">
                <Link to="/" className="flex align-center space-between">
                    <img className="logo-img" src={logoImg} alt=""/>
                    <h1 className="logo-txt">TRIP  UP</h1>
                    {/* <h1 className="logo">Trip<i className="fas fa-umbrella-beach"></i>Up</h1> */}
                </Link>
                    
                <AppNav/>
            </div>
                { user._id && 
                <div className="user-area-link flex align-center">
                    <div className="name-logout-container flex space-between align-center">
                        <img className="user-img" src={user.img} alt="User"/>
                        <p className="user-name">{user.username[0]}</p>
                        <a className="Nav_link logout" href="/home"
                            onClick={(ev) => {
                                ev.preventDefault()
                                dispatch(logout())
                            }}> Logout
                        </a> 
                    </div>
                </div>}
            </div>
        </header>
    )
}


export default AppHeader