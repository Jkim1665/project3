import React, { Component } from 'react'
import World from './components/world'
import LoginPage from './components/LoginPage'

import { connect } from 'react-redux';

class App extends Component {

  // func to check db/authentication
  // changes this.state.isLoggedIn

  onFormSubmit(name, email, password) {
    console.log(name, email, password)
  }

  render() {
    return (
      <div>
        {this.props.isLoggedIn ? <World /> : <LoginPage />}
      </div>

    )
  }
}


const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn.isLoggedIn
  }
}

export default connect(mapStateToProps)(App);
