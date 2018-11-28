import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { loginUser } from '../redux/reducers/userReducer'

const FormItem = Form.Item

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  }

  handleUserInput = (state, input) => {
    this.setState({ [state]: input })
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;
    dispatch(loginUser(email, password))
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="login-container">
        <Form>
          <FormItem>
            <Input
              type="email"
              onChange={e => this.handleUserInput('email', e.target.value)}
              placeholder='Email'
              value={email}
            />
          </FormItem>

          <FormItem>
            <Input
              type="password"
              onChange={e => this.handleUserInput('password', e.target.value)}
              placeholder='Password'
              value={password}
            />
          </FormItem>

          <FormItem>
            <Button type='primary' onClick={this.handleSubmit}>Log In</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(LoginForm)
