import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import TripService from './Services/TripService'


// import SocketService from './Services/SocketService'
import AppRouter from '../src/Comps/AppRouter'
import { loadUser } from './Actions/UserActions'
import './App.scss'


class App extends PureComponent{
  
  componentDidMount() {
    this.props.dispatch(loadUser())
  }

  render() {
    return (
      <div className="App">
        <AppRouter/>
        <button onClick={() => TripService.createTrips()}>Create trips</button>
      </div>
    )
  }
}


export default connect()(App)
