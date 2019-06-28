import React from 'react';
//connect is a function that returns a higher order component 
//that is used on the component
import { connect } from 'react-redux';
import { SPRITE_SIZE } from '../../config/constants';
import Coins from "../Coins";
import './styles.css'
import store from '../../config/store';
import Modal from "react-modal";
import Level from "../Level"
import billboard from "./billboard.png";
import TriviaOne from "../TriviaOne";
import TriviaTwo from "../TriviaTwo";
import TriviaThree from "../TriviaThree";
import FinalBoss from "../FinalBoss";
import treeModal from "./treeModal.png";
import bush from "./bushextra.png";
import whiteMark from "./whiteMark.png";
import deckModal from "./deckModal.png";
import oceanModal from "./oceanModal.png";
import Sound from "react-sound";
import API from "../../utils/API";

//this function gets the tile file to put into the background of that tile
function getTileSprite(type) {
  switch (type) {
    case 0:
      return 'blank';
    case 1:
      return 'blank';
    case 5:
      return 'blank';
    case 6:
      return 'blank';
    default:

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
      props.tiles.map(tile => <MapTile tile={tile} />)
    }
  </div>
}


class Map extends React.Component {

  state = {
    saveGameModal: false,
    openMailModal: false,
    taOneModal: false,
    taTwoModal: false,
    taThreeModal: false,
    InformationOneModal: false,
    InformationTwoModal: false,
    InformationThreeModal: false,
    afterSaveModal: false,
    InformationFiveModal: false,
    modalJackisOpen: false,
    jackUpgradePossible: "",
    modalFinalisOpen: false,
    modalFinalNotReady: false,
    openNowModal: false,
    name: "Jack",
    showOne: true,
    showTwo: true,
    showThree: true,
    showFour: true,
    showFive: true,
    bedModal: false,
  }


  // this will grab the player's location each time a key is pressed
  componentDidMount() {
    document.addEventListener("keyup", (e) => {
      this.handleKeyPress(e)
    });
    this.openNow()
  }

  /******** Opening game modal  *************/
  openNow = () => {
    this.setState({ openNowModal: true });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: true,
      }
    });
  }
  closeOpenNow = () => {
    this.setState({ openNowModal: false });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }
  /******** Opening game modal  *************/
  /******** Bed modal  *************/
  bed = () => {
    this.setState({ bedModal: true });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: true,
      }
    });
  }
  closeBed = () => {
    this.setState({ bedModal: false });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }
  /******** Bed modal  *************/


  //code for exclamation marks
  toggleExclamation = () => {

    if (this.state.showOne && this.state.InformationOneModal) {
      const showOne = this.state.showOne;
      this.setState({ showOne: !showOne })
    }
    if (this.state.showTwo && this.state.openMailModal) {
      const showTwo = this.state.showTwo;
      this.setState({ showTwo: !showTwo })
    }
    if (this.state.showThree && this.state.InformationFiveModal) {
      const showThree = this.state.showThree;
      this.setState({ showThree: !showThree })
    }
    if (this.state.showFour && this.state.InformationTwoModal) {
      const showFour = this.state.showFour;
      this.setState({ showFour: !showFour })
    }
    if (this.state.showFive && this.state.InformationThreeModal) {
      const showFive = this.state.showFive;
      this.setState({ showFive: !showFive })
    }
  }

  //funtion for deciding what to do when Jack lands on a specific position
  handleKeyPress = (e) => {
    e.preventDefault();

    const enter = e.keyCode;

    //position will be an array of [x,y]  
    let position = store.getState().player.position;
    let direction = store.getState().player.direction;
    const x = position[0];
    const y = position[1];

    //if player lands on position with these coordinates, run modal questions
    if (enter === 13) {
      //modal for saving states to database
      if ((x === 192 && y === 64 && direction === "EAST") || (x === 256 && y === 128 && direction === "NORTH")) {
        this.saveGame();
      }
      //modal for bed
      if (x === 192 && y === 64 && direction === "WEST") {
        this.bed();
      }
      //modal for mail
      if ((x === 192 && y === 192 && direction === "EAST") || (x === 256 && y === 256 && direction === "NORTH") || (x === 320 && y === 192 && direction === "WEST")) {
        this.openMail();
        this.toggleExclamation();
      }
      //TA Modal One
      if (x === 0 && y === 128 && direction === "NORTH") {
        this.taOne();
      }
      //TA Modal Two
      if (x === 1536 && y === 192 && direction === "NORTH") {
        this.taTwo();
      }
      //TA Modal Three
      if (x === 1152 && y === 192 && direction === "NORTH") {
        this.taThree();
      }
      //information modal One
      if ((x === 320 && y === 512 && direction === "EAST") || (x === 384 && y === 576 && direction === "NORTH") || (x === 448 && y === 512 && direction === "WEST") || (x === 384 && y === 448 && direction === "SOUTH")) {
        this.informationOne();
        this.toggleExclamation();
      }
      //Information modal Two
      if ((x === 512 && y === 128 && direction === "NORTH") || (x === 576 && y === 128 && direction === "NORTH")) {
        this.informationTwo();
      }
      //information modal Three (ocean modal)
      if (x === 1152 && y === 64 && direction === "NORTH") {
        this.informationThree();
        this.toggleExclamation();
      }
      //information modal Four
      if (x === 1280 && y === 256 && direction === "NORTH") {
        this.informationFour();
      }
      //information modal Five
      if (x === 1024 && y === 576 && direction === "NORTH") {
        this.informationFive();
        this.toggleExclamation();
      }
      //upgrade Jack
      if (x === 832 && y === 64 && direction === "NORTH") {
        if (this.props.level < 3) {
          this.setState({
            modalJackisOpen: true,
            jackUpgradePossible: `Welcome! Would you like to upgrade Jack to level ${this.props.level + 1}?`
          });
          store.dispatch({
            type: 'MODAL_OPEN',
            payload: {
              isAnyModalOpen: true,
            }
          });
        } else {
          this.setState({
            modalJackisOpen: true,
            jackUpgradePossible: "You've reach the maximum level! You are ready to do whatever you want!"
          });
          store.dispatch({
            type: 'MODAL_OPEN',
            payload: {
              isAnyModalOpen: true,
            }
          });
        }
      }
      //final interview
      if (x === 64 && y === 704 && direction === "WEST") {
        this.modalFinal();
      }
    }
  }

  /******** Save game modal  *************/
  saveGame = () => {
    this.setState({ saveGameModal: true });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: true,
      }
    });
  }
  closeSaveGame = () => {
    this.setState({ saveGameModal: false });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }
  /******** Save game modal  *************/
  /****** After Save Modal ********/
  afterSave = () => {

    this.setState({ saveGameModal: false, afterSaveModal: true });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: true,
      }
    });

    const coins = store.getState().coin.coin;
    const level = store.getState().level.level;
    const email = store.getState().isLoggedIn.email;

    const userData = {
      email: email,
      coins: coins,
      level: level
    }

    API.updateSingleUser(userData)
      .then(function (res) {
        console.log(res);
      });

  }
  closeAfterSave = () => {
    this.setState({ afterSaveModal: false });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }
  /****** After Save Modal ********/


  /****** mailbox modal for directions to the game ********/
  openMail = () => {
    this.setState({ openMailModal: true });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: true,
      }
    });
  }
  closeOpenMail = () => {
    this.setState({ openMailModal: false });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }
  /****** mailbox modal for directions to the game ********/



  /****** TA One Modal ********/
  taOne = () => {
    this.setState({ taOneModal: true });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: true,
      }
    });
  }
  closeTaOne = () => {
    this.setState({ taOneModal: false });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }
  /****** TA One Modal ********/

  /****** TA Two Modal ********/
  taTwo = () => {
    this.setState({ taTwoModal: true });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: true,
      }
    });
  }
  closeTaTwo = () => {
    this.setState({ taTwoModal: false });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }
  /****** TA Two Modal ********/

  /****** TA Three Modal ********/
  taThree = () => {
    this.setState({ taThreeModal: true });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: true,
      }
    });
  }
  closeTaThree = () => {
    this.setState({ taThreeModal: false });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }
  /****** TA Three Modal ********/



  /****** Information One Modal ********/
  informationOne = () => {
    this.setState({ InformationOneModal: true });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: true,
      }
    });
  }
  closeInformationOne = () => {
    this.setState({ InformationOneModal: false });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }
  /****** Information One Modal ********/

  /****** Information Two Modal ********/
  informationTwo = () => {
    this.setState({ InformationTwoModal: true });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: true,
      }
    });
  }
  closeInformationTwo = () => {
    this.setState({ InformationTwoModal: false });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }
  /****** Information Two Modal ********/

  /****** Information Three Modal ********/
  informationThree = () => {
    this.setState({ InformationThreeModal: true });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: true,
      }
    });
  }
  closeInformationThree = () => {
    this.setState({ InformationThreeModal: false });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }
  /****** Information Three Modal ********/

  /****** Information Five Modal ********/
  informationFive = () => {
    this.setState({ InformationFiveModal: true });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: true,
      }
    });
  }
  closeInformationFive = () => {
    this.setState({ InformationFiveModal: false });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }
  /****** Information Five Modal ********/



  /********** Upgrade Jack ********/
  modalJack = () => {
    if (this.props.level < 3) {
      if (this.props.coin >= 5) {
        this.setState({
          jackUpgradePossible: `Congratulations! Jack has been upgraded to level ${this.props.level + 1}!`
        });
        store.dispatch({
          type: 'MODAL_OPEN',
          payload: {
            isAnyModalOpen: true,
          }
        });
        this.upgradeJack();
      } else {
        this.setState({
          jackUpgradePossible: "Sorry, you don't have enough coins! You can get more coins by going to Will, Guillermo, or Steven and answering their questions correctly!"
        });
        store.dispatch({
          type: 'MODAL_OPEN',
          payload: {
            isAnyModalOpen: true,
          }
        });
      }
    } else {
      this.setState({
        jackUpgradePossible: "You've reach the maximum level! You are ready to do whatever you want!"
      });
      store.dispatch({
        type: 'MODAL_OPEN',
        payload: {
          isAnyModalOpen: true,
        }
      });
    }
  }

  closeModalJack = () => {
    this.setState({
      modalJackisOpen: false,
    });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }

  upgradeJack = () => {

    let newCoins = this.props.coin - 5;
    let newLevel = this.props.level + 1;

    store.dispatch({
      type: 'UPGRADE_PLAYER',
      payload: {
        level: newLevel,
      }
    })
    store.dispatch({
      type: 'ADD_COIN',
      payload: {
        coin: newCoins,
      }
    })

  }
  /********** Upgrade Jack ********/

  /********** Final Interview ********/
  modalFinal = () => {

    if (this.props.level >= 3) {
      this.setState({
        modalFinalisOpen: true,
      });
      store.dispatch({
        type: 'MODAL_OPEN',
        payload: {
          isAnyModalOpen: true,
        }
      });
    } else {
      this.setState({
        modalFinalNotReady: true,
      });
      store.dispatch({
        type: 'MODAL_OPEN',
        payload: {
          isAnyModalOpen: true,
        }
      });
    }
  }

  closeModalFinal = () => {
    this.setState({
      modalFinalisOpen: false,
      modalFinalNotReady: false,
    });
    store.dispatch({
      type: 'MODAL_OPEN',
      payload: {
        isAnyModalOpen: false,
      }
    });
  }

  finalInterview = () => {

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
            backgroundImage: `url('${this.props.bgImage}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >


          {/* Exclamation mark on tree */}
          {this.state.showOne &&
            <div
              style={{
                position: 'absolute',
                top: '490px',
                left: '375px',
                width: "64px",
                height: "64px",
                zIndex: 2,
                backgroundImage: `url('${whiteMark}')`,
              }}>
            </div>}
          {/* Exclamation mark on mailbox */}
          {this.state.showTwo &&
            <div
              style={{
                position: 'absolute',
                top: '180px',
                left: '260px',
                width: "64px",
                height: "64px",
                zIndex: 2,
                backgroundImage: `url('${whiteMark}')`,
              }}>
            </div>}
          {/* Exclamation mark on bird */}
          {this.state.showThree &&
            <div
              style={{
                position: 'absolute',
                top: '450px',
                left: '1021px',
                width: "64px",
                height: "64px",
                zIndex: 2,
                backgroundImage: `url('${whiteMark}')`,
              }}>
            </div>}
          {/* Exclamation mark on big billboard */}
          {this.state.showFour &&
            <div
              style={{
                position: 'absolute',
                top: '45px',
                left: '541px',
                width: "64px",
                height: "64px",
                zIndex: 2,
                backgroundImage: `url('${whiteMark}')`,
              }}>
            </div>}
          {/* Exclamation mark on binoculars */}
          {this.state.showFive &&
            <div
              style={{
                position: 'absolute',
                top: '-4px',
                left: '1149px',
                width: "64px",
                height: "64px",
                zIndex: 2,
                backgroundImage: `url('${whiteMark}')`,
              }}>
            </div>}




          {/* Initial opening modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.openNowModal}
            onRequestClose={this.closeOpenNow}
            className="Modaltest"
            overlayClassName="Overlaytest"
            contentLabel="Modaltest"
          >
            <div style={{
              marginTop: "20px",
              textAlign: "center",
            }}>
              <p>Hi, {store.getState().isLoggedIn.name}.</p>
              <p>Remember to check your mail first!</p>
            </div>
            <form>
              <button type="button" onClick={this.closeOpenNow}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "60px"
                }}>X</button>
            </form>
          </Modal>
          {/* Bed modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.bedModal}
            onRequestClose={this.closeBed}
            className="Modaltest"
            overlayClassName="Overlaytest"
            contentLabel="Modaltest"
          >
            <div style={{
              marginTop: "20px",
              textAlign: "center",
            }}>
              <p>This is no time to sleep!</p>
              <p>Go out there and get your dream job!</p>
            </div>
            <form>
              <button type="button" onClick={this.closeBed}>Fine...</button>
              <button type="button" onClick={this.closeBed}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "60px"
                }}>X</button>
            </form>
          </Modal>




          {/* Saving game modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.saveGameModal}
            onRequestClose={this.closeSaveGame}
            className="modalSave"
            overlayClassName="Overlay"
            contentLabel="modalSave"
          >
            <div style={{
              marginTop: "200px",
              textAlign: "center",
            }}>
              <p>Hi, {this.state.name}.</p>
              <p>Would you like to save your progress?</p>
            </div>
            <form>
              <button type="button" onClick={this.afterSave}>Save Game</button>
              <button type="button" onClick={this.closeSaveGame}>Don't Save</button>
              <button type="button" onClick={this.closeSaveGame}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "60px"
                }}>X</button>
            </form>
          </Modal>
          {/* After saving modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.afterSaveModal}
            onRequestClose={this.closeAfterSave}
            className="modalSave"
            overlayClassName="Overlay"
            contentLabel="modalSave"
          >
            <div style={{
              marginTop: "200px",
              textAlign: "center",
            }}>
              <p>Save complete!</p>
            </div>
            <form>
              <button type="button" onClick={this.closeAfterSave}>Close</button>
              <button type="button" onClick={this.closeAfterSave}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "60px"
                }}>X</button>
            </form>
          </Modal>

          {/* Mailbox modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.openMailModal}
            onRequestClose={this.closeOpenMail}
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
              <button type="button" onClick={this.closeOpenMail}>Got it</button>
            </form>
          </Modal>

          {/* TA in the woods modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.taOneModal}
            onRequestClose={this.closeTaOne}
            className="ModalTaOne"
            overlayClassName="Overlay"
            contentLabel="Modal"

          >
            <TriviaOne increaseCoins={this.increaseCoins} />
            <br /><br />
            <button type="button" onClick={this.closeTaOne}>Close</button>

          </Modal>

          {/* TA at lemonade stand modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.taTwoModal}
            onRequestClose={this.closeTaTwo}
            className="ModalTaTwo"
            overlayClassName="Overlay"
            contentLabel="ModalTaTwo"
          >
            <TriviaTwo increaseCoins={this.increaseCoins} />
            <br /><br />
            <button type="button" onClick={this.closeTaTwo}>Close</button>

          </Modal>

          {/* TA at far right modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.taThreeModal}
            onRequestClose={this.closeTaThree}
            className="ModalTaTwo"
            overlayClassName="Overlay"
            contentLabel="ModalTaTwo"
          >
            <TriviaThree increaseCoins={this.increaseCoins} />
            <br /><br />
            <button type="button" onClick={this.closeTaThree}>Close</button>

          </Modal>

          {/* First Tree after home modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.InformationOneModal}
            onRequestClose={this.closeInformationOne}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel="Modal"
          >
            <div style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              backgroundImage: `url('${treeModal}')`,
              width: '100%',
              height: '100%',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
            }}>
            </div>
            <form>
              <button type="button" onClick={this.closeInformationOne}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "60px"
                }}>X</button>
            </form>
          </Modal>

          {/* Large courtyard modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.InformationTwoModal}
            onRequestClose={this.closeInformationTwo}
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
              <button type="button" onClick={this.closeInformationTwo}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "60px"
                }}>X</button>
            </form>
          </Modal>

          {/* Ocean modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.InformationThreeModal}
            onRequestClose={this.closeInformationThree}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel="Modal"
          >
            <div style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              backgroundImage: `url('${oceanModal}')`,
              width: '100%',
              height: '100%',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
            }}>
            </div>
            <form>
              <button type="button" onClick={this.closeInformationThree}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "60px"
                }}>X</button>
            </form>
          </Modal>

          {/* Final path modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.InformationFiveModal}
            onRequestClose={this.closeInformationFive}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel="Modal"
          >
            <div style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              backgroundImage: `url('${deckModal}')`,
              width: '100%',
              height: '100%',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
            }}>
            </div>
            <form>
              <button type="button" onClick={this.closeInformationFive}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "60px"
                }}>X</button>
            </form>
          </Modal>

          {/* Upgrade Jack modal */}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.modalJackisOpen}
            onRequestClose={this.closeModalJack}
            className="modalUpgrade"
            overlayClassName="Overlaytest"
            contentLabel="modalUpgrade"
          >
            <div>
              <p style={{ fontSize: "30px" }}>{this.state.jackUpgradePossible}</p>
            </div>
            <form>
              {this.props.level !== 3 && <button type="button" onClick={this.modalJack}>Upgrade Jack</button>}
              <button type="button" onClick={this.closeModalJack}>Exit</button>
            </form>
          </Modal>

          {/* Alex final interview not ready*/}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.modalFinalNotReady}
            onRequestClose={this.closeModalFinal}
            className="ModalFinal"
            overlayClassName="OverlayFinal"
            contentLabel="ModalFinal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Google Interview</h2>
            <div>
              <p>Sorry Jack, you are not ready for this interview. Only those who are at level 3 can interview at Google.</p>
            </div>
            <form>
              <button type="button" onClick={this.closeModalFinal}>Got It</button>
            </form>
          </Modal>
          {/* Alex final interview modal*/}
          <Modal
            ariaHideApp={false}
            isOpen={this.state.modalFinalisOpen}
            onRequestClose={this.closeModalFinal}
            className="ModalFinal"
            overlayClassName="OverlayFinal"
            contentLabel="ModalFinal"
          >
            <FinalBoss />
            <button type="button" onClick={this.closeModalFinal}>Close</button>

          </Modal>

          {/* Coin and Level components */}
          <div style={{
            position: "absolute",
            width: "326px",
            height: "36px",
            left: "1270px",
            top: "-4px",
            backgroundColor: "#999999",
            border: "solid 4px #ffffff",
          }}>
            <Coins coin={this.props.coin} />
            <Level level={this.props.level} />
          </div>

          {/* Map 2nd layer */}
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              left: '-554px',
              width: "100%",
              height: "100%",
              zIndex: 2,
              backgroundImage: `url('${bush}')`,


            }}>
          </div>

          {/* Layout tiles for map */}
          {this.props.tiles.map(row => <MapRow tiles={row} />)}

        </div>
      </>
    )
  }
}


//mapStateToProps is normal convention for naming this function
//the "state" parameter will be given to you by redux
const mapStateToProps = state => {
  return {
    //this is grabbing the tiles inside map state
    //you can also grab state from store by: store.getState().map.tiles
    tiles: state.map.tiles,
    //this you can use by using "this.props.tiles"
    coin: state.coin.coin,
    level: state.level.level,
    bgImage: state.map.bgImage,
    name: state.map.name,
    isAnyModalOpen: state.modal.isAnyModalOpen,
  }
}

//connect is a function that returns a function that returns a higher order component

export default connect(mapStateToProps)(Map);
