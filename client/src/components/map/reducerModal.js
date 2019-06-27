const initialState = {
    isAnyModalOpen: false,
  }
  
  const modalReducer = (state=initialState, action) => {
    switch(action.type) {
      case 'MODAL_OPEN':
        return {
          ...action.payload
        }
      default:
        return state
    }
  }
  
  export default modalReducer;
  