import axios from 'axios'

const initialState = {
  user: null,
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const SIGN_UP_USER = 'SIGN_UP_USER'

function userReducer (state = initialState, action) {
  switch (action.type) {
    case `${SIGN_UP_USER}_FULFILLED`:
      return { user: action.payload.data[0] }
    case `${LOGIN_USER}_FULFILLED`:
      const { 
        username,
        email,
        auth_token,
        user_identifier,
      } = action.payload.data;

      return auth_token
        ? { user: {
            username,
            email,
            auth_token,
            user_identifier,
          } }
        : { ...state }

    case `${LOGOUT_USER}_FULFILLED`:
      return initialState;

    default:
      return { ...state }
  }
}

export const signUpUser = (email, password) => {
  return {
    type: SIGN_UP_USER,
    payload: axios.post('/api/create_user', { email, password })
  }
}

export const loginUser = (username, password) => {
  return {
    type: LOGIN_USER,
    payload: axios.post('/api/login_user', { username, password })
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: axios.get('/api/logout_user')
  }
}

export default userReducer
