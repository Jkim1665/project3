const initialState = {
  position: [192, 64],
  spriteLocation: "0px 0px",
  direction: "SOUTH",
  walkIndex: 0,
}

const playerReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'MOVE_PLAYER':
      return {
        // ... is the spread function that grabs all the values from the store
        ...action.payload
      }
    default:
      return state
  }
}

export default playerReducer
