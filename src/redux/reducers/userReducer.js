import axios from 'axios'
const base_url = 'http://localhost:3001/api'

const initialState = {
  user: {},
  loggedIn: false,
  loading: false
}

const LOGIN_USER = 'LOGIN_USER'

function userReducer (state = initialState, action) {
  switch (action.type) {
    case `${LOGIN_USER}_PENDING`:
      return { ...state, loading: true }
    case `${LOGIN_USER}_FULFILLED`:
      window.location.href = '/'
      const { 
        username,
        email,
        password,
        authTokenOne,
        authTokenTwo,
        userIdentifier,
        emailVerified,
      } = action.payload.data[0];

      localStorage.setItem('user', JSON.stringify({
        username,
        email,
        password,
        authTokenOne,
        authTokenTwo,
        userIdentifier,
        emailVerified,
      }))

      return {
        ...state,
        user: action.payload.data[0],
        loading: false,
        loggedIn: true
      }

    default:
      return { ...state }
  }
}

export const loginUser = (username, password) => {
  return {
    type: LOGIN_USER,
    payload: axios.post(base_url + '/login_user', { username, password })
  }
}

export default userReducer
