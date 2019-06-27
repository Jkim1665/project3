import React from 'react';
import Map from '../map';
import Player from '../player';
import bgImage1 from './mapGrid.png';
// import bgImage2 from "./testMap.png";
import { tiles } from '../../data/maps/1';
import { tiles2 } from '../../data/maps/2';
import store from '../../config/store';



class World extends React.Component {


  componentDidMount() {
    this.defaultTiles();
    // document.addEventListener("keyup", this.changeTiles);
  }

  //set default tiles at beginning of game
  defaultTiles = () => {
    store.dispatch({ type: 'ADD_TILES', payload: {
      tiles: tiles,
      bgImage: bgImage1,
      name: "Jack",
      show: true,
    }});
  }

  // //change tiles if player lands on specific location
  // changeTiles = () => {
  //   let position = store.getState().player.position;
  //   let direction = store.getState().player.direction;
  //   const x = position[0];
  //   const y = position[1];

  //   console.log(direction);
  //   //if player lands on position with these coordinates, run modal questions
  //   if (x === 64 && y === 64 && direction === "NORTH") {
  //     store.dispatch({ type: 'ADD_TILES', payload: {
  //       tiles: tiles2,
  //       bgImage: bgImage2,
  //     }});
  //   }
  //   if (x === 640 && y === 640 && direction === "SOUTH") {
  //     store.dispatch({ type: 'ADD_TILES', payload: {
  //       tiles: tiles,
  //       bgImage: bgImage1,
  //     }});
  //   }
  // }


  render() {
    return (
        <>
          <div
            style={{
              position: 'relative',
              width: '1600px',
              height: '768px',
              margin: '20px auto',
            }}
          >
            <Map />
            <Player />
          </div>

        </>
      )
  }
}

export default World
