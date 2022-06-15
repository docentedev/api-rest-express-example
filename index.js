const express = require('express');
const usersRoutes = require('./src/routes/users')
const coursesRoutes = require('./src/routes/courses')

const app = express()

app.use('/users', usersRoutes)
app.use('/courses', coursesRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
