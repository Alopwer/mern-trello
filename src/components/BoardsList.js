import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Board from './Board'

const BoardsList = () => {
    const [boards, setBoards] = useState(null)

    useEffect(() => {
        Axios.get('http://localhost:5000/boards')
            .then(res => {
                setBoards(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const deleteBoard = id => {
        Axios.delete(`http://localhost:5000/boards/${id}`)
            .then(res => console.log(res.data))

        setBoards(boards.filter(b => b._id !== id))
    }

    return <div>
        { boards && boards.map(b => <Board board={b} key={b._id} deleteBoard={deleteBoard} />) }
    </div>
}

export default BoardsList