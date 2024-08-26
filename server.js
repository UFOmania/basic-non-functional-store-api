const http = require('http')
const app =  require('./app')
const PORT = 222;
const server = http.createServer(app)
server.listen(PORT)