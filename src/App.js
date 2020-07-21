import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import BoardsList from './components/BoardsList';
import EditBoard from './components/EditBoard';
import CreateBoard from './components/CreateBoard';
import CreateUser from './components/CreateUser';
import Auth from './components/Auth';
import { checkIfLoggedIn } from './redux/user';
import { Provider, connect } from 'react-redux';
import store from './store';

function App({ isLoggedIn }) {
  return <Router>
      {
        !isLoggedIn ? 
        <>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
          <Route path='/login' component={Auth}/>
          <Route path='/signup' component={CreateUser} />
        </> :
        <Redirect to='/' />
      }
      {
        isLoggedIn && 
        <>
          <div>
            <Link to='/'>Home</Link>
            <Link to='/create'>Create Board</Link>
            <Link to='/user'>Create user</Link>
          </div>
          <Route path='/' exact component={BoardsList} />
          <Route path='/edit/:id' component={EditBoard} />
          <Route path='/create' component={CreateBoard} />
          <Router path='/user' component={CreateUser} />
        </>
      }
    </Router>
}

const mapStateToProps = ({ user }) => ({
  isLoggedIn : user.isLoggedIn,
})

const AppContainer = ({ checkIfLoggedIn, isLoggedIn }) => {
  useEffect(() => {
    if (!isLoggedIn) {
      checkIfLoggedIn()
    }
  }, [isLoggedIn]);

  return <App isLoggedIn={isLoggedIn} />
}

export default connect(mapStateToProps, { checkIfLoggedIn })(AppContainer);
