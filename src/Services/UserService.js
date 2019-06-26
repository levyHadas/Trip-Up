import axios from 'axios'
import { BASE_PATH_USER } from '../config/consts'
import socketService from './socketService'


export default {
    login,
    logout,
    signup,
    getLoggedUser,
    updateUser,
    getUsers,
    getById,
    
}

const Axios = axios.create({
    withCredentials: true,
})

function updateUser(user) {
    return Axios.put(`${BASE_PATH_USER}/${user._id}`, user)
        .then(res => res.data) 
        .catch(err => {throw (err)}) 
}


function signup(user) {
    user.likes = []
    user.trips = []
    user.incomingRequests = []
    user.outgoingRequests = []
    if (!user.fName) user.fName = ''
    if (!user.sName) user.sName = ''
    return Axios.post(`${BASE_PATH_USER}`, user)
        .then(res => {
            const signedUser = res.data
            socketService.emit('user-logged-in', signedUser)
            return signedUser
        })
        .catch(err => { throw (err) }) 
}

function login(credentials) {
    return Axios.post(`${BASE_PATH_USER}/login`, credentials)
        .then(res => {
            const loggedUser = res.data
            socketService.emit('user-logged-in', loggedUser)
            return loggedUser
        })
        .catch(err => { throw (err) })
}

function getLoggedUser() {
    return Axios.get(`${BASE_PATH_USER}/loggedUser`)
        .then(res => {
            if (!res.data) return null 
            const loggedUser = res.data
            socketService.emit('user-logged-in', loggedUser)
            return loggedUser
        })
}

function getById(userId) {
    if (!userId) return null
    return Axios.get(`${BASE_PATH_USER}/${userId}`)
        .then(res => res.data)
        .catch(err => {throw (err)})
}

async function logout() {
    const logoutUser = await getLoggedUser()
    socketService.emit('user-logged-out', logoutUser)
    return Axios.get(`${BASE_PATH_USER}/logout`)
        .then(() => {
            return Promise.resolve()
        })
        .catch(err => Promise.reject(err))
}

function getUsers(filterBy) {
    var queryStr = ''
    if (filterBy.usersIds) queryStr = `usersIds=${JSON.stringify(filterBy.usersIds)}`
    // else - no need for this at the moment
    return Axios.get(`${BASE_PATH_USER}?${queryStr}`)
        .then(res => res.data)
        .catch(err => {throw (err)})
}


