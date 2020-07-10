import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/user';

const Auth = ({ login }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials)
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.type]: e.target.value
    })
  }

  return <form onSubmit={handleSubmit}>
    <input type='email' value={credentials?.email} onChange={handleChange}/>
    <input type='password' value={credentials?.password} onChange={handleChange}/>
    <input type='submit' />
  </form>
}

export default connect(null, {
  login
})(Auth);