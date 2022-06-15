const { getConnection } = require('../clientDb')

const getAll = async () => {
    const client = getConnection()
    try {
        const result = await client.query('SELECT * FROM teachers')
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
            text: 'SELECT * FROM teachers WHERE id = $1',
            values: [id]
        }
        const result = await client.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const getByNameAndLastName = async (name, lastName) => {
    const client = getConnection()
    try {
        const query = {
            text: 'SELECT * FROM teachers WHERE name = $1 AND last_name = $2',
            values: [name, lastName]
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
            text: 'DELETE FROM teachers WHERE id = $1 RETURNING *',
            values: [id]
        }
        const result = await client.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const create = async (teacher) => {
    const client = getConnection()
    try {
        const query = {
            text: 'INSERT INTO teachers (name, profession, last_name) VALUES ($1, $2, $3) RETURNING *',
            values: [teacher.name, teacher.profession, teacher.last_name]
        }
        const result = await client.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, teacher) => {
    const client = getConnection()
    try {
        const query = {
            text: 'UPDATE teachers SET name = $1, last_name = $2, profession = $3 WHERE id = $4 RETURNING *',
            values: [teacher.name, teacher.last_name, teacher.profession, id]
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
    getByNameAndLastName,
    update
}