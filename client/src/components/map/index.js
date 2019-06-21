import React from 'react';
import { connect } from 'react-redux';
import { SPRITE_SIZE } from '../../config/constants';
import Coins from "../Coins";
import './styles.css'
import store from '../../config/store';
import Modal from "react-modal";
import bgImage from './testmapnew.png';
import bgImage2 from "./testMap.png";
import Level from "../Level"
import billboard from "./billboard.png";
import TriviaOne from "../TriviaOne";

//this function gets the tile file to put into the background of that tile
function getTileSprite(type) {
  switch(type) {
    case 0:
        return 'gym'
    case 1:
        return 'gym'
    case 2:
        return 'tree'
    case 3:
        return 'brick'
    case 4:
        return "chest"
    case 5:
        return 'grass'
    case 6:
        return 'gui'
    case 7:
        return "steven"
    case 8:
        return "player"
    case 9:
        return 'will'
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


// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };


class Map extends React.Component {

  state = {
    coin: 0,
    modalOneIsOpen: false,
    modalTwoIsOpen: false,
    modalThreeIsOpen: false,
    modalFourIsOpen: false,
    openingModal: false,
    level: 0,
    onTriviaOne: false,
  }

  // this will grab the player's location each time a key is pressed
  componentDidMount() {
    this.openingModalFunc();
    document.addEventListener("keyup", this.handleKeyPress);
  }

  /******game opening modal for directions to the game */
  openingModalFunc = () => {
      this.setState({openingModal: true});
  }
  closeModalFunc = () => {
      this.setState({openingModal: false});
  }
  /******** game opening modal  */
  
  


  //funtion for deciding what to do when Jack lands on a specific position
  handleKeyPress = () => {

    //position will be an array of [x,y]  
    let position = store.getState().player.position;
    let direction = store.getState().player.direction;
    const x = position[0];
    const y = position[1];
    const triviaOpen = this.state.onTriviaOne;

    console.log(direction);
    //if player lands on position with these coordinates, run modal questions
    if (x === 64 && y === 64 && !triviaOpen && direction === "NORTH") {
      this.openModal()
    }
    if (x === 512 && y === 320 && !triviaOpen && direction === "NORTH") {
      this.openModal()
    }
    if (x === 384 && y === 128 && !triviaOpen && direction === "NORTH") {
      this.openModal()
    }
    if (x === 960 && y === 128 && !triviaOpen && direction === "NORTH") {
      this.openModal()
    }
    //turn off ability to reopen modal while still being on the same tile. must go off tile and come back on.
    if (!(x === 64 && y === 64) && !(x === 384 && y === 128) && !(x === 960 && y === 128)) {
      this.setState({
        onTriviaOne: false,
      });
    }

    //bulletin board 
    if (x === 1280 && y === 128 && direction === "NORTH") {
      this.openModalFour()
    }

    //upgrade Jack
    if (x === 1408 && y === 704 && direction === "SOUTH") {
      this.upgradeJack()
    }
    //final interview
    if (x === 640 && y === 640 && direction === "SOUTH") {
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


  /**********Bulletin Board Modal ********/
  openModalFour = () => {
    this.setState({
      modalFourIsOpen: true,
    });
  }

  closeModalFour = () => {
    this.setState({
      modalFourIsOpen: false,
    });
  }
  /********** Bulletin Board Modal ********/




  /********** Practice Questions Modal ********/
  openModal = () => {
    this.setState({
      modalOneIsOpen: true,
    });
  }

  closeModal = () => {
    this.setState({
      modalOneIsOpen: false,
      onTriviaOne: true,
    });
  }
  /********** Practice Questions Modal ********/




  /********** Upgrade Jack ********/
  upgradeJack = () => {

    if (this.state.coin >= 5) {

      let newCoins = this.state.coin - 5;
      let newLevel = this.state.level + 1;

      alert("upgraded Jack");

      this.setState({
        coin: newCoins,
        level: newLevel
      })
    } else {
      alert("Insufficient Coins");
    }
   
  }

  /********** Upgrade Jack ********/




  /********** Final Interview ********/
  finalInterview = () => {
    
    if (this.state.level >= 3) {
      alert("Final Interview, Congratulations!")
    } else {
      alert("You are not ready yet.");
    }
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
              height: '768px',
              border: '4px solid white',
              backgroundImage: `url('${bgImage}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
          }}
          >
          
            
          <Modal
            ariaHideApp={false}
            isOpen={this.state.openingModal}
            onRequestClose={this.closeModalFunc}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel="Modal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Welcome to JACK!</h2>
            <div style={{
              padding: "0px 150px"
            }}>
              <p>The purpose of this game is to help Jack get a full stack developer position at Google.</p>
              <p>
              To do this, Jack has to go to the each of the three trainers (Steven, Will, Guillermo), and he must answer trivia questions. 
              Jack will gain a coin for each trivia question he answers correctly.
              When Jack gains 5 coins, he can go to the shop to upgrade his look (which is how he levels up).
              Once Jack has reached level 3, he can go to the interviewer at Google (Alex) and try to land that awesome job at Google!</p>
              </div>
            <form>
              <button  type="button" onClick={this.closeModalFunc}>Got it</button>
            </form>
          </Modal>

          <Modal
            ariaHideApp={false}
            isOpen={this.state.modalFourIsOpen}
            onRequestClose={this.closeModalFour}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel="Modal"
          >

            <div style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              backgroundImage: `url('${billboard}')`,
              width: '100%',
              height: '100%',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"

            }}>
   
              </div>
            <form>
              <button type="button" onClick={this.closeModalFour} 
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "60px"
                }}>X</button>
            </form>
          </Modal>


          <Modal
            ariaHideApp={false}
            isOpen={this.state.modalOneIsOpen}
            onRequestClose={this.closeModal}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel="Modal"
          >
            <TriviaOne increaseCoins={this.increaseCoins}/>
            <button type="button" onClick={this.closeModal}>Close</button>

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

          <div style={{
            position: "absolute",
            width: "226px",
            height: "50px",
            left: "1370px",
            top: "-4px",
            backgroundColor: "#999999",
            border: "solid 4px #ffffff"

          }}>
              <Coins coin={this.state.coin}/>
              <Level level={this.state.level}/>
          </div>

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
