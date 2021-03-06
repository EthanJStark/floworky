const express = require( 'express' )
const path = require( 'path' )
const favicon = require( 'serve-favicon' )
const logger = require( 'morgan' )
const cookieParser = require( 'cookie-parser' )
const bodyParser = require( 'body-parser' )
const session = require( 'express-session' )
const store = require( 'connect-pg-simple' )

const models = require( './models/index' )
const passport = require( './auth/passport' )
const protectRoute = require( './auth/protectRoute' )
const checkToken = require( './auth/checkToken' )

const routes = require( './routes/index' )
const accounts = require( './routes/accounts' )
const summary = require( './routes/accounts/weekly_summary' )
const items = require( './routes/items' )
const api = require( './routes/api/manifest').v1

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set( 'models', models )

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use( session({
  secret: 'ineedtofigureoutwhattheseoptionsare',
  store: new (store( session ))(),
  cookie: {},
  resave: false,
  saveUninitialized: true
}))
app.use( passport.initialize() )
app.use( passport.session() )

app.use( '/', routes )
app.use( '/accounts', accounts )
app.use( '/items', protectRoute, items )
app.use( '/summary', summary )
app.use( '/api/v1/accounts', api.accounts )
app.use( '/api/v1/items', checkToken, api.items )

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use( (err, req, res) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use( (err, req, res) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
