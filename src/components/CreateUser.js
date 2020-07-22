import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../redux/user';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

class CreateUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      pwd: ''
    }

    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePwd = this.onChangePwd.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChangeUserName(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangePwd(e) {
    this.setState({
      pwd: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()
    const user = {
      username: this.state.username,
      email: this.state.email,
      pwd: this.state.pwd
    }
    this.props.signup(user)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFetching !== this.props.isFetching) {
      this.props.history.push('/login')
    }
  }

  render() {
    return <div>
      <h3>Create New User</h3>
      <form onSubmit={this.onSubmit}>
        <div>
          <label>Username: </label>
          <input type="text"
            required
            value={this.state.username}
            onChange={this.onChangeUserName}/>
        </div>
        <div>
          <label>Email: </label>
          <input type="email"
            required
            value={this.state.email}
            onChange={this.onChangeEmail}/>
        </div>
        <div>
          <label>Password: </label>
          <input type="password"
            required
            value={this.state.pwd}
            onChange={this.onChangePwd}/>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  }
}

const mapStateToProps = ({ user }) => ({
  isFetching: user.isFetching
})

export default compose(
  withRouter,
  connect(mapStateToProps, {
    signup
  })
)(CreateUser);