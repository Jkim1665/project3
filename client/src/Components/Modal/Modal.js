import React from "react";
import "./modal.css";

class Modal extends React.Component {

  state = {
    modalOpen: false
  }

  showModal = () => this.setState({ modalOpen: true });

  hideModal = () => this.setState({ modalOpen: false });

  render() {
    return (
      // <!-- This is the modal -->
      <div id="trivia-modal">
        <div style={{
          padding: "20px"
        }}>
          <h2>Headline</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna 
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
              ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit 
              esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
              occaecat cupidatat non proident, sunt in culpa qui officia 
              deserunt mollit anim id est laborum.</p>
            <p>
              <button type="button" >Cancel</button>
              <button type="button">Save</button>
            </p>
        </div>
      </div>
    );
  }
}
  

export default Modal;