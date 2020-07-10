import React from 'react'
import Axios from 'axios'

class EditBoard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      users: [],
      title: '',
      cover: '',
      lists: []
    }

    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeCover = this.onChangeCover.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    Axios.get(`http://localhost:5000/boards/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          username: res.data.username,
          title: res.data.title,
          cover: res.data.cover
        })
      })
      .catch(err => console.log('err' + err))

    Axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map(user => user.username)
          })
        }
      })
  }

  onChangeUserName(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeCover(e) {
    this.setState({
      cover: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const board = {
      username: this.state.username,
      title: this.state.title,
      cover: this.state.cover,
      lists: this.state.lists
    }

    Axios.post('http://localhost:5000/boards/update/' + this.props.match.params.id, board)
      .then(() => window.location = '/')
  }

  render() {
    return <div>
      <h3>Edit Board</h3>
      <form onSubmit={this.onSubmit}>
        <div>
          <label>Username: </label>
          <select required
            value={this.state.username}
            onChange={this.onChangeUserName}>
            {
              this.state.users.map(user => <option key={user} value={user}>
                {user}
              </option>)
            }
          </select>
        </div>
        <div>
          <label>Title: </label>
          <input type="text"
            required
            value={this.state.title}
            onChange={this.onChangeTitle} />
        </div>
        <div>
          <label>Cover: </label>
          <input type="text"
            required
            value={this.state.cover}
            onChange={this.onChangeCover} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  }
}

export default EditBoard