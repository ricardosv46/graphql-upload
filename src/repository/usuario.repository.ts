import { AppDataSource } from '@src/db'
import Usuario from '@src/models/Usuario'

const UsuarioRepository = AppDataSource.getRepository(Usuario).extend({})

export default UsuarioRepository
