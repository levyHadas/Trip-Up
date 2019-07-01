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
  alert('THIS POP-UP IS AT WORK, IT WILL NOT BE A NATIV ALERT! \n Organizer replied to join request. Reply is: ' + repliedRequest.status)
})
socket.on('inform-new-incoming-request', incomingRequest => {
  store.dispatch(reloadCurrUser())
  alert('THIS POP-UP IS AT WORK, IT WILL NOT BE A NATIV ALERT! \n You have a new incoming request to join a trip you organized')
  console.log('inform-new-incoming-request', incomingRequest )
})

function emit(eventName, data) {
  socket.emit(eventName, data)
}

function on(eventName, cb) {
  socket.on(eventName, cb)
}


