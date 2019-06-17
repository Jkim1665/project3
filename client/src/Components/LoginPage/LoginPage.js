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
        this.props.onSubmit(this.state.name, this.state.email, this.state.password);

        API.createUser({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
        .then(function(data) {
            console.log("LoginPage.js db data:")
            console.log(data);
        })
        .catch(function(err) {
            console.log(err);
        });
        // v ---- TESTING ---- v
        // API.findUsers()
        //     .then(function (data) {
        //         console.log(data);
        //     })
        //     .catch(function (err) {
        //         console.log(err);
        //     });
    }

    render() {

        return (
            <div className="content" >


                Welcome to the dungeon


      <hr />
                <form onSubmit={this.onFormSubmit} >

                    <div className="uk-margin">
                        <input className="uk-input uk-form-width-medium" type="text" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value.toUpperCase() })} />
                    </div>

                    <div className="uk-margin">
                        <input className="uk-input uk-form-width-medium" type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value.toUpperCase() })} />
                    </div>

                    <div className="uk-margin">
                        <input className="uk-input uk-form-width-medium" type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                    </div>
                    <button type="submit" className="uk-button uk-button-secondary uk-button-large" onClick={this.onFormSubmit}>Post to DB</button>
                </form>
            </div>



        )
    }
};

export default LoginPage;