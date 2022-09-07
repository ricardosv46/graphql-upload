import ConexionRepository from '@src/repository/conexion.repository'
import UsuarioRepository from '@src/repository/usuario.repository'
import { verifyJWT } from '@src/utils/jwt'
import { Server } from 'socket.io'

export default class Sockets {
  io: Server

  constructor(io: Server) {
    this.io = io
  }

  events() {
    this.io.on('connection', async (socket) => {
      const token = socket.handshake.query['authorization'] as string
      const payload: any = verifyJWT(token.replace('Bearer ', ''))

      if (typeof payload?.id !== 'number') {
        console.log('ERROR_SOCKET_NO_AUTH')
        return socket.disconnect()
      }

      const timeStart = +new Date()
      const user = await UsuarioRepository.findOne({
        where: { id: payload.id }
      })

      console.log(`${user?.name} is connected`)

      socket.on('disconnect', async () => {
        const timeEnd = +new Date()
        const ms = timeEnd - timeStart
        console.log(`${user?.name} is disconnected`)

        await ConexionRepository.insert({
          userId: user?.id,
          seconds: ms / 1000
        })

        console.log({ ms })
      })

      return null
    })
  }
}
