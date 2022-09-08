// DB
const DB_PASSWORD_DEV = process.env.DB_PASSWORD_DEV ?? ''
const DB_USERNAME_DEV = process.env.DB_USERNAME_DEV ?? ''

// EMAIL
const EMAI_CONN_HOST_DEV = process.env.EMAI_CONN_HOST_DEV ?? ''
const EMAI_CONN_PORT_DEV = process.env.EMAI_CONN_PORT_DEV
  ? +process.env.EMAI_CONN_PORT_DEV
  : 0
const EMAI_CONN_PASS_DEV = process.env.EMAI_CONN_PASS_DEV ?? ''
const EMAI_CONN_USER_DEV = process.env.EMAI_CONN_USER_DEV ?? ''

const IS_EMAIL_SECURE = EMAI_CONN_PORT_DEV === 465

const config = {
  DEV: {
    db: {
      user: DB_USERNAME_DEV,
      pass: DB_PASSWORD_DEV
    },
    email: {
      host: EMAI_CONN_HOST_DEV,
      port: EMAI_CONN_PORT_DEV,
      secure: IS_EMAIL_SECURE,
      auth: {
        pass: EMAI_CONN_PASS_DEV,
        user: EMAI_CONN_USER_DEV
      }
    }
  }
}

export default config.DEV
