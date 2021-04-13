if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const swaggerUi = require('swagger-ui-express')
const openApiDocumentation = require('./openApiDocumentation')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
// eslint-disable-next-line node/no-path-concat
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation))

app.listen(process.env.PORT || 3000)

module.exports = app
