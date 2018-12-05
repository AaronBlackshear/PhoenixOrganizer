import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import LoggedInRoutes from './routes/loggedInRoutes'
import LoggedOutRoutes from './routes/loggedOutRoutes'

class App extends Component {
  render() {
    const { auth } = this.props;

    return (
      <div className="App">
        { auth.user ? <LoggedInRoutes /> : <LoggedOutRoutes /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({ auth: state.userReducer });

export default connect(mapStateToProps)(App);
