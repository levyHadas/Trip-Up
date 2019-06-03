import React, { Fragment } from 'react'
// import { BrowserRouter, Route, Switch}  from 'react-router-dom'
import { HashRouter, Route, Switch, Redirect}  from 'react-router-dom'
import { connect } from 'react-redux'


import HomePage from '../pages/homePage/HomePage'
import TripsPage from '../pages/tripsPage/TripsPage'
import TripDetails from '../pages/tripDetails/TripDetails'
import TripEdit from '../pages/tripEdit/TripEdit'

import AppHeader from './appHeader/AppHeader'

function mapStateToProps (state) {
    return { user: state.user, navOpen:state.util.navOpen }
}

const AppRouter = (props) => {
    const HomeRoute = () => {
        return props.user._id ? 
        <Redirect to="/trip"/> : <Redirect to="/home"/>}
        
        return (
            <HashRouter>
            <Fragment>
                <AppHeader user={props.user} dispatch={props.dispatch}/>
                <div className="main-container">
                    <Switch>
                        <Route path="/home" component={HomePage}/>
                        <Route path="/login" component={HomePage}/>
                        <Route path="/signup" component={HomePage}/>
                        <Route path="/trip/edit/:id" component={TripEdit}/>
                        <Route exact path="/trip/edit" component={TripEdit}/>
                        <Route path="/trip/:id" component={TripDetails}/>
                        <Route exact path="/trip" component={TripsPage}/>
                        <HomeRoute exact path="/" component={HomePage}/>
                    </Switch>
                </div>
            </Fragment>
        </HashRouter>)
}


export default connect(mapStateToProps)(AppRouter) 
















//  {<PrivateRoute exact 
//     path="/edit/:id" 
//     render = {(props) => <ContactEdit/>}
// />


// const PrivateRoute = () => {
    //     return Store.userStore.user ? <Route/> : <Redirect to="/signup" />}