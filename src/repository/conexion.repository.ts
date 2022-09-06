import { AppDataSource } from '@src/db'
import Conexion from '@src/models/Conexion'

const ConexionRepository = AppDataSource.getRepository(Conexion).extend({})

export default ConexionRepository
