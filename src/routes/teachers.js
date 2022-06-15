const express = require('express')
const router = express.Router()

const { getAll, getById, deleteById, create, getByNameAndLastName, update } = require('../db/teachers')

router.get('/', async (req, res) => {
    try {
        const teachers = await getAll()
        res.send(teachers)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const teacher = await getById(req.params.id)
        if (teacher) res.send(teacher)
        else res.sendStatus(404)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const prevTeacher = await getByNameAndLastName(req.body.name, req.body.last_name)
        if (prevTeacher) {
            res.status(400).send({
                error: 'Teacher already exists'
            })
        } else {
            const teacher = await create(req.body)
            res.send(teacher)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const teacher = await deleteById(req.params.id)
        if (teacher) res.send(teacher)
        else res.sendStatus(404)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const teacher = await update(req.params.id, req.body)
        if (teacher) res.send(teacher)
        else res.sendStatus(404)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
