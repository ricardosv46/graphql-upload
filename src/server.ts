import cors from 'cors'
import http from 'http'
import express, { Express } from 'express'
import { Server as SocketServer } from 'socket.io'

import Database from './db'
import Apollo from './apollo'
import logger from './utils/logger'
import Sockets from './sockets'

class Server {
  port = 8080
  app: Express
  db: Database
  apollo: Apollo
  io: SocketServer
  server: http.Server
  sockets: Sockets

  constructor() {
    this.app = express()
    this.db = new Database()
    this.apollo = new Apollo(this.app)

    this.server = http.createServer(this.app)
    this.io = new SocketServer(this.server)
    this.sockets = new Sockets(this.io)
  }

  middlewares() {
    this.app.use(cors())
  }

  async startServer() {
    // Start middlewares
    this.middlewares()

    // DB connection
    await this.db.connect()

    // Start sockets
    this.sockets.events()

    // Start Apollo
    await this.apollo.startApolloServer()

    // Start Server
    await new Promise((res) => this.server.listen(this.port, () => res(true)))
    logger.info(`Started server on http://localhost:${this.port}/graphql`)
  }
}

export default Server
