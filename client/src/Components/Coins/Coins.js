import React from "react";

class Coins extends React.Component {
 
  
    render() {
      return (
        <div style={{
            position: "absolute",
            left: "10px",
            top: "-5px",
            color: "#FFFF00",
            fontSize: "12px"
          }}>
            <h1>Coins: {this.props.coin}</h1>
          </div>
      );
    }
  }
  


export default Coins;
