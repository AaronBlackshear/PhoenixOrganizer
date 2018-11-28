import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Login from './components/LoginForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Calendar /> */}
        <Login />
      </div>
    );
  }
}

export default App;
