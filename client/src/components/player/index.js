import React from 'react';
import { connect } from 'react-redux';

//import player sprite
import Sprite1 from './jackOriginal.png';
import Sprite2 from "./JackHair.png";
import Sprite3 from "./JackSuit.png";
import Sprite4 from "./jackBriefcase.png";
import handleMovement from './movement';
import store from "../../config/store";

class Player extends React.Component {

  state={
    sprite: Sprite1,
  }

  componentDidMount() {
    document.addEventListener("click", (e) => {
      this.changeSprite(e)
    });
  }

  changeSprite = (e) => {
    if(store.getState().level.level === 0) {
      this.setState({
        sprite: Sprite1,
      });
    } else if(store.getState().level.level === 1) {
      this.setState({
        sprite: Sprite2,
      });
    } else if (store.getState().level.level === 2) {
      this.setState({
        sprite: Sprite3,
      });
    } else if (store.getState().level.level >= 3) {
      this.setState({
        sprite: Sprite4,
      });
    }
  }



  render() {
  return (
    <div
      style={{
        position: 'absolute',
        top: this.props.position[1],
        left: this.props.position[0],
        backgroundImage: `url('${this.state.sprite}')`,
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
