import { connect } from 'react-redux'
import React, { Component } from 'react'

import { login } from '../../Actions/UserActions'

class LoginPage extends Component {
    
    state = {username:'', password: ''}
    
    handleInput = (ev) => {
        if (ev.target.value) {
            this.setState({[ev.target.name]: ev.target.value})
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        if (!this.state.username || !this.state.password) return;
        this.props.login({...this.state}) //or:
        // this.props.dispatch(login({...this.state}))
    }
    
    render() {
        return (
            <section className="login">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" 
                        name="username"
                        value={this.state.username} 
                        onChange={this.handleInput}/>
                    <input type="password"
                        name="password"
                        value={this.state.password} 
                        onChange={this.handleInput}/>
                    <button>Save</button>
                </form>
            </section>
        )
    }
}

const mapDispatchToProps = { login }

//this way can't be used if we need the event variable.
//In this case, we will need to use:

// function mapDispatchToProps (dispatch) {
//     return {
//         login: (user) => dispatch(login(user))
//     }
// }

export default connect(null, mapDispatchToProps)(LoginPage) //with:
// export default connect()(HomePage)



// export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
// function mapStateToProps (state) {
//     return {
//         user: state.user
//     }
// }



// function mapDispatchToProps (dispatch) {
//     return {
//         onLogin: (user) => {
//             console.log('here')
//             dispatch(login(user))
//         },
//     }
// }



// function mapDispatchToProps (dispatch) {
//     return {
//         setName: (name) => {
//             dispatch({type:'setName', payload:name})
//         },
//         setNameAsync: (name) => {
//             dispatch(setNewName(name)) 
//             //when the middleware sees dispatch with a function it hadnles it
//         }
//     }
// }

// function setNewName(name) {
    
//     return (dispatch) => { //it recives dispatch from the thunk middleware
//         UserService.saveName(name)
//         .then(savedName => {
//             dispatch ({type:'setName', payload:savedName})
//         })
//     }
// }