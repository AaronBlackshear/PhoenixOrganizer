import axios from 'axios'
const base_url = 'http://localhost:3001/api'

const initialState = {
  calendarBackgroundImages: {},
  events: [],
  categories: [],
}

const ADD_CALENDAR_BACKGROUND = 'ADD_CALENDAR_BACKGROUND'
const GET_EVENTS = 'GET_EVENTS'
const ADD_EVENT = 'ADD_EVENT'
const GET_CATEGORIES = 'GET_CATEGORIES'

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CALENDAR_BACKGROUND:
      const { date, image } = action.payload
      return {
        ...state,
        calendarBackgroundImages: {
          ...state.calendarBackgroundImages,
          [date]: image
        }
      };

    case `${GET_EVENTS}_FULFILLED`:
      return { ...state, events: action.payload.data }

    case `${ADD_EVENT}_FULFILLED`:
      return { ...state, events: action.payload.data }

    case `${GET_CATEGORIES}_FULFILLED`:
      return { ...state, categories: action.payload.data };

    default:
      return { ...state }
  }
}

export const addCalendarBackground = (date, image) => {
  return {
    type: ADD_CALENDAR_BACKGROUND,
    payload: { date, image },
  }
}

export const getAllEvents = userID => {
  return {
    type: GET_EVENTS,
    payload: axios.get(`${base_url}/get_events`, { headers: { userID } })
  }
}

export const addEvent = (event, category, date, startTime, endTime) => {
  const localUser = JSON.parse(localStorage.getItem('user'))

  return {
    type: ADD_EVENT,
    payload: axios.post(`${base_url}/add_event`, {
      event,
      category,
      date,
      startTime,
      endTime,
    }, {
        headers: {
          email: localUser.email,
          password: localUser.password,
          authToken: localUser.authTokenOne,
        },
      }),
  }
}

export const getCategories = user_id => {
  return {
    type: GET_CATEGORIES,
    payload: axios.get(`${base_url}/get_categories`, { headers: { user_id } })
  }
};

export default userReducer
