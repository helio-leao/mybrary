if(process.env.NODE_ENV !== 'production') {
    // require('dotenv').parse()
    require('dotenv').config()
}


// IMPORTS
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
// END IMPORTS

// ROUTERS
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
// END ROUTERS

// CONFIG
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
// END CONFIG

// MONGOOSE
const mongoose = require('mongoose')
const { urlencoded } = require('body-parser')
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))
// END MONGOOSE

// ROUTES
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)
// END ROUTES


app.listen(process.env.PORT || 3000)