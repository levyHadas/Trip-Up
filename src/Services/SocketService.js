import ioClient from 'socket.io-client'
import { reloadTrip } from '../actions/tripActions'
import { reloadCurrUser } from '../actions/userActions'
import store from '../store/store';

const URL = (process.env.NODE_ENV !== 'development')
? ''
: '//localhost:3003'
var socket = ioClient(URL);

export default {
    emit,
    on,
    socket,
}


socket.on('connectionTest', (msgFromServer) => {
  // console.log(msgFromServer)
  // socket.emit('connectionTest', 'Hi from Front')
})
socket.on('reload-trip', tripToReload => {
  store.dispatch(reloadTrip(tripToReload))
  //in server - need to send msg to member
})
socket.on('request-replied', repliedRequest => {
  console.log('repliedRequest', repliedRequest )
})
socket.on('inform-new-incoming-request', incomingRequest => {
  store.dispatch(reloadCurrUser())
  console.log('inform-new-incoming-request', incomingRequest )
})

function emit(eventName, data) {
  socket.emit(eventName, data)
}

function on(eventName, cb) {
  socket.on(eventName, cb)
}


