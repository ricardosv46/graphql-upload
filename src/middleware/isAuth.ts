import { MiddlewareFn } from 'type-graphql'

import { ApolloCtx } from '@src/interface'
import { verifyJWT } from '@src/utils/jwt'

export const isAuth: MiddlewareFn<ApolloCtx> = ({ context }, next) => {
  const token = context.req.headers.authorization
  if (!token || !token.includes('Bearer ')) {
    throw new Error('Token invalido')
  }

  const payload: any = verifyJWT(token.replace('Bearer ', ''))

  if (!payload?.id) {
    throw new Error('Token invalido')
  }

  context.req.useId = +payload.id

  return next()
}
