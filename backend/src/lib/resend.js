import { Resend } from 'resend'
import 'dotenv/config'

export const resendClient = new Resend(process.env.RESEND_APT_KEY)

export const sender = {
    email: process.env.RESEND_FROM,
    name: process.env.RESEND_FROM_NAME
}