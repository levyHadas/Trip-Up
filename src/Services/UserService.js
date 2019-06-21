import axios from 'axios'
import { BASE_PATH_USER } from '../config/consts'


export default {
    login,
    logout,
    signup,
    getLoggedUser,
    updateUser,
    getUsers,
    getById
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
    if (!user.fName) user.fName = ''
    if (!user.sName) user.sName = ''
    return Axios.post(`${BASE_PATH_USER}`, user)
        .then(res => {
            return res.data})
        .catch(err => {throw (err)}) 
}

function login(credentials) {
    return Axios.post(`${BASE_PATH_USER}/login`, credentials)
        .then(res => res.data)
        .catch(err => {throw (err)})
}

function getLoggedUser() {
    return Axios.get(`${BASE_PATH_USER}/loggedUser`)
        .then(res => {
            if (!res.data) return null 
            return res.data
        })
}

function getById(userId) {
    if (!userId) return null
    return Axios.get(`${BASE_PATH_USER}/${userId}`)
        .then(res => res.data)
        .catch(err => {throw (err)})
}

function logout() {
    return Axios.get(`${BASE_PATH_USER}/logout`)
        .then(() => Promise.resolve())
        .catch(err => Promise.reject(err))
}

function getUsers(filterBy) {
    var queryStr = ''
    if (filterBy.usersIds) queryStr = `usersIds=${JSON.stringify(filterBy.usersIds)}`
    console.log(`${BASE_PATH_USER}?${queryStr}`)
    // else - no need for this at the moment
    return Axios.get(`${BASE_PATH_USER}?${queryStr}`)
        .then(res => res.data)
        .catch(err => {throw (err)})
}


