const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World! GET ALL USERS')
})

router.get('/:id', (req, res) => {
    res.send('Hello World! ' + req.params.id)
})

router.post('/', (req, res) => {
    res.send('Hello World! POST')
})

router.delete('/:id', (req, res) => {
    res.send('Hello World! DELETE')
})

router.put('/:id', (req, res) => {
    res.send('Hello World! PUT')
})

module.exports = router
