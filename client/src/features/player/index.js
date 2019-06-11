import React from "react";
import { connect } from "react-redux";
import walkSprite from "./professor_walk_cycle_no_hat.png";
import handleMovement from "./movement";

function Player(props) {
    return (
        <div
            style={{
                position: "absolute",
                top: props.position[1],
                left: props.position[0],
                backgroundImage: `url('${walkSprite}')`,
                backgroundPosition: "0 0",
                width: "128px",
                height: "128px",
            }}
        />
    )
}

function mapStateToProps(state) {
    return {
        //spread operator spreads all details for you
        ...state.player,
        
    }
}

export default connect(mapStateToProps) (handleMovement(Player));