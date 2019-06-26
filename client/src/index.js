import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import LoginPage from "./components/LoginPage"

//this provider is a helper component that allows us to inject our store 
//into the react components
import { Provider } from 'react-redux'

import store from './config/store'

// function PageToDisplay(props) {
//   const isLoggedIn = props.isLoggedIn;
//   if (isLoggedIn) {
//     return <App />;
//   }
//   return <LoginPage/>;
// }

// provider has to wrap the APP component
ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'))
