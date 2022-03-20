import jsonServer from 'json-server'
import webpackNodeExternals from 'webpack-node-externals'
import { prepareAuth, authenticate, checkAuth } from './auth.ts'

const server = jsonServer.create()
const router = jsonServer.router({contacts: [
  {id: 0, name: 'Alice', mail: 'alice@example.org'},
  {id: 1, name: 'Bob', mail: 'bob@example.com'},
  {id: 2, name: 'Carol', mail: 'carol@example.net'},
  {id: 3, name: 'Dave', mail: 'dave@localhost'}
]})

server.use(jsonServer.bodyParser)

const onFail = res =>
  res.status(403).send("Forbidden")

const onSuccess = res =>
  res.redirect(303, '/account.html')

server.use(prepareAuth())
server.post('/', authenticate(onFail, onSuccess))
server.get('/account.html', checkAuth(onFail))
server.use(jsonServer.defaults())
server.use(checkAuth(onFail))
server.use('/api', router)

server.listen(8080)
