const express = require('express')
const router = express.Router()

const { getAll, getById, deleteById, create, getByUsername, update } = require('../db/users')

router.get('/', async (req, res) => {
    try {
        const users = await getAll()
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await getById(req.params.id)
        if (user) res.send(user)
        else res.sendStatus(404)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const prevUser = await getByUsername(req.body.username)
        if (prevUser) {
            res.status(400).send({
                error: 'Username already exists'
            })
        } else {
            const user = await create(req.body)
            res.send(user)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await deleteById(req.params.id)
        if (user) res.send(user)
        else res.sendStatus(404)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const user = await update(req.params.id, req.body)
        if (user) res.send(user)
        else res.sendStatus(404)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
