const initialState = {
    coin: 0,
  }
  
  const coinReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'ADD_COIN':
        return {
          ...action.payload
        }
      default:
        return state
    }
  };
  
  export default coinReducer;
  