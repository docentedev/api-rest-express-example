const express = require('express');
const usersRoutes = require('./src/routes/users')
const coursesRoutes = require('./src/routes/courses')
const teachersRoutes = require('./src/routes/teachers')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.use('/users', usersRoutes)
app.use('/courses', coursesRoutes)
app.use('/teachers', teachersRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
