import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import LoadingScreen from './LoadingScreen'
import LoginForm from './LoginForm'

class Index extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    user.auth_token && this.setState({ user })
  }

  render() {
    const { auth } = this.props
    const { user } = this.state

    return (
      <Fragment>
        {/* {
          user.user_identifier
            ? ()
        } */}
        {/* {
            ? auth.user.user_identifier || user.user_identifier
              ? (
                  {auth.user.user_identifier &&
                    ((user.user_identifier || auth.user.user_identifier) && <Sidebar />)}

                    {this.props.children}

              )
              : (
                <LoginForm />
              )
            : <LoadingScreen />
        } */}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.userReducer,
  dispatch: state.dispatch
})

export default connect(mapStateToProps)(Index)
