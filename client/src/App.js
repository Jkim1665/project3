import React, { Component } from 'react'
import World from './components/world'
import LoginPage from './components/LoginPage'
import Sound from "react-sound";
import { connect } from 'react-redux';
import mainMusic from "./gameMusic.mp3"

class App extends Component {

  // func to check db/authentication
  // changes this.state.isLoggedIn

  onFormSubmit(name, email, password) {
    console.log(name, email, password)
  }

  render() {
    return (
      <div>
           <Sound
              url={mainMusic}
              playStatus={Sound.status.PLAYING}
              playFromPosition={0}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
            />
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
