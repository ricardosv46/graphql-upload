import { DataSource } from 'typeorm'

import logger from '@src/utils/logger'
import { entities } from '@src/models'

export const AppDataSource = new DataSource({
  logging: true,
  type: 'postgres',
  synchronize: true,
  port: 5432,
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  entities
})

export default class Database {
  events() {
    process
      .on('SIGTERM', () => {
        AppDataSource.destroy()
        console.log('\nDisconnected from db')
        process.exit(1)
      })
      .on('SIGINT', () => {
        AppDataSource.destroy()
        console.log('\nDisconnected from db')
        process.exit(1)
      })
  }

  async connect() {
    this.events()

    try {
      await AppDataSource.initialize()

      logger.info('Connected to the DBs.')
    } catch (error) {
      logger.error('Fail connection to the DB.')
      console.log({ error })
    }
  }
}
