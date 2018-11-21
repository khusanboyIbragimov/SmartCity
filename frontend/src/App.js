import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import SmartCity from "./components/SmartCity";
import Home from "./components/Home";
import axios from "axios";
import './App.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
        userInfo: []
    }
  }

  componentWillMount() {
    axios
      .get("/users/userInfo")
      .then( res => {
        this.setState({
          userInfo: res.data
        })
      })
      .catch( err => {
        console.log(err);
      })
  }


  renderHome = () => {
    return < Home userInfo={this.state.userInfo} />
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" render={this.renderHome} />
          <Route path="/sc" component={SmartCity} />
        </Switch>
      </div>
    )
  }
}

