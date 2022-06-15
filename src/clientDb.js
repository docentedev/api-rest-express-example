const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'api-rest-express-example',
    password: '',
    port: 5432
})

client.connect()

const getConnection = () => {
    return client
}

module.exports = {
    getConnection
}