import React, { Component } from 'react'
import World from './features/world'
// import handleMovement from "./features/player/movement";


class App extends Component {

  modalMessage = () => {
    const messageModal = document.getElementById("#messageModal");
    messageModal.style.display = "block";
  }
  

  render() {
    return (
      <div>
        <World />
        <div id="messageModal"
          style={{
            display: "none",
            position: "fixed",
            paddingTop: "100px",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "rgb(0,0,0,0.4)"
          }}
        >
    
          <div className="modal-content">
            <span className="close">&times;</span>
            <p>Some text in the Modal..</p>
          </div>

        </div>
      </div>
    )
  }
}

export default App
