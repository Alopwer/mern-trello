import React from 'react'
import { Link } from 'react-router-dom'

const Board = props => {
    return <div>
        <h2>{ props.board.title }</h2>
        <h3>{ props.board.username }</h3>
        <Link to={`/edit/${props.board._id}`}>
            Edit
        </Link>
        <a href='#' onClick={() => props.deleteBoard(props.board._id)}>Delete</a>
    </div>
}

export default Board