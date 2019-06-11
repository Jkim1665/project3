import store from "../../config/store";
import { SPRITE_SIZE } from "../../config/constants";

export default function handleMovement(player) {

    function getNewPosition(direction) {
        
        const oldPos = store.getState().player.position

        switch(direction) {
            case "west":
                return [ oldPos[0]-SPRITE_SIZE, oldPos[1] ]
            case "east":
                return [ oldPos[0]+SPRITE_SIZE, oldPos[1] ]
            case "north":
                return [ oldPos[0], oldPos[1]-SPRITE_SIZE ]
            case "south":
                return [ oldPos[0], oldPos[1]+SPRITE_SIZE ]
        }
        
    }

    function directionMove(direction) {

        store.dispatch({
            type: "MOVE_PLAYER",
            payload: {
                position: getNewPosition(direction)
            }
        })
    }
    
    function handleKeyDown(e) {

        e.preventDefault();

        switch(e.keyCode) {
            case 37:
                return directionMove("west")
            case 38:
                return directionMove("north")
            case 39:
                return directionMove("east")
            case 40:
                return directionMove("south")

            default: 
                console.log(e.keyCode)
        }
    }

    window.addEventListener("keydown", (e) => {
        handleKeyDown(e)
    })

    return player;
}