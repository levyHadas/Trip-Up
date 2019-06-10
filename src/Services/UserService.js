import axios from 'axios'
import { BASE_PATH_USER } from '../config/consts'


export default {
    login,
    logout,
    signup,
    getLoggedUser,
    updateUser,
    getUsers
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


function logout() {
    return Axios.get(`${BASE_PATH_USER}/logout`)
        .then(() => Promise.resolve())
        .catch(err => Promise.reject(err))
}

function getUsers(query) {
    var queryStr = ''
    if (query.ids) queryStr = `ids=${JSON.stringify(query.ids)}`
    return Axios.get(`${BASE_PATH_USER}?${queryStr}`)
        .then(res => res.data)
        .catch(err => {throw (err)})
}


