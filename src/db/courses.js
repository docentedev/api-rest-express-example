const { getConnection } = require('../clientDb')

const getAll = async () => {
    const client = getConnection()
    try {
        const result = await client.query('SELECT * FROM courses')
        return result.rows
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
const getById = async (id) => {
    const client = getConnection()
    try {
        const query = {
            text: 'SELECT * FROM courses WHERE id = $1',
            values: [id]
        }
        const result = await client.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const getByName = async (name) => {
    const client = getConnection()
    try {
        const query = {
            text: 'SELECT * FROM courses WHERE name = $1',
            values: [name]
        }
        const result = await client.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const deleteById = async (id) => {
    const client = getConnection()
    try {
        const query = {
            text: 'DELETE FROM courses WHERE id = $1 RETURNING *',
            values: [id]
        }
        const result = await client.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const create = async (course) => {
    const client = getConnection()
    try {
        const query = {
            text: 'INSERT INTO courses (name, description) VALUES ($1, $2) RETURNING *',
            values: [course.name, course.description]
        }
        const result = await client.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, course) => {
    const client = getConnection()
    try {
        const query = {
            text: 'UPDATE courses SET name = $1, description = $2 WHERE id = $3 RETURNING *',
            values: [course.name, course.description, id]
        }
        const result = await client.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getAll,
    getById,
    deleteById,
    create,
    getByName,
    update
}