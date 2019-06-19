import React from "react";

class Level extends React.Component {
 
  
    render() {
      return (
        <div style={{
            position: "absolute",
            left: "125px",
            top: "-5px",
            color: "#008000",
            fontSize: "12px"
          }}>
            <h1>Level: {this.props.level}</h1>
          </div>
      );
    }
  }
  




export default Level;