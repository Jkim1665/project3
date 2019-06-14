import React from 'react'
import { connect } from 'react-redux'
import walkSprite from './player_walk.png'
import handleMovement from './movement'

function Player(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${walkSprite}')`,
        backgroundPosition: props.spriteLocation,
        width: '40px',
        height: '40px',
      }}
    />
  )
}

//map the redux state with the key of player
function mapStateToProps(state) {
  return {
    ...state.player,
  }
}

//this connects our player function to the react datastore
export default connect(mapStateToProps)(handleMovement(Player))
