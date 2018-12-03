import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import LoggedInRoutes from './routes/loggedInRoutes'
import LoggedOutRoutes from './routes/loggedOutRoutes'
import compare from './utils/compare'

class App extends Component {
  state = {
    userInfo: {},
  }

  componentDidMount() {
    const userInfo = JSON.parse(window.localStorage.getItem('user'));
    userInfo && this.setState({ userInfo });
  }

  componentDidUpdate(prevProps, prevState) {
    const { auth } = this.props;
    const userInfo = JSON.parse(window.localStorage.getItem('user'));
    if (!compare(prevState.userInfo, userInfo) || !compare(prevProps.auth.user, auth.user)) {
      userInfo && this.setState({ userInfo });
    }
  }

  render() {
    const { userInfo } = this.state;

    return (
      <div className="App">
        { userInfo.user_identifier ? <LoggedInRoutes /> : <LoggedOutRoutes /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({ auth: state.userReducer });

export default connect(mapStateToProps)(App);
