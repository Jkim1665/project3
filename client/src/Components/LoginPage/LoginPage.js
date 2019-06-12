import React from "react";
import "./LoginPage.css";

class LoginPage extends React.Component {

state = {
    name: "",
    email: "",
    password: ""
}


onFormSubmit = (event) => {

    event.preventDefault();
    this.props.onSubmit(this.state.name, this.state.email, this.state.password)

    
}

render() {

    return (
   <div className="content" >


      Welcome to the dungeon


      <hr/>
      <form onSubmit={this.onFormSubmit} >

<div className="uk-margin">
<input className="uk-input uk-form-width-medium" type="text" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value.toUpperCase()})}/>
</div>

<div className="uk-margin">
    <input className="uk-input uk-form-width-medium" type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value.toUpperCase()})}/>
</div>

<div className="uk-margin">
<input className="uk-input uk-form-width-medium" type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
</div>
<button type="submit" className="uk-button uk-button-secondary uk-button-large">Large button</button>
</form>
   </div>



    )}
};

export default LoginPage;