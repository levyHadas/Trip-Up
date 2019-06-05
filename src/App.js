import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// import SocketService from './Services/SocketService'
import AppRouter from '../src/components/AppRouter'
import { loadUser } from './actions/userActions'
import './css/main.scss'


class App extends PureComponent{
  
  componentDidMount() {
    this.props.dispatch(loadUser())
  }

  render() {
    return (

      <div className="App">
        <AppRouter/>
        {/* <button onClick={() => TripService.createTrips()}>Create trips</button> */}
        
      </div>
    )
  }
}


export default connect()(App)
