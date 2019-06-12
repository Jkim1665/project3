import React, { Component } from "react";

import BackgroundDungeon from "./Components/BackgroundDungeon/index"

import "./App.css";
import LoginPage from "./Components/LoginPage";

class App extends Component {


  onSearchSubmit(name,email,password) {
    console.log(name,email,password)
}





  render() {
    return (
      <LoginPage onSubmit = {this.onSearchSubmit}>
      <BackgroundDungeon/>
          </LoginPage>
    
   
    );
  }
}

export default App;
