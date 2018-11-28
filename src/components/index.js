import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import Sidebar from '../components/Sidebar'
import LoadingScreen from './LoadingScreen'
import LoginForm from './LoginForm'

const { Content } = Layout

class Index extends Component {
  state = {
    user: {},
    loading: null,
  }

  componentDidMount() {
    this.setState({ loading: false })
    const user = JSON.parse(localStorage.getItem('user'))
    user && this.setState({ user })
  }

  render() {
    const { auth } = this.props
    const { user, loading } = this.state

    return (
      <Fragment>
        {
          loading !== null
            ? auth.user.authTokenOne || user.authTokenOne
              ? (
                <Layout>
                  {auth.user &&
                    ((user.authTokenOne || auth.user.authTokenOne) && <Sidebar />)}

                  <Content>
                    {this.props.children}
                  </Content>

                </Layout>
              )
              : (
                <LoginForm />
              )
            : <LoadingScreen />
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.userReducer,
  dispatch: state.dispatch
})

export default connect(mapStateToProps)(Index)
