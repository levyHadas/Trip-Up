import React from 'react'
// import { BrowserRouter, Route, Switch}  from 'react-router-dom'
import { HashRouter, Route, Switch, Redirect}  from 'react-router-dom'
import { connect } from 'react-redux'


import HomePage from '../Pages/HomePage/HomePage'
import TripsPage from '../Pages/TripsPage/TripsPage'
import TripDetails from '../Pages/TripDetails/TripDetails'
import TripEdit from '../Pages/TripEdit/TripEdit'

import AppHeader from './AppHeader/AppHeader'

function mapStateToProps (state) {
    return { user: state.user }
}

const AppRouter = (props) => {
    // const PrivateRoute = () => {
    //     return Store.userStore.user ? <Route/> : <Redirect to="/signup" />}
    const HomeRoute = () => {
        return props.user._id ? 
            <Redirect to="/trip"/> : <Redirect to="/home"/>}
    
    return (
        <HashRouter>
            <section>
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
        
           
                {/* {<PrivateRoute exact 
                    path="/edit/:id" 
                    render = {(props) => <ContactEdit/>}
                />}  */}
            
                
                </Switch>
            </div>
            </section>
        </HashRouter>

 
    )
}


export default connect(mapStateToProps)(AppRouter) 
