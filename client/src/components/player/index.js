import React from 'react';
import { connect } from 'react-redux';

//import player sprite
import walkSprite from './walker1.png';
import handleMovement from './movement';
import store from "../../config/store";

class Player extends React.Component {

  render() {
  return (
    <div
      style={{
        position: 'absolute',
        top: this.props.position[1],
        left: this.props.position[0],
        backgroundImage: `url('${walkSprite}')`,
        backgroundPosition: this.props.spriteLocation,
        width: '64px',
        height: '64px'
      }}
    />
  )
  }
}

//This function will grab all the player properties as an object and returns that object into the function
function mapStateToProps(state) {
  return {
    ...state.player,
  }
}

//this connects our player component to the react store
export default connect(mapStateToProps)(handleMovement(Player))
