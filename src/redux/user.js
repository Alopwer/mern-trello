import Axios from "axios"
const pass = require('pwd');

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const APPLY_ACTIVE_USER = 'APPLY_ACTIVE_USER';
const INITIAL_CHECK = 'INITIAL_CHECK';
const LOGOUT = 'LOGOUT';

const initialState = {
  isLoggedIn: false,
  isFetching: true,
  user: {},
  initialCheck: false
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
        isFetching: action.payload
      }
    case APPLY_ACTIVE_USER:
      return {
        ...state,
        user: action.payload
      }
    case INITIAL_CHECK:
      return {
        ...state,
        initialCheck: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        initialCheck: false
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

const toggleFetching = isFetching => ({
  type: TOGGLE_FETCHING,
  payload: isFetching
})

const applyActiveUser = user => ({
  type: APPLY_ACTIVE_USER,
  payload: user
})

const initialCheck = result => ({
  type: INITIAL_CHECK,
  payload: result
})

const logout = () => ({
  type: LOGOUT
})

export const login = (user) => (dispatch) => {
  dispatch(toggleFetching(true))
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
            keepUser(foundUser._id)
            dispatch(applyActiveUser(foundUser))
          } else {
            dispatch(loginFailure())
          }
        })
    })
    .catch(err => {
      dispatch(loginFailure())
    })
    .finally(() => {
      dispatch(toggleFetching(false))
    })
}

export const logoutTC = () => (dispatch) => {
  localStorage.removeItem('id');
  dispatch(logout())
}

export const signup = (user) => (dispatch) => {
  dispatch(toggleFetching(true))
  pass.hash(user.pwd, function(err, salt, hash){
    user.password = hash;
    user.salt = salt;
    Axios.post('http://localhost:5000/users/add', user)
      .then(() => {
        dispatch(toggleFetching(false))
        // window.location = '/login'
      });
  })
}

const keepUser = (id) => {
  localStorage.setItem('id', JSON.stringify(id));
}

export const checkIfLoggedIn = () => (dispatch) => {
  const id = JSON.parse(localStorage.getItem('id'));
  dispatch(toggleFetching(true))
  Axios.get('http://localhost:5000/users')
    .then(res => {
      const foundUser = res.data.find(u => u._id === id);
      return foundUser
    })
    .then(foundUser => {
      if (foundUser) {
        dispatch(loginSuccess())
        dispatch(applyActiveUser(foundUser))
      }
    })
    .catch(err => {
      console.log('not found user')
    })
    dispatch(toggleFetching(false))
    dispatch(initialCheck(true))
}