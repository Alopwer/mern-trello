import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { checkIfLoggedIn } from './redux/user';
import AuthPage from './views/AuthPage';
import HomePage from './views/HomePage';
import { connect } from 'react-redux';

function App({ isLoggedIn }) {
  return <Router>
    {
      isLoggedIn 
        ? <HomePage /> 
        : <AuthPage />
    }
  </Router>
}

const AppContainer = ({ checkIfLoggedIn, isLoggedIn, isFetching, initialCheck }) => {
  useEffect(() => {
    if (!isLoggedIn) {
      checkIfLoggedIn()
    }
  }, [isLoggedIn]);

  return initialCheck 
    ? !isFetching && <App isLoggedIn={isLoggedIn} /> 
    : <p>Loading</p>
}

const mapStateToProps = ({ user }) => ({
  isLoggedIn : user.isLoggedIn,
  isFetching: user.isFetching,
  initialCheck: user.initialCheck
})

export default connect(mapStateToProps, { checkIfLoggedIn })(AppContainer);
