import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Gulapp from "./components/Gulapp";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/ga" component={Gulapp} />
        </Switch>
      </div>
    )
  }
}

export default App;
