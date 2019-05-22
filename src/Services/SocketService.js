import ioClient from 'socket.io-client'


// var socket = ioClient();
// var socket = ioClient('//localhost:3003');

const URL = (process.env.NODE_ENV !== 'development')
? ''
: '//localhost:3003'
var socket = ioClient(URL);


export default {
    emit,
    on,
    socket,
}


// socket.on('ShowUpdatedScores', playersWithScores => {
//   Store.dispatch({type:'updateAllScores', playersWithScores})
// })
socket.on('connectionTest', (msgFromServer) => {
  console.log(msgFromServer)
  socket.emit('connectionTest', 'Hi from Front')
})



function emit(eventName, data) {
  socket.emit(eventName, data)
}


function on(eventName, cb) {
  socket.on(eventName, cb)
}










// function connectionTest() {
//   socket.emit('connectionTest', 'Hi from Front')
//   socket.on('connectionTest', msgFromServer => {
//           console.log(msgFromServer)
//   })
// }

// function getSocketConnection() {
//     return socket
// }






// function refresh() {
// 	return store.dispatch({ type: "loadActiveTasks" })
// }

// function send(msg) {
// 	socket.emit('post-msg', msg)
// }

// function _notification(title = 'default title', type = 'success', text = 'dafault text') {
// 	Vue.notify({
// 		group: 'foo',
// 		title: title,
// 		type: type,
// 		classes: 'vue-notification',
// 		text: text
// 	})
// }
