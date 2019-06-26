import React, { Fragment } from 'react'
import { HashRouter, Route, Switch}  from 'react-router-dom'

import HomePage from '../pages/homePage/HomePage'
import TripsPage from '../pages/tripsPage/TripsPage'
import TripDetails from '../pages/tripDetails/TripDetails'
import TripEdit from '../pages/tripEdit/TripEdit'
import ProfileDetails from '../pages/profileDetails/ProfileDetails'
import ProfileEdit from '../pages/profileEdit/ProfileEdit'
import AppHeader from './appHeader/AppHeader'

const AppRouter = (props) => {

    return (
        <HashRouter>
        <Fragment>
            <AppHeader/>
            <div className="main-container">
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/" render={ props => <HomePage {...props} />}/>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/login" component={HomePage}/>
                    <Route path="/signup" component={HomePage}/>
                    <Route path="/trip/edit/:id" component={TripEdit}/>
                    <Route exact path="/trip/edit" component={TripEdit}/>
                    <Route path="/trip/:id" component={TripDetails}/>
                    <Route exact path="/trip" component={TripsPage}/>
                    <Route path="/user/edit/:id" component={ProfileEdit}/>
                    <Route path="/user/:id" component={ProfileDetails}/>
                </Switch>
            </div>
        </Fragment>
    </HashRouter>)
}

export default AppRouter















