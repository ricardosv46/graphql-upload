import 'reflect-metadata'
import moduleAlias from 'module-alias'

const main = async () => {
  // Set alias modules
  moduleAlias.addAlias('@src', __dirname)

  // Start server
  const Server = require('./server').default
  await new Server().startServer()
}

main()
