import { isAuth } from '@src/middleware/isAuth'
import { Query, Resolver, UseMiddleware } from 'type-graphql'

@Resolver()
export default class HelloResolvers {
  @UseMiddleware(isAuth)
  @Query(() => String)
  hello() {
    return 'HELLO WORK'
  }
}
