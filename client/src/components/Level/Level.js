import React from "react";
import { connect } from 'react-redux';

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
  
  const mapStateToProps = state => {
    return {
      level: state.level.level,
    }
  }


export default connect(mapStateToProps)(Level);