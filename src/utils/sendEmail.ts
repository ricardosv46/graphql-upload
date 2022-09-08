import config from '@src/config'
import nodemailer from 'nodemailer'

interface Props {
  to: string
  html: string
  subject: string
}

const from = '"OVUM admin" <pruebas@softaki.com>'
export const transport = nodemailer.createTransport(config.email)

export const sendEmail = async ({ to, html, subject }: Props) => {
  try {
    await transport.sendMail({ to, from, subject, html })
    return true
  } catch (error) {
    return false
  }
}
