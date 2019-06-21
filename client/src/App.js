import React, { Component } from 'react'
//import World from './components/world'
import LoginPage from './components/LoginPage'

class App extends Component {

  state = {
    isLoggedIn: false
  }

  // func to check db/authentication
  // changes this.state.isLoggedIn

  onFormSubmit(name, email, password) {
    console.log(name, email, password)
  }

  render() {
    return (
      <div>
        <LoginPage onSubmit={this.onFormSubmit}/>
      </div>
    )
  }
}


export default App
