import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import SocketService from './services/socketService'
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
      </div>
    )
  }
}



export default connect()(App)
