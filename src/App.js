import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BoardsList from './components/BoardsList';
import EditBoard from './components/EditBoard';
import CreateBoard from './components/CreateBoard';
import CreateUser from './components/CreateUser';
import Auth from './components/Auth';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
        <Route path='/login' component={Auth}/>
        <Route path='/signup' component={CreateUser} />
      </Router>
    </Provider>
    // <Router>
    //   <div>
    //     <Link to='/'>Home</Link>
    //     <Link to='/create'>Create Board</Link>
    //     <Link to='/user'>Create user</Link>
    //   </div>
    //   <Route path='/' exact component={BoardsList} />
    //   <Route path='/edit/:id' component={EditBoard} />
    //   <Route path='/create' component={CreateBoard} />
    //   <Route path='/user' component={CreateUser} />
    // </Router>
  );
}

export default App;
