import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Board from './Board'
import { connect } from 'react-redux'

const BoardsList = ({ user }) => {
    const [boards, setBoards] = useState(null)

    useEffect(() => {
        Axios.get('http://localhost:5000/boards')
            .then(res => {
                setBoards(res.data.filter(b => b.username === user.username))
            })
            .catch(err => console.log(err))
    }, [user])

    const deleteBoard = id => {
        Axios.delete(`http://localhost:5000/boards/${id}`)
            .then(res => console.log(res.data))

        setBoards(boards.filter(b => b._id !== id))
    }

    return <div>
        { boards && boards.map(b => <Board board={b} key={b._id} deleteBoard={deleteBoard} />) }
    </div>
}

const mapStateToProps = ({ user }) => ({
    user: user.user
})

export default connect(mapStateToProps)(BoardsList)