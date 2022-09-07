import * as fs from 'fs'
import bcrypt from 'bcrypt'
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql'

import logger from '@src/utils/logger'
import { setError } from '@src/utils/setError'
import FieldError from '@src/models/FieldError'
import { mapDbErrors } from '@src/utils/mapDbErrors'
import Usuario, { UsuarioInput } from '@src/models/Usuario'
import UsuarioRepository from '@src/repository/usuario.repository'
import { genJWT } from '@src/utils/jwt'
import { isAuth } from '@src/middleware/isAuth'
import { ApolloCtx } from '@src/interface'
import path from 'path'

@ObjectType()
class UsuarioResponse {
  @Field(() => Usuario, { nullable: true })
  data?: Usuario | undefined

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}

@Resolver(Usuario)
export default class UsuarioResolvers {
  repository = UsuarioRepository

  @Mutation(() => UsuarioResponse)
  async login(@Arg('input') input: UsuarioInput): Promise<UsuarioResponse> {
    try {
      const usuario = await this.repository.findOne({
        where: { email: input.email }
      })

      if (!usuario) {
        return setError('email', 'El email o la contraseña son invalidos')
      }

      const isValidPass = await bcrypt.compare(input.password, usuario.password)

      if (!isValidPass) {
        return setError('password', 'El email o la contraseña son invalidos')
      }

      const token = await genJWT(usuario.id)

      return { data: { ...usuario, token } }
    } catch (error) {
      logger.error('Error al loggear al usuario')
      return mapDbErrors(error.message)
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UsuarioResponse)
  async refreshToken(@Ctx() { req }: ApolloCtx): Promise<UsuarioResponse> {
    try {
      const id = req.useId

      const usuario = await this.repository.findOne({ where: { id } })

      if (!usuario) {
        return setError('token', 'Token invalido')
      }

      const token = await genJWT(usuario.id)

      return { data: { ...usuario, token } }
    } catch (error) {
      logger.error('Error al loggear al usuario')
      return mapDbErrors(error.message)
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => [Usuario])
  async getAllUsers() {
    return this.repository.find({ relations: { conexiones: true } })
  }

  @Mutation(() => Boolean)
  async insertUsers() {
    const str = fs.readFileSync(path.resolve(__dirname, '../../../src/migrations/insertUser.sql'), 'utf8')
    await this.repository.query(str)

    return true
  }
}
