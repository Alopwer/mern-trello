import React from 'react';
import Auth from '../components/Auth';
import CreateUser from '../components/CreateUser';
import { Link, Route } from 'react-router-dom';

const AuthPage = () => {
  return <>
    <Link to='/login'>Login</Link>
    <Link to='/signup'>Signup</Link>
    <Route path='/login' component={Auth}/>
    <Route path='/signup' component={CreateUser} />
  </>
}

export default AuthPage;