import React from 'react';
import { connect } from 'react-redux';

//import player sprite
import walkSprite from './walker23.png';
import handleMovement from './movement';

function Player(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${walkSprite}')`,
        backgroundPosition: props.spriteLocation,
        width: '64px',
        height: '64px'
      }}
    />
  )
}

//This function will grab all the player properties as an object and returns that object into the function
function mapStateToProps(state) {
  return {
    ...state.player,
  }
}

//this connects our player component to the react store
export default connect(mapStateToProps)(handleMovement(Player))
