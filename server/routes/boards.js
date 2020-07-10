const router = require('express').Router()
let Board = require('../models/board.model')

router.route('/').get((req, res) => {
    Board.find()
        .then(boards => res.json(boards))
        .catch(err => res.status(400).json('err' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const title = req.body.title
    const cover = req.body.cover
    const lists = req.body.lists

    const newBoard = new Board({
        username,
        title,
        cover,
        lists
    })

    newBoard.save()
        .then(() => res.json('added'))
        .catch((err) => res.status(400).json('err' + err))
})

router.route('/:id').get((req, res) => {
    Board.findById(req.params.id)
        .then(board => res.json(board))
        .catch(err => res.status(400).json('err' + err))
}) 

router.route('/:id').delete((req, res) => {
    Board.findByIdAndDelete(req.params.id)
        .then(() => res.json('deleted'))
        .catch(err => res.status(400).json('err' + err))
})  

router.route('/update/:id').post((req, res) => {
    Board.findById(req.params.id)
        .then(board => {
            board.username = req.body.username
            board.title = req.body.title
            board.cover = req.body.cover
            board.lists = req.body.lists

            board.save()
                .then(() => res.json('updated'))
                .catch(err => res.json('err' + err))
        })
        .catch(err => res.status(400).json('err' + err))
})  

module.exports = router