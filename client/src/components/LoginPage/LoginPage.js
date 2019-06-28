import React from "react";
import "./LoginPage.css";
import API from "../../utils/API";
import store from '../../config/store';

class LoginPage extends React.Component {

  state = {
    name: "",
    email: "",
    password: ""
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    let state = this.state;

    // console.log(this.state.name + " " + this.state.email + " " + this.state.password);
    // this.props.onSubmit(this.state.name, this.state.email, this.state.password);

    // FOR TESTING ONLY
    // API.findAllUsers()
    //   .then(res => console.log(res.data))
    //   .catch(err => console.log(err));

    // authenicating WITH BCRYPT
    API.getSingleUser({ email: this.state.email.toLowerCase() })
      .then(function (res) {
        // if user does not exist, create the user
        if (res.data === null) {
          console.log(state);
          API.createUser(state)
            .then(function (res) {
              // changes redux store state
              // TODO: add name and email to store
              console.log(res.data);

              // login information
              store.dispatch({
                type: 'ISLOGGEDIN',
                payload: {
                  isLoggedIn: true,
                  name: res.data.name,
                  email: res.data.email
                }
              })

              // coin
              store.dispatch({
                type: 'ADD_COIN',
                payload: {
                  coin: res.data.coins
                }
              })

              // level
              store.dispatch({
                type: 'UPGRADE_PLAYER',
                payload: {
                  level: res.data.level
                }
              })
            })
            .catch(err => console.log(err));
        }
        // if user does exist, check if password matches
        else {

          API.authenticateUser(state)
            .then(function (r) {
              console.log(r);
              if (r.data.isValid) {
                // login info
                store.dispatch({
                  type: 'ISLOGGEDIN',
                  payload: {
                    isLoggedIn: true,
                    name: r.data.dbModel.name,
                    email: r.data.dbModel.email,
                  }
                })

                // coin
                store.dispatch({
                  type: 'ADD_COIN',
                  payload: {
                    coin: r.data.dbModel.coins
                  }
                })

                // level
                store.dispatch({
                  type: 'UPGRADE_PLAYER',
                  payload: {
                    level: r.data.dbModel.level
                  }
                })
              }
              else {
                alert("authentication failed");
              }
            });
        }
      })


    /*
    // authenicating - THIS WORKS FOR PLAIN TEXT DATA STORAGE
    API.getSingleUser({ email: this.state.email.toLowerCase() })
      .then(function (res) {
        // if user does not exist, create the user
        if (res.data === null) {
          API.createUser(state)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        }
        // if user does exist, check if password matches
        else {
          if (res.data.password === state.password) {
            // alert("user authenticated");
            store.dispatch({
              type: 'ISLOGGEDIN',
              payload: {
                isLoggedIn: true
              }
            })
          }
          else {
            alert("user authentication failed");
          }
        }
      })
      */
  }

  // getSingleUser = (event) => {
  //   event.preventDefault();
  //   this.props.onSubmit(this.state.name, this.state.email, this.state.password)

  //   API.getSingleUser({ email: this.state.email.toLowerCase() })
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err));
  // }

  // updateSingleUser = (event) => {
  //   event.preventDefault();
  //   this.props.onSubmit(this.state.name, this.state.email, this.state.password)

  //   API.updateSingleUser(this.state)
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err));
  // }

  // createUser = (event) => {
  //   event.preventDefault();
  //   this.props.onSubmit(this.state.name, this.state.email, this.state.password)

  //   API.createUser(this.state)
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err));
  // }

  render() {

    return (
      <div className="content" >

        <form className="loginPageForm" onSubmit={this.onFormSubmit} >

          <div>
            <input type="text" placeholder="Name" value={this.state.name.toUpperCase()} onChange={(e) => this.setState({ name: e.target.value.toLowerCase() })} />
          </div>

          <div>
            <input type="email" placeholder="Email" value={this.state.email.toUpperCase()} onChange={(e) => this.setState({ email: e.target.value.toLowerCase() })} />
          </div>

          <div>
            <input type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
          </div>
          <button type="submit">Log In</button>
          {/* <button className="uk-button uk-button-secondary uk-button-large" onClick={this.getSingleUser}>getSingleUser</button>
          <button className="uk-button uk-button-secondary uk-button-large" onClick={this.updateSingleUser}>updateSingleUser</button>
          <button className="uk-button uk-button-secondary uk-button-large" onClick={this.createUser}>createUser</button> */}
        </form>
      </div>
    )
  }
};

export default LoginPage;