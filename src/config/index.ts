const DB_PASSWORD_DEV = process.env.DB_PASSWORD_DEV ?? ''
const DB_USERNAME_DEV = process.env.DB_USERNAME_DEV ?? ''

const config = {
  DEV: {
    db: {
      user: DB_USERNAME_DEV,
      pass: DB_PASSWORD_DEV
    }
  }
}

export default config.DEV