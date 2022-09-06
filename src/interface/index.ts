import { Request, Response } from 'express'

export interface ApolloCtx {
  req: Request & { useId?: number }
  res: Response
}
