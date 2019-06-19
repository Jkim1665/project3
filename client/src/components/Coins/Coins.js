import React from "react";
import "./coins.css";

class Coins extends React.Component {
 
  
    render() {
      return (
        <div style={{
            position: "absolute",
            zIndex: "1",
            left: "1450px",
            top: "-10px",
            width: "200px",
            height: "50px",
            color: "white",
            fontSize: "14px"
          }}>
            <h1>Coins: {this.props.coin}</h1>
          </div>
      );
    }
  }
  




export default Coins;