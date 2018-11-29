import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import LoggedInRoutes from './routes/loggedInRoutes'
import LoggedOutRoutes from './routes/loggedOutRoutes'

class App extends Component {
  state = {
    userInfo: null,
  }

  componentDidMount() {
    const userInfo = window.localStorage.getItem('user');
    console.log(userInfo);
    userInfo && this.setState({ userInfo });
  }

  render() {
    const { userInfo } = this.state;
    return (
      <div className="App">
        { userInfo ? <LoggedInRoutes /> : <LoggedOutRoutes /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userReducer });

export default connect(mapStateToProps)(App);
