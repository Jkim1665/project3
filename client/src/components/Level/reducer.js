const initialState = {
    level: 0,
  }
  
  const levelReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'UPGRADE_PLAYER':
        return {
          ...action.payload
        }
      default:
        return state
    }
  };
  
  export default levelReducer;
  