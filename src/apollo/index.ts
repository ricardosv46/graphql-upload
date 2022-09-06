import { Express } from 'express'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'

import logger from '@src/utils/logger'
import { resolvers } from './resolvers'
import { ApolloCtx } from '@src/interface'

class Apollo {
  // @ts-ignore
  apollo: ApolloServer
  private app: Express

  constructor(app: Express) {
    this.app = app
  }

  async startApolloServer() {
    try {
      this.apollo = new ApolloServer({
        cache: 'bounded',
        introspection: true,
        csrfPrevention: true,
        context: (ctx: ApolloCtx) => ctx,
        schema: await buildSchema({ resolvers, validate: false })
      })

      await this.apollo.start()
      this.apollo.applyMiddleware({ app: this.app, cors: false })
      logger.info('Apollo server started')
    } catch (error) {
      logger.error('Apollo failed to start')
      console.log(error)
    }
  }
}

export default Apollo
