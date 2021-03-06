const express = require('express')
const router = express.Router()

const { getAll, getById, deleteById, create, getByName, update } = require('../db/courses')

router.get('/', async (req, res) => {
    try {
        const courses = await getAll()
        res.send(courses)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const course = await getById(req.params.id)
        if (course) res.send(course)
        else res.sendStatus(404)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const prevCourse = await getByName(req.body.name)
        if (prevCourse) {
            res.status(400).send({
                error: 'Name already exists'
            })
        } else {
            const course = await create(req.body)
            res.send(course)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const course = await deleteById(req.params.id)
        if (course) res.send(course)
        else res.sendStatus(404)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const course = await update(req.params.id, req.body)
        if (course) res.send(course)
        else res.sendStatus(404)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
