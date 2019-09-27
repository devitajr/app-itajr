import React, { Component } from 'react';
import Router from './src/Router';
import axios from 'axios';

export default class App extends Component {
  
  UNSAFE_componentWillMount() {
    axios.defaults.baseURL = 'http://26d482db.ngrok.io/api';
    axios.defaults.timeout = 1500;
  }
  
  render() {
    return (
      <Router />
    );
  }
}
