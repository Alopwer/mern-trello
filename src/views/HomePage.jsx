import React from 'react';
import BoardsList from '../components/BoardsList';
import EditBoard from '../components/EditBoard';
import CreateBoard from '../components/CreateBoard';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutTC } from '../redux/user';

const HomePage = ({ logoutTC }) => {
  return <>
    <div>
      <Link to='/'>Home</Link>
      <Link to='/create'>Create Board</Link>
      <Link to='/user'>Create user</Link>
      <button onClick={() => {
        logoutTC()
      }}>Logout</button>
    </div>
    <Route path='/' exact component={BoardsList} />
    <Route path='/edit/:id' component={EditBoard} />
    <Route path='/create' component={CreateBoard} />
  </>
}

export default connect(null, {
  logoutTC
})(HomePage);