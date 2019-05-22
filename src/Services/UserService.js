import axios from 'axios'
// import UtilService from './UtilService'

const BASE_PATH = (process.env.NODE_ENV !== 'development')
    ? '/user'
    : 'http://localhost:3003/user'


export default {
    login,
    logout,
    signup,
    getLoggedUser,
    updateUser
}

const Axios = axios.create({
    withCredentials: true,
})

function updateUser(user) {
    console.log(user)
    return Axios.put(`${BASE_PATH}/:${user._id}`, user)
        .then(res => res.data) 
        .catch(err => {throw (err)}) 
}

function signup(user) {
    user.likes = []
    user.trips = []
    return Axios.post(`${BASE_PATH}/signup`, user)
        .then(res => {
            return res.data})
        .catch(err => {throw (err)}) 
}

function login(credentials) {
    return Axios.post(`${BASE_PATH}/login`, credentials)
        .then(res => res.data)
        .catch(err => {throw (err)})
}

function getLoggedUser() {
    return Axios.get(`${BASE_PATH}/loggedUser`)
        .then(res => {
            if (!res.data) return null 
            return res.data
        })
}


function logout() {
    return Axios.get(`${BASE_PATH}/logout`)
        .then(() => Promise.resolve())
        .catch(err => Promise.reject(err))
}



// function _getDefaultUser() {
//     const randId = UtilService.makeId()
//     return {
//         _id: 'guest' + randId,
//         username: 'Guest_' + randId,
//         img: 'https://api.adorable.io/avatars/puki'
//     }
// }

// function getUser(userId) {

//     return axios.get(`${BASE_PATH}/${userId}`)
//         .then(res => res.data)
//         .catch(err => err)


// }

