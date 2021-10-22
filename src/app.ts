import dotenv from 'dotenv' 
dotenv.config()

import { Server } from 'socket.io'
import http from 'http'

import express from 'express'
import { router } from './routes'

const app = express()

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

io.on("connectin", socket => {
    console.log('Usuário conectado')
})

app.use(express.json())
app.use(router)

app.get('/github', ( request, response ) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get('/signin/callback' , (request, response) => {
    const code = request.query

    response.json(code)
})

export { httpServer, io }