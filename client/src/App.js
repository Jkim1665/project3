import React, { Component } from "react";
import logo from "./logo.svg";
import BackgroundDungeon from "./Components/BackgroundDungeon/index"
import Header from "./Components/Header/index"
import "./App.css";

class App extends Component {
  render() {
    return (
      <Header>
      <BackgroundDungeon/>
           </Header>
    
   
    );
  }
}

export default App;
