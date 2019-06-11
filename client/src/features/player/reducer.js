
const initialState = {
    position: [0, 0],
}

const playerReducer = (state=initialState, action) => {
    switch(action.type) {
        case "MOVE_PLAYER":
            return {
                //return a new js object and use spread to spread out action.payload
                ...action.payload
            }
        default: 
            return state
    }
}

export default playerReducer;