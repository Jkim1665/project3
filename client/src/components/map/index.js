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


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class Map extends React.Component {

  state = {
    coin: 0,
    modalOneIsOpen: false,
    modalTwoIsOpen: false,
    modalThreeIsOpen: false
  }

  // this will grab the player's location each time a key is pressed
  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyPress);
  }
  
  //funtion for deciding what to do when Jack lands on a specific position
  handleKeyPress = () => {

    //position will be an array of [x,y]  
    let position = store.getState().player.position;
    const x = position[0];
    const y = position[1];

    //if player lands on position with these coordinates, run modal questions
    if (x === 160 && y === 160) {
      this.openModal()
    }
    //upgrade Jack
    if (x === 1280 && y === 720) {
      this.upgradeJack()
    }
    //final interview
    if (x === 80 && y === 640) {
      this.finalInterview()
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


  /********** Practice Questions Modal ********/
  openModal = () => {
    this.setState({modalOneIsOpen: true});
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({modalOneIsOpen: false});
  }
  /********** Practice Questions Modal ********/


  /********** Upgrade Jack ********/
  upgradeJack = () => {

    console.log("upgraded Jack")

    if (this.state.coin >= 5) {
      let newCoins = this.state.coin - 5
      this.setState({
        coin: newCoins
      })
    } else {
      alert("Insufficient Coins");
    }
   
  }

  /********** Upgrade Jack ********/



  /********** Final Interview ********/
  finalInterview = () => {
    console.log("Final Interview")
  }
  /********** Final Interview ********/




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
            ariaHideApp={false}
            isOpen={this.state.modalOneIsOpen}
            onRequestClose={this.closeModal}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel="Modal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Question #1</h2>
            <div>
              <p>True or False</p>
              <p>HTML stands for Hypertext Markup Language.</p>
              </div>
            <form>
              <button type="button" onClick={this.increaseCoins}>True</button>
              <button  type="button" onClick={this.closeModal}>False</button>
            </form>
          </Modal>

          <Modal
             ariaHideApp={false}
             isOpen={this.state.modalTwoIsOpen}
             onRequestClose={this.closeModal}
             className="Modal"
             overlayClassName="Overlay"
             contentLabel="Modal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Question #1</h2>
            <div>
              <p>True or False</p>
              <p>HTML stands for Hypertext Markup Language.</p>
              </div>
            <form>
              <button type="button" onClick={this.increaseCoins}>True</button>
              <button  type="button" onClick={this.closeModal}>False</button>
            </form>
          </Modal>

          <Modal
              ariaHideApp={false}
              isOpen={this.state.modalThreeIsOpen}
              onRequestClose={this.closeModal}
              className="Modal"
              overlayClassName="OverlayFinal"
              contentLabel="Modal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Question #1</h2>
            <div>
              <p>True or False</p>
              <p>HTML stands for Hypertext Markup Language.</p>
              </div>
            <form>
              <button type="button" onClick={this.increaseCoins}>True</button>
              <button  type="button" onClick={this.closeModal}>False</button>
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
