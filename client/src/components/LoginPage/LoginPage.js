import React from "react";
import "./LoginPage.css";
import API from "../../utils/API";

class LoginPage extends React.Component {

  state = {
    name: "",
    email: "",
    password: ""
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.name, this.state.email, this.state.password)

    API.findAllUsers()
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  getSingleUser = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.name, this.state.email, this.state.password)
  
    API.getSingleUser({email: this.state.email.toLowerCase()})
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }

  updateSingleUser = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.name, this.state.email, this.state.password)
  
    API.updateSingleUser(this.state)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }

  createUser = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.name, this.state.email, this.state.password)
  
    API.createUser(this.state)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }

  render() {

    return (
      <div className="content" >

        Welcome to the dungeon

      <hr />
        <form onSubmit={this.onFormSubmit} >

          <div className="uk-margin">
            <input className="uk-input uk-form-width-medium" type="text" placeholder="Name" value={this.state.name.toUpperCase()} onChange={(e) => this.setState({ name: e.target.value.toLowerCase() })} />
          </div>

          <div className="uk-margin">
            <input className="uk-input uk-form-width-medium" type="email" placeholder="Email" value={this.state.email.toUpperCase()} onChange={(e) => this.setState({ email: e.target.value.toLowerCase() })} />
          </div>

          <div className="uk-margin">
            <input className="uk-input uk-form-width-medium" type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
          </div>
          <button type="submit" className="uk-button uk-button-secondary uk-button-large">findAllUsers</button>
          <button className="uk-button uk-button-secondary uk-button-large" onClick={this.getSingleUser}>getSingleUser</button>
          <button className="uk-button uk-button-secondary uk-button-large" onClick={this.updateSingleUser}>updateSingleUser</button>
          <button className="uk-button uk-button-secondary uk-button-large" onClick={this.createUser}>createUser</button>
        </form>
      </div>
    )
  }
};

export default LoginPage;