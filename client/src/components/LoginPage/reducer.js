const initialState = {
  isLoggedIn: false,
  name: "",
  email: ""
}

const loginPageReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'ISLOGGEDIN':
      return {
        // ... is the spread function that grabs all the values from the store
        ...action.payload
      }
    default:
      return state
  }
}

export default loginPageReducer
