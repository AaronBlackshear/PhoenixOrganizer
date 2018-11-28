import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Login from './components/LoginForm';
import Home from './components/Home';

class App extends Component {
  state = {
    userInfo: null,
  }

  componentDidMount() {
    const userInfo = window.localStorage.getItem('user');
    userInfo && this.setState({ userInfo });
  }

  render() {
    const { userInfo } = this.state;
    return (
      <div className="App">
        {!userInfo ? <Login /> : <Home />}
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userReducer });

export default connect(mapStateToProps)(App);
