import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { connect } from './db'
import { signUpRoute } from './routes/signUpRoutes'
import { detailRoute } from './routes/detailRoutes'
import { loginRoute } from './routes/loginRoutes'
import http from 'http'
import { Server } from 'socket.io'
import { message } from './services/socket'
import { chatRoute } from './routes/chatRoutes'
import allFunctions from './services/chatService'
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id)
  socket.on('likes', (id, counts) => {
    void message(io, id, counts)
  })
  socket.on('messages', (data) => {
    void allFunctions.chatRoom(io, socket, data)
  })
  socket.on('initialMessage', (id) => {
    console.log('socket', id)
    void allFunctions.retrieveinitialMesssages(io, socket, id)
  })
})

connect()
  .then((data) => {
    console.log('Database Connected')
  })
  .catch((err: any) => {
    console.log('Database not connected', err)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(signUpRoute())
app.use(detailRoute())
app.use(loginRoute())
app.use(chatRoute())

// Add your routes and middleware here

server.listen(3000, () => {
  console.log('Server started on port 3000')
})
