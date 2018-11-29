import React, { Component } from 'react'
import { connect } from 'react-redux';
import Form from '../styles/Form';
import Input from '../styles/Input';
import { signUpUser } from '../redux/reducers/userReducer';

class SignUpForm extends Component {
  state = {
    username: '',
    password: '',
  }

  handleInput = (state, e) => {
    this.setState({ [state]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { dispatch } = this.props;
    dispatch(signUpUser(username, password));
  }

  render() {
    return (
      <Form>
        <p>Email:</p>
        <Input onChange={e => this.handleInput('username', e)} />
        <p>Password:</p>
        <Input onChange={e => this.handleInput('password', e)} />
        <button onClick={this.handleSubmit}>Sign Up</button>
      </Form>
    )
  }
}

const mapStateToProps = state => ({ user: state.userReducer })

export default connect(mapStateToProps)(SignUpForm);