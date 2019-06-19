import React from 'react';
import { connect } from 'react-redux';
import { SPRITE_SIZE } from '../../config/constants';
import Coins from "../Coins";
import './styles.css'
import store from '../../config/store';
import Modal from "react-modal";

//this function gets the tile file to put into the background of that tile
function getTileSprite(type) {
  switch(type) {
    case 0:
        return 'grass'
    case 3:
        return 'tree'
    case 4:
        return "chest"
    case 5:
        return 'rock'
    case 6:
        return 'tree'
    case 7:
        return "chest"
    case 8:
        return "player"
  }
}

function MapTile(props) {
  return <div
    className={`tile ${getTileSprite(props.tile)}`}
    style={{
      height: SPRITE_SIZE,
      width: SPRITE_SIZE,
    }}
  />
}

function MapRow(props) {
  return <div
    className="row"
    style={{
      height: SPRITE_SIZE,
    }}
  >
  {
    props.tiles.map( tile => <MapTile tile={tile} /> )
  }
  </div>
}


class Map extends React.Component {

  state = {
    coin: 0,
    modalIsOpen: false
  }

  // this will grab the player's location each time a key is pressed
  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyPress);
  }
  
  //need to use the arrow function for "this" to refer to Map.  
  //if not arrow function "this" will refer to the document
  handleKeyPress = () => {

    //position will be an array of [x,y]  
    let position = store.getState().player.position;
    
    const x = position[0];
    const y = position[1];

    console.log(position)
    //if player lands on position with these coordinates, run increaseCoins
    if (x === 160 && y === 160) {
      this.openModal()
    }
  }

  //function to increase coin count
  increaseCoins = () => {
    let newCoins = this.state.coin + 1
    this.setState({
      coin: newCoins
    })

    this.closeModal();
  }

  /**********modal functions ********/
  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }
  /**********modal functions ********/

  render() {
    return (
        <>
          <div
          style={{
              position: 'relative',
              top: '0px',
              left: '0px',
              width: '1600px',
              height: '800px',
              border: '4px solid white'
          }}
          >
            
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Question #1</h2>
            <div>
              <p>True or False</p>
              <p>HTML stands for Hypertext Markup Language.</p>
              </div>
            <form>
              <button type="button" onClick={this.increaseCoins}>Yes</button>
              <button  type="button" onClick={this.closeModal}>No</button>
            </form>
          </Modal>

          <Coins coin={this.state.coin}/>
    
          {
              this.props.tiles.map( row => <MapRow tiles={row} /> )
          }
          </div>
      </>
    )
  }
}



function mapStateToProps(state) {
  return {
    tiles: state.map.tiles,
  }
}

export default connect(mapStateToProps)(Map)
