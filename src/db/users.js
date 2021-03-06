const { getConnection } = require('../clientDb')

const getAll = async () => {
    const client = getConnection()
    try {
        const result = await client.query('SELECT * FROM account')
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
            text: 'SELECT * FROM account WHERE id = $1',
            values: [id]
        }
        const result = await client.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const getByUsername = async (username) => {
    const client = getConnection()
    try {
        const query = {
            text: 'SELECT * FROM account WHERE username = $1',
            values: [username]
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
            text: 'DELETE FROM account WHERE id = $1 RETURNING *',
            values: [id]
        }
        const result = await client.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const create = async (user) => {
    const client = getConnection()
    try {
        const query = {
            text: 'INSERT INTO account (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            values: [user.username, user.email, user.password]
        }
        const result = await client.query(query)
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, user) => {
    const client = getConnection()
    try {
        const query = {
            text: 'UPDATE account SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            values: [user.username, user.email, user.password, id]
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
    getByUsername,
    update
}