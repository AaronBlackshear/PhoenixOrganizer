import axios from 'axios'

const initialState = {
  user: {},
  loggedIn: false,
  loading: false
}

const LOGIN_USER = 'LOGIN_USER'
const SIGN_UP_USER = 'SIGN_UP_USER'

function userReducer (state = initialState, action) {
  switch (action.type) {
    case `${SIGN_UP_USER}_PENDING`:
      return { ...state, loading: true }
    case `${SIGN_UP_USER}_FULFILLED`:
      return { ...state, loading: false, loggedIn: true, user: action.payload.data[0] }
    case `${LOGIN_USER}_PENDING`:
      return { ...state, loading: true }
    case `${LOGIN_USER}_FULFILLED`:
      const { 
        username,
        email,
        auth_token,
        user_identifier,
      } = action.payload.data;

      if (auth_token) {
        localStorage.setItem('user', JSON.stringify({
          username,
          email,
          auth_token,
          user_identifier,
        }))

        return {
          ...state,
          user: action.payload.data,
          loading: false,
          loggedIn: true
        }
      }
      return { ...state }

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

export default userReducer
