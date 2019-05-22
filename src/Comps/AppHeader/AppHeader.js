import React from 'react'
import AppNav from '../AppNav/AppNav'
import './AppHeader.scss'
import { logout } from '../../Actions/UserActions'

function AppHeader ({ user, dispatch }) {
    return (
        <header className="header-container">
            <div className="header-items-container flex space-between">
            <div className="title-nav-container flex align-center space-between">
                <h1>Trip TeamApp |</h1>
                <AppNav loggedUser={user.username ? true : false}/>
            </div>
                { user._id && 
                <div className="user-area-link flex space-between align-center">
                    <div className="name-logout-container flex column">
                        <p>Hello, {user.username}</p>
                        <a className="Nav_link" href="/home"
                            onClick={(ev) => {
                                ev.preventDefault()
                                dispatch(logout())
                            }}>Logout
                        </a> 
                    </div>
                    <img className="user-img" src={user.img} alt="User"/>
                </div>}
            </div>
        </header>
    )
}


export default AppHeader