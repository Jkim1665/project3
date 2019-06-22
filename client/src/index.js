import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

//this provider is a helper component that allows us to inject our store 
//into the react components
import { Provider } from 'react-redux'

import store from './config/store'

// provider has to wrap the APP component
ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))
