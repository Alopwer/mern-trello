import Axios from "axios"
const pass = require('pwd');

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const APPLY_ACTIVE_USER = 'APPLY_ACTIVE_USER';

const initialState = {
  isLoggedIn: false,
  isFetching: false,
  user: {}
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false
      }
    case TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: !state.isFetching
      }
    case TOGGLE_FETCHING:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

const loginSuccess = () => ({
  type: LOGIN_SUCCESS
})

const loginFailure = () => ({
  type: LOGIN_FAILURE
})

const toggleFetching = () => ({
  type: TOGGLE_FETCHING
})

const applyActiveUser = user => ({
  type: APPLY_ACTIVE_USER,
  payload: user
})

export const login = (user) => (dispatch) => {
  dispatch(toggleFetching())
  Axios.get('http://localhost:5000/users')
    .then(res => {
      const foundUser = res.data.find(u => u.email === user.email);
      return foundUser || new Error('User not found')
    })
    .then(foundUser => {
      pass.hash(user.password, foundUser.salt)
        .then(res => {
          if (foundUser.password === res.hash) {
            dispatch(loginSuccess())
            dispatch(applyActiveUser())
            dispatch(toggleFetching())
          } else {
            dispatch(loginFailure())
            dispatch(toggleFetching())
          }
        })
    })
    .catch(err => {
      dispatch(loginFailure())
      dispatch(toggleFetching())
    })
}

export const signup = (user) => (dispatch) => {
  dispatch(toggleFetching())
  pass.hash(user.pwd, function(err, salt, hash){
    user.password = hash;
    user.salt = salt;
    Axios.post('http://localhost:5000/users/add', user)
      .then(() => {
        dispatch(toggleFetching())
        // window.location = '/login'
      });
  })
}
